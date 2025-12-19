import { createFileRoute, Link } from "@tanstack/react-router";
import { CodeBlock } from "../../components/ui/code-block";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/docs/quickstart")({
  component: GettingStarted,
});

function GettingStarted() {
  return (
    <div className="max-w-3xl min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          Quickstart
        </span>
      </div>

      <h1 className="mb-4 text-lg font-bold tracking-tight text-foreground">
        Quickstart
      </h1>
      <p className="mb-10 text-sm text-muted-foreground leading-relaxed">
        Build a memory-augmented agent in 30 seconds.
      </p>

      {/* Step 1 */}
      <div className="relative border-l-2 border-border/50 pl-6 pb-10 last:pb-0">
        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-border border border-background ring-4 ring-background" />
        <h3 className="text-sm font-bold mb-2 text-foreground">
          1. Initialization
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Import Memori and your LLM client. Memori will default to using a
          local SQLite database in your project root.
        </p>
        <CodeBlock
          language="typescript"
          code={`import { Memori } from "memori-js";
import OpenAI from "openai";

const memori = new Memori(); 
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });`}
        />
      </div>

      {/* Step 2 */}
      <div className="relative border-l-2 border-border/50 pl-6 pb-10 last:pb-0">
        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-border border border-background ring-4 ring-background" />
        <h3 className="text-sm font-bold mb-2 text-foreground">
          2. Registration
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Connect the two clients. This registers a middleware that intercepts
          calls to{" "}
          <code className="text-xs bg-muted px-1 py-0.5 rounded border border-border/50 font-mono text-foreground">
            chat.completions.create
          </code>
          .
        </p>
        <CodeBlock
          language="typescript"
          code={`// This single line enables active memory
memori.llm.register(client);`}
        />
      </div>

      {/* Step 3 */}
      <div className="relative border-l-2 border-border/50 pl-6 pb-10 last:pb-0">
        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-border border border-background ring-4 ring-background" />
        <h3 className="text-sm font-bold mb-2 text-foreground">
          3. Interaction
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Chat normally. Memori silently searches for relevant past
          conversations and injects them into the system prompt.
        </p>
        <CodeBlock
          language="typescript"
          code={`async function chat(message: string) {
  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "user", content: message }
    ]
  });
  
  console.log(response.choices[0].message.content);
}

// First run: "My name is Roach." -> Saved to memory.
// Second run: "What is my name?" -> Retrieves context, answers "Roach".`}
        />
      </div>

      <div className="mt-12 flex gap-4">
        <Button asChild size="sm" className="rounded-md h-9 text-xs">
          <Link to="/docs/core-concepts">
            Explore Core Concepts <ArrowRight className="ml-2 w-3 h-3" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
