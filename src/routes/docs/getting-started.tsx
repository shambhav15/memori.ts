import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CodeBlock } from "../../components/ui/CodeBlock";

export const Route = createFileRoute("/docs/getting-started")({
  component: GettingStarted,
});

function GettingStarted() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl min-h-screen"
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
          Getting_Started
        </span>
      </div>

      <h1 className="text-2xl font-bold font-mono text-white mb-6 uppercase tracking-tight">
        Installation & Setup
      </h1>
      <p className="text-sm text-zinc-400 mb-8 leading-relaxed font-mono">
        Get up and running with Memori-JS in under a minute. No Docker required.
      </p>

      {/* Step 1 */}
      <h2 className="text-lg font-bold font-mono text-white mb-4 mt-12 uppercase border-l-2 border-indigo-500 pl-4">
        1. Install Package
      </h2>
      <p className="text-xs text-zinc-500 mb-4 font-mono uppercase">
        Use your preferred package manager
      </p>

      <div className="mb-8">
        <CodeBlock
          code="npm install memori-js"
          language="bash"
          variant="inline"
        />
      </div>

      {/* Step 2 */}
      <h2 className="text-lg font-bold font-mono text-white mb-4 mt-12 uppercase border-l-2 border-purple-500 pl-4">
        2. Set up Environment
      </h2>
      <p className="text-xs text-zinc-500 mb-4 font-mono uppercase">
        Configure your API keys in .env
      </p>

      <div className="mb-8 overflow-hidden rounded-lg">
        <CodeBlock
          language="bash"
          code={`# .env
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=AIza...
# Optional: Postgres URL if using cloud storage
DATABASE_URL=postgresql://...`}
        />
      </div>

      {/* Step 3 */}
      <h2 className="text-lg font-bold font-mono text-white mb-4 mt-12 uppercase border-l-2 border-emerald-500 pl-4">
        3. Create your Agent
      </h2>
      <p className="text-xs text-zinc-500 mb-4 font-mono uppercase">
        Initialize and run your first memory-augmented completion
      </p>

      <div className="mb-8 overflow-hidden rounded-lg">
        <CodeBlock
          language="typescript"
          code={`import { Memori } from "memori-js";
import OpenAI from "openai";

async function main() {
  // Initialize Memori (defaults to local SQLite)
  const memori = new Memori();

  // Initialize your LLM client
  const client = new OpenAI();

  // Register the client to enable memory injection
  memori.llm.register(client);

  // Calls are now automatically enhanced with context!
  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Remember that I like coding in TypeScript." }
    ]
  });

  console.log(response.choices[0].message.content);
}

main();`}
        />
      </div>
    </motion.div>
  );
}
