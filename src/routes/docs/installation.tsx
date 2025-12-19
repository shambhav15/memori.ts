import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "../../components/ui/code-block";

export const Route = createFileRoute("/docs/installation")({
  component: Installation,
});

function Installation() {
  return (
    <div className="max-w-3xl min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-8">
        <span className="w-2 h-2 bg-primary rounded-full" />
        <span className="text-xs font-mono text-primary uppercase tracking-wider">
          Installation
        </span>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        Installation
      </h1>
      <p className="leading-7 text-xl text-muted-foreground mb-12">
        Memori-JS is designed to be lightweight and zero-dependency for the core
        runtime.
      </p>

      <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
        Package Manager
      </h2>
      <p className="leading-7 text-muted-foreground mb-6">
        Install the package using your favorite package manager:
      </p>

      <div className="mb-12">
        <CodeBlock code="npm install memori-js" language="bash" />
        <div className="mt-4 text-sm text-muted-foreground">
          Also supported:
        </div>
        <div className="flex gap-4 mt-2">
          <CodeBlock
            code="pnpm add memori-js"
            language="bash"
            variant="inline"
          />
          <CodeBlock
            code="yarn add memori-js"
            language="bash"
            variant="inline"
          />
          <CodeBlock
            code="bun add memori-js"
            language="bash"
            variant="inline"
          />
        </div>
      </div>

      <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight mb-6">
        Environment Variables
      </h2>
      <p className="leading-7 text-muted-foreground mb-6">
        Memori needs access to embedding models and (optionally) cloud
        databases. Configure these in your{" "}
        <code className="text-primary">.env</code> file.
      </p>

      <div className="mb-12">
        <CodeBlock
          language="bash"
          code={`# Required for default embeddings
OPENAI_API_KEY=sk-...

# Required if using Google Gemini for embeddings
GOOGLE_API_KEY=AIza...

# Optional: Remote Postgres (Supabase, Neon, etc.)
# If not provided, defaults to local SQLite
DATABASE_URL=postgresql://user:pass@host:5432/db`}
        />
      </div>

      <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight mb-6">
        TypeScript Configuration
      </h2>
      <p className="leading-7 text-muted-foreground mb-6">
        If you are using TypeScript, ensure your{" "}
        <code className="text-primary">tsconfig.json</code> is set up to handle
        ESM if you encounter issues, though Memori is bundled to support both
        CJS and ESM.
      </p>
    </div>
  );
}
