import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bot,
  MessageSquare,
  Terminal,
  Database,
  Cloud,
} from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/examples")({
  component: Examples,
});

const examples = [
  {
    title: "Basic Q&A Bot",
    description:
      "A simple command-line chatbot that remembers user name and preferences.",
    icon: Terminal,
    tag: "CLI",
  },
  {
    title: "Customer Support Agent",
    description:
      "Ingest your documentation and have an agent answer questions with active context.",
    icon: MessageSquare,
    tag: "RAG",
  },
  {
    title: "Personal Assistant",
    description:
      "A long-running assistant that maintains context over weeks of conversation.",
    icon: Bot,
    tag: "Long-term",
  },
  {
    title: "Postgres Sync",
    description:
      "Sync your local Memori SQLite database to a cloud Postgres instance.",
    icon: Database,
    tag: "Database",
  },
  {
    title: "Vercel AI SDK Integration",
    description: "How to use Memori middleware with Vercel's AI SDK streams.",
    icon: Cloud,
    tag: "Integration",
  },
];

function Examples() {
  return (
    <div className="mx-auto max-w-5xl py-12 px-4 md:py-20 lg:px-8">
      <div className="mb-12">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
          Examples
        </h1>
        <p className="text-muted-foreground text-sm">
          Real-world patterns for building memory-augmented agents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((ex, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group relative flex flex-col justify-between rounded-xl border border-border/50 bg-card/50 p-6 shadow-sm transition-all hover:bg-card hover:shadow-md hover:border-border/80"
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ex.icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground border border-border/50">
                  {ex.tag}
                </span>
              </div>
              <h3 className="mb-2 text-base font-bold text-foreground">
                {ex.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {ex.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs w-full bg-transparent hover:bg-muted/50"
              >
                View Code
              </Button>
              <Button size="sm" className="h-8 text-xs w-full">
                Try Demo <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
