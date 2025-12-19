import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "../../components/ui/code-block";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/docs/quickstart")({
  component: GettingStarted,
});

function GettingStarted() {
  return (
    <div className="max-w-3xl min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-8">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        <span className="text-xs font-mono text-primary uppercase tracking-wider">
          Quickstart
        </span>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        Quickstart
      </h1>
      <p className="leading-7 text-xl text-muted-foreground mb-12">
        Build a memory-augmented agent in 30 seconds.
      </p>

      {/* Step 1 */}
      <div className="relative border-l-2 border-border/50 pl-8 pb-12 last:pb-0">
        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
        <h3 className="text-xl font-semibold mb-4 -mt-1">1. Initialization</h3>
        <p className="text-muted-foreground mb-6">
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
      <div className="relative border-l-2 border-border/50 pl-8 pb-12 last:pb-0">
        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
        <h3 className="text-xl font-semibold mb-4 -mt-1">2. Registration</h3>
        <p className="text-muted-foreground mb-6">
          Connect the two clients. This registers a middleware that intercepts
          calls to <code className="text-primary">chat.completions.create</code>
          .
        </p>
        <CodeBlock
          language="typescript"
          code={`// This single line enables active memory
memori.llm.register(client);`}
        />
      </div>

      {/* Step 3 */}
      <div className="relative border-l-2 border-border/50 pl-8 pb-12 last:pb-0">
        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary" />
        <h3 className="text-xl font-semibold mb-4 -mt-1">3. Interaction</h3>
        <p className="text-muted-foreground mb-6">
          Chat normally. Memori silently searches for relevant past
          conversations and injects them into the system prompt.
        </p>
        <CodeBlock
          language="typescript"
          code={`async function chat(message: string) {
  const response = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: message }
    ]
  });
  
  console.log(response.choices[0].message.content);
}

// First run: "My name is Roach." -> Saved to memory.
// Second run: "What is my name?" -> Retrieves context, answers "Roach".`}
        />
      </div>

      <div className="mt-16 flex gap-4">
        <Button asChild size="lg" className="rounded-full">
          <Link to="/docs/core-concepts">
            Explore Core Concepts <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
