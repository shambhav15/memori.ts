import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CodeBlock } from "../../components/ui/CodeBlock";

export const Route = createFileRoute("/docs/api-reference")({
  component: ApiReference,
});

function ApiReference() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl min-h-screen"
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
          API_Reference
        </span>
      </div>

      <h1 className="text-2xl font-bold font-mono text-white mb-6 uppercase tracking-tight">
        Core API
      </h1>
      <p className="text-sm text-zinc-400 mb-8 leading-relaxed font-mono">
        Complete reference for the Memori-JS client.
      </p>

      {/* Class Memori */}
      <h2 className="text-lg font-bold font-mono text-white mb-4 mt-12 uppercase border-l-2 border-indigo-500 pl-4">
        Class: Memori
      </h2>
      <p className="text-xs text-zinc-500 mb-4 font-mono uppercase">
        The main entry point for the library.
      </p>

      <div className="bg-zinc-900/50 border border-white/5 rounded-lg p-6 mb-8">
        <h3 className="font-mono text-sm text-indigo-300 mb-2">Constructor</h3>
        <CodeBlock
          language="typescript"
          code={`constructor(config?: MemoriConfig)

interface MemoriConfig {
  storage?: "sqlite-local" | "postgres"; // Default: sqlite-local
  dbPath?: string; // Default: ./memori.db
  googleApiKey?: string; // Required for embeddings
}`}
        />
        <p className="text-xs text-zinc-400 mt-4 leading-relaxed">
          Initializes the memory layer. If using SQLite, it will automatically
          create the database file if it doesn't exist.
        </p>
      </div>

      {/* Method: register */}
      <h2 className="text-lg font-bold font-mono text-white mb-4 mt-12 uppercase border-l-2 border-purple-500 pl-4">
        memori.llm.register()
      </h2>
      <p className="text-xs text-zinc-500 mb-4 font-mono uppercase">
        Patch an LLM client with memory capabilities.
      </p>

      <div className="bg-zinc-900/50 border border-white/5 rounded-lg p-6 mb-8">
        <h3 className="font-mono text-sm text-purple-300 mb-2">Signature</h3>
        <CodeBlock
          language="typescript"
          code={`register(client: any, provider?: "openai" | "google" | "anthropic")`}
        />
        <p className="text-xs text-zinc-400 mt-4 leading-relaxed">
          Automatically detects the client type if provider is omitted. Supports
          standard SDKs for OpenAI, Google GenAI, and Anthropic.
        </p>
      </div>

      {/* Method: search */}
      <h2 className="text-lg font-bold font-mono text-white mb-4 mt-12 uppercase border-l-2 border-emerald-500 pl-4">
        memori.search()
      </h2>
      <p className="text-xs text-zinc-500 mb-4 font-mono uppercase">
        Manually retrieve memories.
      </p>

      <div className="bg-zinc-900/50 border border-white/5 rounded-lg p-6 mb-8">
        <h3 className="font-mono text-sm text-emerald-300 mb-2">Signature</h3>
        <CodeBlock
          language="typescript"
          code={`async search(query: string, limit: number = 5): Promise<Memory[]>`}
        />
        <p className="text-xs text-zinc-400 mt-4 leading-relaxed">
          Performs a semantic search against the vector store. Used internally
          by the auto-augmentation middleware, but exposed for manual use.
        </p>
      </div>
    </motion.div>
  );
}
