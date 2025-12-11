import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CodeBlock } from "../../components/ui/CodeBlock";

export const Route = createFileRoute("/docs/core-concepts")({
  component: CoreConcepts,
});

function CoreConcepts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl min-h-screen"
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
        <span className="text-xs font-mono text-orange-400 uppercase tracking-wider">
          Core_Concepts
        </span>
      </div>

      <h1 className="text-xl font-bold font-mono text-white mb-6 uppercase tracking-tight">
        How it Works
      </h1>
      <p className="text-xs text-zinc-400 mb-8 leading-relaxed font-mono">
        Understand the primitives that power Memori's active state management.
      </p>

      {/* Concept 1 */}
      <section className="mb-12">
        <h2 className="text-sm font-bold font-mono text-white mb-4 uppercase border-l-2 border-indigo-500 pl-4">
          1. Active Memory Layer
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-sans">
          Unlike a traditional vector database where you push/pull vectors
          manually, <span className="text-white font-medium">Memori</span> acts
          as a <strong>middleware</strong>. It sits between your application
          code and the LLM, intercepting requests to inject relevant context.
        </p>

        <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-lg">
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 justify-center">
            <span>App Code</span>
            <span className="text-zinc-700">──►</span>
            <span className="text-indigo-400 border border-indigo-500/20 bg-indigo-500/10 px-2 py-1 rounded">
              Memori Layer
            </span>
            <span className="text-zinc-700">──►</span>
            <span>LLM</span>
          </div>
        </div>
      </section>

      {/* Concept 2 */}
      <section className="mb-12">
        <h2 className="text-sm font-bold font-mono text-white mb-4 uppercase border-l-2 border-emerald-500 pl-4">
          2. Auto-Augmentation
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-sans">
          This is the "magic" part. When you call <code>register(client)</code>,
          we monkey-patch the client's completion methods to add a
          pre-processing and post-processing step.
        </p>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-mono text-zinc-500 shrink-0">
              1
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">
                Retrieval (Pre-flight)
              </h3>
              <p className="text-xs text-zinc-500">
                The user's prompt is embedded and compared against the local
                vector index. Relevant memories are found.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-mono text-zinc-500 shrink-0">
              2
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Injection</h3>
              <p className="text-xs text-zinc-500">
                Context is inserted into the system message, invisible to the
                end user but visible to the model.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-mono text-zinc-500 shrink-0">
              3
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">
                Storage (Post-flight)
              </h3>
              <p className="text-xs text-zinc-500">
                The resulting conversation turn is saved, embedded, and indexed
                for future reference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Concept 3 */}
      <section className="mb-12">
        <h2 className="text-sm font-bold font-mono text-white mb-4 uppercase border-l-2 border-purple-500 pl-4">
          3. Attribution & Scoping
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-sans">
          For multi-tenant applications, you need to ensure User A essentially
          never sees User B's memories. Memori handles this via{" "}
          <strong>Attribution</strong>.
        </p>

        <CodeBlock
          language="typescript"
          code={`// Global scope (default)
const memori = new Memori();

// User scope
memori.attribution("user_123");
await memori.addMemory("My name is John"); 

// Switch user
memori.attribution("user_456");
const memories = await memori.search("What is my name?"); 
// -> Returns [] (Empty, because John's memory is isolated)`}
        />
      </section>
    </motion.div>
  );
}
