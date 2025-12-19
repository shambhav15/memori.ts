import { createFileRoute } from "@tanstack/react-router";
import { CodeBlock } from "../../components/ui/code-block";
import { Badge } from "../../components/ui/badge";

export const Route = createFileRoute("/docs/providers")({
  component: Providers,
});

function Providers() {
  return (
    <div className="max-w-3xl min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 bg-primary rounded-full" />
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          Providers
        </span>
      </div>

      <h1 className="mb-4 text-lg font-bold tracking-tight text-foreground">
        LLM Providers
      </h1>
      <p className="mb-10 text-sm text-muted-foreground leading-relaxed">
        Memori works by "patching" your LLM client. It supports major providers
        out of the box.
      </p>

      <div className="grid gap-10">
        {/* OpenAI */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-bold text-foreground">OpenAI</h2>
            <Badge
              variant="outline"
              className="text-[10px] h-5 px-1.5 border-green-500/20 text-green-500 bg-green-500/5"
            >
              Full Support
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
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
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-bold text-foreground">Anthropic</h2>
            <Badge
              variant="outline"
              className="text-[10px] h-5 px-1.5 border-green-500/20 text-green-500 bg-green-500/5"
            >
              Full Support
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
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
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-sm font-bold text-foreground">
              Custom / Vercel AI SDK
            </h2>
            <Badge
              variant="outline"
              className="text-[10px] h-5 px-1.5 border-yellow-500/20 text-yellow-500 bg-yellow-500/5"
            >
              Beta
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            For other providers or the Vercel AI SDK, you can manually inject
            context using the{" "}
            <code className="text-xs bg-muted px-1 py-0.5 rounded border border-border/50 font-mono text-foreground">
              retrieve
            </code>{" "}
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
