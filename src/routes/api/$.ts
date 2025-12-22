import { createFileRoute } from "@tanstack/react-router";
import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { Memori } from "memori-js";
import Groq from "groq-sdk";

// Helper to use Groq (Llama 3.1)
const groqGenerator = async (messages: any[]) => {
  if (!process.env.GROQ_API_KEY) {
    console.warn("GROQ_API_KEY is missing.");
    return { text: "Error: GROQ_API_KEY missing", usage: 0 };
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  try {
    const completion = await groq.chat.completions.create({
      messages: messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
      model: "llama-3.1-8b-instant",
    });
    const text = completion.choices[0]?.message?.content || "";
    // Approximate usage if not returned
    const usage = completion.usage?.total_tokens || Math.round(text.length / 4);
    return { text, usage };
  } catch (e) {
    console.error("Groq generation failed:", e);
    return { text: "Error generating response.", usage: 0 };
  }
};

// Helper to use Gemini (Flash 2.0)
const generateGemini = async (messages: any[]) => {
  if (!process.env.GOOGLE_API_KEY) {
    return { text: "Error: GOOGLE_API_KEY missing", usage: 0 };
  }

  try {
    // Convert messages to Gemini format
    const contents = messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // Special handling: System instructions are separate in Gemini API
    let systemInstruction = undefined;
    if (contents.length > 0 && messages[0].role === "system") {
      systemInstruction = { parts: [{ text: messages[0].content }] };
      contents.shift(); // Remove system message from contents
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          systemInstruction,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API Error:", data.error);
      throw new Error(data.error.message);
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const usage =
      data.usageMetadata?.totalTokenCount || Math.round(text.length / 4);

    return { text, usage };
  } catch (e) {
    console.error("Gemini generation failed:", e);
    return { text: "Error generating response from Gemini.", usage: 0 };
  }
};

const app = new Elysia({ prefix: "/api" })
  .use(cors())
  .post(
    "/chat",
    async ({
      body,
      headers,
    }: {
      body: any;
      headers: Record<string, string | undefined>;
    }) => {
      const {
        messages,
        history, // Legacy support
        message, // Legacy support
        isClaraEnabled,
        sessionId = "playground-session",
        contextFile,
      } = body;

      const startTime = performance.now();
      let injectedContext = contextFile?.content;

      // Extract context from headers if passed (supports streaming adapters)
      if (!injectedContext && headers["x-context"]) {
        try {
          injectedContext = decodeURIComponent(headers["x-context"] || "");
        } catch (e) {
          console.warn("Failed to decode context header");
        }
      }

      // Normalize messages
      let chatMessages = messages || history || [];
      // If legacy 'message' is present and not in history, add it
      if (
        message &&
        (!chatMessages.length ||
          chatMessages[chatMessages.length - 1].content !== message)
      ) {
        chatMessages.push({ role: "user", content: message });
      }

      console.log("Chat request:", {
        isClaraEnabled,
        msgCount: chatMessages.length,
      });

      // Inject context if present (Simple RAG simulation for Playground)
      // We clone to avoid mutating the original array reference if it came from state
      const processedMessages = [...chatMessages];

      if (injectedContext) {
        processedMessages.unshift({
          role: "system",
          content: `Use the following context to answer questions. If the answer is not in the context, say so.\n\n[CONTEXT_START]\n${injectedContext}\n[CONTEXT_END]`,
        });
      }

      if (isClaraEnabled) {
        // Reduced system prompt to avoid verbose "Reasoning:" prefixes in output
        processedMessages.unshift({
          role: "system",
          content: `You are CLaRa, an advanced AI assistant. Answer validly and concisely based on the context.`,
        });
      }

      try {
        // Use generate() instead of chat() to get full response and stats
        // Note: Streaming is disabled in Playground to capture accurate total latency constraints
        let result;
        if (isClaraEnabled) {
          // Use Groq/Llama for CLaRa
          result = await groqGenerator(processedMessages);
        } else {
          // Use Gemini for Standard
          result = await generateGemini(processedMessages);
        }

        const { text, usage } = result;
        const endTime = performance.now();
        const latency = Math.round(endTime - startTime);

        // Mock reasoning trace for demo purposes if not provided
        const reasoningTrace = isClaraEnabled
          ? [
              "Analyzing query intent...",
              "Retrieving relevant context chunks...",
              "Cross-referencing facts in knowledge graph...",
              "Synthesizing answer...",
            ]
          : undefined;

        return {
          response: text,
          analysis: {
            latencyMs: latency,
            tokenUsage: usage,
            contextChunksUsed: injectedContext ? 1 : 0,
            reasoningTrace,
          },
        };
      } catch (error) {
        console.error("Generation failed:", error);
        return new Response(JSON.stringify({ error: "Generation failed" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    },
    {
      body: t.Object({
        messages: t.Optional(
          t.Array(
            t.Object({
              role: t.String(),
              content: t.String(),
            })
          )
        ),
        isClaraEnabled: t.Optional(t.Boolean()),
        sessionId: t.Optional(t.String()),
        contextFile: t.Optional(
          t.Object({
            name: t.String(),
            content: t.String(),
          })
        ),
        // Legacy support
        message: t.Optional(t.String()),
        history: t.Optional(t.Any()),
      }),
    }
  )
  .post(
    "/ingest",
    async ({ body }) => {
      const {
        content,
        name,
        isClaraEnabled,
        sessionId = "playground-session",
      } = body;
      console.log("Ingesting file:", name, "CLaRa:", isClaraEnabled);
      const startTime = performance.now();

      // For Playground demo, we might not need full Memori persistence if we are just doing RAG in-memory via Context Window
      // But let's keep the hook for stats simulation

      const endTime = performance.now();
      const latency = Math.round(endTime - startTime) + 150; // Mock latency

      return {
        success: true,
        message: "Context ingested successfully.",
        stats: {
          latencyMs: latency,
          originalSize: content.length,
          compressedSize: isClaraEnabled
            ? Math.round(content.length * 0.4)
            : content.length,
          chunksCreated: isClaraEnabled ? 1 : Math.ceil(content.length / 500),
          method: isClaraEnabled
            ? "CLaRa (Llama 3.1) + Vector"
            : "Raw Vector Chunking",
        },
      };
    },
    {
      body: t.Object({
        name: t.String(),
        content: t.String(),
        isClaraEnabled: t.Boolean(),
        sessionId: t.Optional(t.String()),
      }),
    }
  );

const handle = ({ request }: { request: Request }) => app.fetch(request);

export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      GET: handle,
      POST: handle,
    },
  },
});
