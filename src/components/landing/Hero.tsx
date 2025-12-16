import { ArrowRight, Github } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CodeBlock } from "../ui/CodeBlock";

export function Hero() {
  return (
    <section className="relative pt-20 pb-12 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/5 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center text-center gap-6">
        <Badge
          variant="secondary"
          className="px-3 py-1 text-xs border border-primary/20 bg-primary/5 text-primary rounded-full hover:bg-primary/10 transition-colors"
        >
          v1.0.57 Available
        </Badge>

        <h1 className="max-w-4xl text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
          The Memory Layer for <br /> AI Agents
        </h1>

        <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
          SQL-native active context management for your AI applications.{" "}
          <br className="hidden sm:block" />
          Long-term memory, made simple.
        </p>

        <div className="flex gap-4 mt-2">
          <Button
            size="lg"
            className="h-10 px-6 text-sm font-medium rounded-full"
            asChild
          >
            <a href="/docs" className="flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-10 px-6 text-sm font-medium rounded-full"
            asChild
          >
            <a
              href="https://github.com/shambhav15/memori-js"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          </Button>
        </div>

        <div className="w-full max-w-3xl mt-12 text-left relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative rounded-xl border bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/40">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
            </div>
            <CodeBlock
              code={`import { Memori } from "memori-js";
import { OpenAI } from "openai";

const memori = new Memori();
const client = new OpenAI(process.env.OPENAI_API_KEY);

// Auto-injects relevant context
memori.llm.register(client);

await client.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Remember this?" }]
});`}
              language="typescript"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
