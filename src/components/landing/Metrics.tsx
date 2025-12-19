import { Star, GitFork, Download } from "lucide-react";

export function Metrics() {
  return (
    <section className="border-y border-border/40 bg-muted/20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Star className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider">
                GitHub Stars
              </span>
            </div>
            <span className="text-3xl font-bold tracking-tight text-foreground">
              1.2k+
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <Download className="w-4 h-4" />
              <span className="text-xs font-mono uppercase tracking-wider">
                Downloads/mo
              </span>
            </div>
            <span className="text-3xl font-bold tracking-tight text-foreground">
              15k+
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <span className="text-xs font-mono uppercase tracking-wider">
                Test Coverage
              </span>
            </div>
            <span className="text-3xl font-bold tracking-tight text-green-500">
              98%
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
              <span className="text-xs font-mono uppercase tracking-wider">
                Context Time
              </span>
            </div>
            <span className="text-3xl font-bold tracking-tight text-foreground">
              ~25ms
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
