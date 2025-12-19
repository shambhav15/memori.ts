import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "../../components/ui/code-block";
import { Badge } from "../../components/ui/badge";

export const Route = createFileRoute("/docs/providers")({
  component: Providers,
});

function Providers() {
  return (
    <div className="max-w-3xl min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-8">
        <span className="w-2 h-2 bg-primary rounded-full" />
        <span className="text-xs font-mono text-primary uppercase tracking-wider">
          Providers
        </span>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
        LLM Providers
      </h1>
      <p className="leading-7 text-xl text-muted-foreground mb-12">
        Memori works by "patching" your LLM client. It supports major providers
        out of the box.
      </p>

      <div className="grid gap-10">
        {/* OpenAI */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-3xl font-semibold tracking-tight">OpenAI</h2>
            <Badge
              variant="outline"
              className="text-green-500 border-green-500/20 bg-green-500/10"
            >
              Full Support
            </Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Supports automated context injection for both standard completions
            and structured outputs.
          </p>
          <CodeBlock
            language="typescript"
            code={`import { Memori } from "memori-js";
import OpenAI from "openai";

const client = new OpenAI();
const memori = new Memori();

// Register middleware
memori.llm.register(client);`}
          />
        </section>

        {/* Anthropic */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-3xl font-semibold tracking-tight">Anthropic</h2>
            <Badge
              variant="outline"
              className="text-green-500 border-green-500/20 bg-green-500/10"
            >
              Full Support
            </Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            Works seamlessly with Claude 3 and newer models.
          </p>
          <CodeBlock
            language="typescript"
            code={`import { Memori } from "memori-js";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const memori = new Memori();

// Register middleware
memori.llm.register(client);`}
          />
        </section>

        {/* Custom / Others */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-3xl font-semibold tracking-tight">
              Custom / Vercel AI SDK
            </h2>
            <Badge
              variant="outline"
              className="text-yellow-500 border-yellow-500/20 bg-yellow-500/10"
            >
              Beta
            </Badge>
          </div>
          <p className="text-muted-foreground mb-6">
            For other providers or the Vercel AI SDK, you can manually inject
            context using the <code className="text-primary">retrieve</code>{" "}
            API.
          </p>
          <CodeBlock
            language="typescript"
            code={`// Manual Context Injection
const context = await memori.retrieve(userQuery);

const response = await generateText({
    model: customModel,
    messages: [
        { role: 'system', content: \`Context: \${context}\` },
        { role: 'user', content: userQuery }
    ]
});`}
          />
        </section>
      </div>
    </div>
  );
}
