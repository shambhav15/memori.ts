import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "../../components/ui/CodeBlock";

export const Route = createFileRoute("/docs/api-reference")({
  component: ApiReference,
});

function ApiReference() {
  return (
    <div className="max-w-3xl min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-8">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span className="text-xs font-mono text-primary uppercase tracking-wider">
          API_Reference
        </span>
      </div>

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        Core API
      </h1>
      <p className="leading-7 text-xl text-muted-foreground mb-12">
        Complete reference for the Memori-JS client.
      </p>

      {/* Class Memori */}
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mb-6">
        Class: Memori
      </h2>
      <p className="leading-7 text-muted-foreground mb-6">
        The main entry point for the library.
      </p>

      <div className="bg-card border border-border rounded-xl p-6 mb-12 shadow-sm">
        <h3 className="font-mono text-sm text-primary mb-3">Constructor</h3>
        <CodeBlock
          language="typescript"
          code={`constructor(config?: MemoriConfig)

interface MemoriConfig {
  storage?: "sqlite-local" | "postgres"; // Default: sqlite-local
  dbPath?: string; // Default: ./memori.db
  googleApiKey?: string; // Required for embedding generation
}`}
        />
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
          Initializes the memory layer. If using SQLite, it will automatically
          create the database file if it doesn't exist.
        </p>
      </div>

      {/* Method: register */}
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mb-6">
        memori.llm.register()
      </h2>
      <p className="leading-7 text-muted-foreground mb-6">
        Patch an LLM client with memory capabilities.
      </p>

      <div className="bg-card border border-border rounded-xl p-6 mb-12 shadow-sm">
        <h3 className="font-mono text-sm text-primary mb-3">Signature</h3>
        <CodeBlock
          language="typescript"
          code={`register(client: any, provider?: "openai" | "google" | "anthropic")`}
        />
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
          Automatically detects the client type if provider is omitted. Supports
          standard SDKs for OpenAI, Google GenAI, and Anthropic.
        </p>
      </div>

      {/* Method: search */}
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mb-6">
        memori.search()
      </h2>
      <p className="leading-7 text-muted-foreground mb-6">
        Manually retrieve memories.
      </p>

      <div className="bg-card border border-border rounded-xl p-6 mb-12 shadow-sm">
        <h3 className="font-mono text-sm text-primary mb-3">Signature</h3>
        <CodeBlock
          language="typescript"
          code={`async search(query: string, limit: number = 5): Promise<Memory[]>`}
        />
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
          Performs a semantic search against the vector store. Used internally
          by the auto-augmentation middleware, but exposed for manual use.
        </p>
      </div>
    </div>
  );
}
