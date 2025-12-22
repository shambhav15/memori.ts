import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "../../components/ui/code-block";

export const Route = createFileRoute("/docs/core-concepts")({
  component: CoreConcepts,
});

function CoreConcepts() {
  return (
    <div className="max-w-3xl min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-8">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span className="text-xs font-mono text-primary uppercase tracking-wider">
          Core_Concepts
        </span>
      </div>

      <h1 className="scroll-m-20 font-extrabold tracking-tight mb-6">
        How it Works
      </h1>
      <p className="leading-7 text-muted-foreground mb-12">
        Understand the primitives that power Memori's active state management.
      </p>

      {/* Concept 1 */}
      <section className="mb-14">
        <h2 className="scroll-m-20 border-b pb-2 font-semibold tracking-tight mb-6">
          1. Active Memory Layer
        </h2>
        <p className="leading-7 text-muted-foreground mb-6">
          Unlike a traditional vector database where you push/pull vectors
          manually, <span className="text-foreground font-medium">Memori</span>{" "}
          acts as a <strong>middleware</strong>. It sits between your
          application code and the LLM, intercepting requests to inject relevant
          context.
        </p>

        <div className="p-6 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground justify-center">
            <span>App Code</span>
            <span className="text-foreground">──►</span>
            <span className="text-primary border border-primary/20 bg-primary/10 px-3 py-1.5 rounded">
              Memori Layer
            </span>
            <span className="text-foreground">──►</span>
            <span>LLM</span>
          </div>
        </div>
      </section>

      {/* Concept 2 */}
      <section className="mb-14">
        <h2 className="scroll-m-20 border-b pb-2 font-semibold tracking-tight mb-6">
          2. Auto-Augmentation
        </h2>
        <p className="leading-7 text-muted-foreground mb-8">
          This is the "magic" part. When you call{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            register(client)
          </code>
          , we monkey-patch the client's completion methods/hooks to add a
          pre-processing and post-processing step.
        </p>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-sm font-mono text-primary font-bold shrink-0">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1">Retrieval (Pre-flight)</h3>
              <p className="text-muted-foreground">
                The user's prompt is embedded and compared against the local
                vector index. Relevant memories are found.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-sm font-mono text-primary font-bold shrink-0">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1">Injection</h3>
              <p className="text-muted-foreground">
                Context is inserted into the system message, invisible to the
                end user but visible to the model.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-sm font-mono text-primary font-bold shrink-0">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1">Storage (Post-flight)</h3>
              <p className="text-muted-foreground">
                The resulting conversation turn is saved, embedded, and indexed
                for future reference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Concept 3 */}
      <section className="mb-14">
        <h2 className="scroll-m-20 border-b pb-2 font-semibold tracking-tight mb-6">
          3. Attribution & Scoping
        </h2>
        <p className="leading-7 text-muted-foreground mb-6">
          For multi-tenant applications, you need to ensure User A essentially
          never sees User B's memories. Memori handles this via{" "}
          <strong className="text-foreground">Attribution</strong>.
        </p>

        <div className="rounded-xl overflow-hidden border bg-card">
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
        </div>
      </section>
    </div>
  );
}
