import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/docs/")({
  component: DocsIndex,
});

function DocsIndex() {
  return (
    <div className="max-w-3xl min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-6">
        <span className="relative flex h-2 w-2">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          Documentation
        </span>
      </div>

      <h1 className="mb-4 text-lg font-bold tracking-tight text-foreground">
        Welcome to Memori
      </h1>
      <p className="mb-8 text-sm text-muted-foreground leading-relaxed">
        The SQL-native active context layer for AI agents. Give your agents
        long-term memory with a single line of code.
      </p>

      <div className="flex gap-3 mb-12">
        <Button
          asChild
          size="sm"
          className="rounded-md px-4 h-8 text-xs font-medium"
        >
          <Link to="/docs/quickstart">Start Building</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="rounded-md px-4 h-8 text-xs font-medium bg-background/50 backdrop-blur-sm"
        >
          <Link to="/docs/core-concepts">Learn Concepts</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-12">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-sm font-bold mb-1.5 text-foreground">
              Zero Config
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Starts with local SQLite. No Docker containers or complex vector
              DB setups required.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-sm font-bold mb-1.5 text-foreground">
              SQL Native
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Built on standard SQL. Query your agent's memory using tools you
              already know.
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="mb-3 text-sm font-bold text-foreground">Why Memori?</h2>
      <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
        Most memory libraries act as complex wrappers around vector stores,
        forcing you to manually manage embeddings, chunking, and retrieval.
      </p>
      <p className="mb-8 text-sm text-muted-foreground leading-relaxed">
        Memori takes a different approach:{" "}
        <strong className="font-medium text-foreground">Middleware</strong>. By
        sitting between your code and the LLM, it can autonomously manage
        context without clogging your business logic.
      </p>
    </div>
  );
}
