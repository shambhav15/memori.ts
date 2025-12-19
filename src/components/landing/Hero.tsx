import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Copy, Terminal, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "../ui/code-block";

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
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function Hero() {
  const [copied, setCopied] = useState(false);
  const installCommand = "npm install memori-js"; // Keeping it simple per prompt

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-16 pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
      <motion.div
        className="container mx-auto px-4 flex flex-col items-center text-center gap-8 max-w-4xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={item}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground/90 font-display">
            Memori is a fast all-in-one <br className="hidden sm:block" /> AI
            memory toolkit
          </h1>
          <p className="text-xl text-muted-foreground/80 max-w-2xl leading-relaxed">
            The SQL-native active context layer for your AI agents.{" "}
            <br className="hidden sm:block" /> Give them long-term memory with a
            single line of code.
          </p>
        </motion.div>

        <motion.div variants={item} className="w-full max-w-md mx-auto mt-4">
          <div className="flex items-center gap-2 p-1.5 bg-muted/40 border border-border/50 rounded-xl backdrop-blur-sm group hover:border-border/80 transition-colors">
            <div className="pl-3 pr-2 text-muted-foreground">
              <span className="text-primary font-bold mr-2">$</span>
            </div>
            <input
              type="text"
              readOnly
              value={installCommand}
              className="bg-transparent border-none focus:ring-0 text-sm font-mono text-foreground w-full p-0"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground shrink-0"
            >
              {copied ? (
                <span className="text-[10px] font-bold text-green-500">OK</span>
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
          <div className="flex justify-center gap-4 mt-3 text-[10px] text-muted-foreground font-mono opacity-60">
            <span>npm</span>
            <span>pnpm</span>
            <span>yarn</span>
            <span>bun</span>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Button
            size="lg"
            className="h-10 px-6 rounded-lg text-sm font-bold bg-foreground text-background hover:bg-foreground/90"
          >
            <Link to="/docs/quickstart">Get started</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-10 px-6 rounded-lg text-sm font-medium border-border/50 bg-background/50 backdrop-blur-sm hover:bg-muted/50"
          >
            <Link to="/playground">Try Playground</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Background decoration inspired by Bun */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen" />
    </section>
  );
}
