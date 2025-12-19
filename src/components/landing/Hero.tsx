import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CodeBlock } from "../ui/code-block";
import { motion } from "framer-motion";

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px] opacity-50"></div>
      </div>

      <motion.div
        className="container mx-auto px-4 flex flex-col items-center text-center gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Badge
            variant="secondary"
            className="px-4 py-1.5 text-sm border bg-secondary/50 backdrop-blur-sm text-foreground rounded-full hover:bg-secondary/80 transition-colors"
          >
            v1.0 is now available
          </Badge>
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-4xl text-6xl md:text-8xl font-bold tracking-tight text-foreground"
        >
          Memory for <br />
          <span className="text-muted-foreground">AI Agents</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-xl text-xl text-muted-foreground leading-relaxed"
        >
          The SQL-native active context layer. Give your agents long-term memory
          with a single line of code.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center"
        >
          <div className="flex items-center gap-3 bg-muted/50 border rounded-full px-5 h-12 font-mono text-sm text-muted-foreground">
            <span className="text-primary">npm</span> install memori-js
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 ml-2 rounded-full hover:bg-background/80"
              onClick={() =>
                navigator.clipboard.writeText("npm install memori-js")
              }
            >
              <Terminal className="w-3 h-3" />
            </Button>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex gap-4 mt-2">
          <Button
            size="lg"
            className="h-12 px-8 text-base font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-95"
            asChild
          >
            <a href="/docs" className="flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base font-medium rounded-full bg-background/50 backdrop-blur-sm hover:bg-background transition-all active:scale-95"
            asChild
          >
            <a href="/playground" className="flex items-center gap-2">
              Try Playground
            </a>
          </Button>
        </motion.div>

        <motion.div
          variants={item}
          className="w-full max-w-3xl mt-16 text-left relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative rounded-2xl border bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/10">
            <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                agent.ts
              </span>
            </div>
            <CodeBlock
              code={`import { Memori } from "memori-js";
import { OpenAI } from "openai";

// Initialize memory layer
const memori = new Memori();
const client = new OpenAI();

// Register the provider to auto-inject context
memori.llm.register(client);

// Chat normally - context is handled automatically
await client.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "user", content: "What did we discuss yesterday?" }
  ]
});`}
              language="typescript"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
