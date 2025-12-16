import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "../../components/ui/code-block";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export const Route = createFileRoute("/docs/")({
  component: DocsIndex,
});

function DocsIndex() {
  return (
    <div className="max-w-3xl min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/50 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="text-xs font-mono text-primary uppercase tracking-wider">
          Documentation // V1.2.0
        </span>
      </div>

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        Introduction
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-xl text-muted-foreground mb-10">
        Memori-JS is an active memory layer for your AI agents. It bridges the
        gap between transient context windows and persistent storage.
      </p>

      <Card className="my-10 border-primary/20 bg-primary/5 backdrop-blur-sm">
        <CardContent className="p-6 flex gap-4 items-start">
          <Lightbulb className="w-6 h-6 text-primary shrink-0 mt-1" />
          <div className="space-y-1">
            <h4 className="font-semibold text-primary tracking-tight">
              Philosophy
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Memory should be invisible. You shouldn't manage vector stores
              manually. Memori abstracts the complexity of RAG into a simple
              middleware.
            </p>
          </div>
        </CardContent>
      </Card>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-16 mb-6">
        Quick Start
      </h2>
      <p className="leading-7 text-muted-foreground mb-4">
        Install the package via your preferred package manager.
      </p>

      <div className="mb-10">
        <CodeBlock
          code="npm install memori-js"
          language="bash"
          variant="inline"
        />
      </div>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-16 mb-6">
        Basic Usage
      </h2>
      <p className="leading-7 text-muted-foreground mb-6">
        Initialize Memori and register your LLM client. It works by intercepting
        calls to inject relevant context.
      </p>

      <div className="overflow-hidden rounded-xl border bg-card">
        <CodeBlock
          language="typescript"
          code={`import { Memori } from "memori-js";
import OpenAI from "openai";

// 1. Initialize Memori
const memori = new Memori({
  googleApiKey: process.env.GOOGLE_API_KEY, // Used for embeddings
});

// 2. Register your client
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
memori.llm.register(client);

// 3. Chat as normal - memory is handled automatically
const response = await client.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "My name is Alice." }],
});`}
        />
      </div>
    </div>
  );
}
