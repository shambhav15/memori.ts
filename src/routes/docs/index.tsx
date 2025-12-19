import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/docs/")({
  component: DocsIndex,
});

function DocsIndex() {
  return (
    <div className="max-w-3xl min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/50 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="text-xs font-mono text-primary uppercase tracking-wider">
          Introduction
        </span>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6">
        Welcome to Memori
      </h1>
      <p className="leading-relaxed text-xl text-muted-foreground mb-10">
        The SQL-native active context layer for AI agents. Give your agents
        long-term memory with a single line of code.
      </p>

      <div className="flex gap-4 mb-16">
        <Button asChild size="lg" className="rounded-full px-8">
          <Link to="/docs/quickstart">Start Building</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-full px-8 bg-background/50 backdrop-blur-sm"
        >
          <Link to="/docs/core-concepts">Learn Concepts</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Zero Config</h3>
            <p className="text-sm text-muted-foreground">
              Starts with local SQLite. No Docker containers or complex vector
              DB setups required.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-colors">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">SQL Native</h3>
            <p className="text-sm text-muted-foreground">
              Built on standard SQL. Query your agent's memory using tools you
              already know.
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-semibold tracking-tight mb-6">
        Why Memori?
      </h2>
      <p className="leading-7 text-muted-foreground mb-6">
        Most memory libraries act as complex wrappers around vector stores,
        forcing you to manually manage embeddings, chunking, and retrieval.
      </p>
      <p className="leading-7 text-muted-foreground mb-10">
        Memori takes a different approach: <strong>Middleware</strong>. By
        sitting between your code and the LLM, it can autonomously manage
        context without clogging your business logic.
      </p>
    </div>
  );
}
