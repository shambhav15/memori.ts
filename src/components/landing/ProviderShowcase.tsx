import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeBlock } from "../ui/CodeBlock";

interface Provider {
  id: string;
  name: string;
  icon: string;
  color: string;
  code: string;
}

export function ProviderShowcase() {
  const [activeProvider, setActiveProvider] = useState(0);

  const providers: Provider[] = [
    {
      id: "openai",
      name: "OpenAI",
      icon: "🤖",
      color: "from-emerald-500/20 to-emerald-500/5",
      code: `import OpenAI from "openai";
import { Memori } from "memori-js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const memori = new Memori({ googleApiKey: process.env.GOOGLE_API_KEY });

// Register for auto-augmentation
memori.llm.register(client, "openai");

// Now, every call is memory-augmented!
const response = await client.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "What is my favorite color?" }],
});`,
    },
    {
      id: "google",
      name: "Google GenAI",
      icon: "✨",
      color: "from-blue-500/20 to-blue-500/5",
      code: `import { GoogleGenAI } from "@google/genai";
import { Memori } from "memori-js";

const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const memori = new Memori({ googleApiKey: process.env.GOOGLE_API_KEY });

// Register Gemini for memory injection
memori.llm.register(client, "google");

// Use Gemini as normal - context is injected automatically
const result = await client.models.generateContent({
  model: "gemini-pro",
  contents: "Remember our last conversation?",
});`,
    },
    {
      id: "anthropic",
      name: "Anthropic",
      icon: "🎭",
      color: "from-orange-500/20 to-orange-500/5",
      code: `import Anthropic from "@anthropic-ai/sdk";
import { Memori } from "memori-js";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const memori = new Memori({ googleApiKey: process.env.GOOGLE_API_KEY });

// Patch Claude for memory awareness
memori.llm.register(client, "anthropic");

// Claude now has persistent memory
const message = await client.messages.create({
  model: "claude-3-opus-20240229",
  messages: [{ role: "user", content: "What do I like?" }],
});`,
    },
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-bold text-white mb-4 font-mono"
          >
            PROVIDER_AGNOSTIC
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm text-zinc-400 max-w-xl mx-auto"
          >
            Works seamlessly with OpenAI, Google GenAI, and Anthropic. One line
            to register, zero config to maintain.
          </motion.p>
        </div>

        {/* Provider Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {providers.map((provider, index) => (
            <button
              key={provider.id}
              onClick={() => setActiveProvider(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all ${
                activeProvider === index
                  ? "bg-indigo-500/20 border border-indigo-500/30 text-white"
                  : "bg-zinc-900/50 border border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10"
              }`}
            >
              <span>{provider.icon}</span>
              <span>{provider.name}</span>
            </button>
          ))}
        </div>

        {/* Code Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProvider}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border border-white/10 overflow-hidden bg-gradient-to-br ${providers[activeProvider].color}`}
          >
            <div className="bg-black/60 backdrop-blur-xl p-1">
              <CodeBlock
                code={providers[activeProvider].code}
                language="typescript"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
