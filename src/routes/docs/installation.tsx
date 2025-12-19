import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "../../components/ui/code-block";

export const Route = createFileRoute("/docs/installation")({
  component: Installation,
});

function Installation() {
  return (
    <div className="max-w-3xl min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 bg-primary rounded-full" />
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          Installation
        </span>
      </div>

      <h1 className="mb-4 text-lg font-bold tracking-tight text-foreground">
        Installation
      </h1>
      <p className="mb-10 text-sm text-muted-foreground leading-relaxed">
        Memori-JS is designed to be lightweight and zero-dependency for the core
        runtime.
      </p>

      <h2 className="mb-3 text-sm font-bold text-foreground border-none pb-0">
        Package Manager
      </h2>
      <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
        Install the package using your favorite package manager:
      </p>

      <div className="mb-10">
        <CodeBlock code="npm install memori-js" language="bash" />
        <div className="mt-4 text-xs text-muted-foreground">
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

      <h2 className="mb-3 text-sm font-bold text-foreground border-none pb-0">
        Environment Variables
      </h2>
      <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
        Memori needs access to embedding models and (optionally) cloud
        databases. Configure these in your{" "}
        <code className="text-xs bg-muted px-1 py-0.5 rounded border border-border/50 font-mono text-foreground">
          .env
        </code>{" "}
        file.
      </p>

      <div className="mb-10">
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

      <h2 className="mb-3 text-sm font-bold text-foreground border-none pb-0">
        TypeScript Configuration
      </h2>
      <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
        If you are using TypeScript, ensure your{" "}
        <code className="text-xs bg-muted px-1 py-0.5 rounded border border-border/50 font-mono text-foreground">
          tsconfig.json
        </code>{" "}
        is set up to handle ESM if you encounter issues, though Memori is
        bundled to support both CJS and ESM.
      </p>
    </div>
  );
}
