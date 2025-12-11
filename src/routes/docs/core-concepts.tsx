import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docs/core-concepts")({
  component: CoreConcepts,
});

function CoreConcepts() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Core Concepts</h1>
      <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
        Understand how Memori-JS manages state and context for your agents.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. Active Memory Layer</h2>
        <p className="text-zinc-400 leading-relaxed mb-4">
          Unlike a traditional vector database where you push/pull vectors
          manually, Memori acts as a middleware. It sits between your
          application code and the LLM.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          2. Auto-Augmentation (Patching)
        </h2>
        <p className="text-zinc-400 leading-relaxed mb-4">
          When you call{" "}
          <code className="text-indigo-400 bg-indigo-500/10 px-1 py-0.5 rounded">
            memori.llm.register(client)
          </code>
          , we wrap the client's completion methods.
        </p>
        <ul className="list-disc list-inside text-zinc-400 space-y-2 ml-4">
          <li>
            <strong>Before Request:</strong> Memori searches for relevant
            context based on the user's prompt.
          </li>
          <li>
            <strong>Injection:</strong> Relevant memories are injected into the
            system prompt.
          </li>
          <li>
            <strong>After Request:</strong> The new interaction is saved and
            embedded for future retrieval.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          3. Attribution (Multi-Tenancy)
        </h2>
        <p className="text-zinc-400 leading-relaxed mb-4">
          Memori is designed for multi-user apps. You can scope memory to a
          specific user, chat session, or agent.
        </p>
        <pre className="bg-zinc-950 border border-white/10 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm font-mono text-zinc-300">{`// Scope subsequent operations to user-123
memori.attribution("user-123");`}</code>
        </pre>
      </section>
    </div>
  );
}
