import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "../../components/ui/code-block";

export const Route = createFileRoute("/docs/getting-started")({
  component: GettingStarted,
});

function GettingStarted() {
  return (
    <div className="max-w-3xl min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-8">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span className="text-xs font-mono text-primary uppercase tracking-wider">
          Getting_Started
        </span>
      </div>

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        Installation & Setup
      </h1>
      <p className="leading-7 text-xl text-muted-foreground mb-12">
        Get up and running with Memori-JS in under a minute. No Docker required.
      </p>

      {/* Step 1 */}
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
        1. Install Package
      </h2>
      <p className="leading-7 text-muted-foreground mb-6">
        Use your preferred package manager to install the core library.
      </p>

      <div className="mb-12">
        <CodeBlock
          code="npm install memori-js"
          language="bash"
          variant="inline"
        />
      </div>

      {/* Step 2 */}
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mb-6">
        2. Set up Environment
      </h2>
      <p className="leading-7 text-muted-foreground mb-6">
        Configure your API keys in your{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          .env
        </code>{" "}
        file.
      </p>

      <div className="mb-12 overflow-hidden rounded-xl border bg-card">
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
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mb-6">
        3. Create your Agent
      </h2>
      <p className="leading-7 text-muted-foreground mb-6">
        Initialize Memori and run your first memory-augmented completion.
      </p>

      <div className="mb-12 overflow-hidden rounded-xl border bg-card">
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
    </div>
  );
}
