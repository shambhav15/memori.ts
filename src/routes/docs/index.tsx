import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CodeBlock } from "../../components/ui/CodeBlock";

export const Route = createFileRoute("/docs/")({
  component: DocsIndex,
});

function DocsIndex() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl min-h-screen"
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
          Documentation // V1.2.0
        </span>
      </div>

      <h1 className="text-2xl font-bold font-mono text-white mb-6 uppercase tracking-tight">
        Introduction
      </h1>
      <p className="text-sm text-zinc-400 mb-8 leading-relaxed font-mono">
        Memori-JS is an active memory layer for your AI agents. It bridges the
        gap between transient context windows and persistent storage.
      </p>

      <div className="my-8 p-6 bg-black/40 border border-indigo-500/20 rounded-lg relative overflow-hidden group hover:border-indigo-500/50 transition-colors backdrop-blur-sm">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(99,102,241,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2s_infinite]" />
        <p className="m-0 text-indigo-300 text-xs font-mono flex gap-2 relative z-10">
          <span className="text-lg">💡</span>
          <span>
            <strong>PHILOSOPHY:</strong> Memory should be invisible. You
            shouldn't manage vector stores manually.
          </span>
        </p>
      </div>

      <h2 className="text-lg font-bold font-mono text-white mb-4 mt-12 uppercase border-l-2 border-emerald-500 pl-4">
        Quick Start
      </h2>
      <p className="text-xs text-zinc-500 mb-4 font-mono uppercase">
        Package Installation
      </p>

      <div className="mb-8">
        <CodeBlock code="npm install memori-js" language="bash" variant="inline" />
      </div>

      <h2 className="text-lg font-bold font-mono text-white mb-4 mt-12 uppercase border-l-2 border-purple-500 pl-4">
        Basic Usage
      </h2>
      <p className="text-xs text-zinc-500 mb-4 font-mono uppercase">
        Initialize Memori and register your LLM client
      </p>

      <div className="overflow-hidden rounded-lg mb-8">
        <CodeBlock
          language="typescript"
          code={`import { Memori } from "memori-js";
import OpenAI from "openai";

// 1. Initialize Memori
const memori = new Memori({
  googleApiKey: process.env.GOOGLE_API_KEY, // Used for embedding generation
});

// 2. Register your client
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
memori.llm.register(client);

// 3. Chat as normal - memory is automatically handled!
const response = await client.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "My name is Alice." }],
});`}
        />
      </div>
    </motion.div>
  );
}

