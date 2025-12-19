import { Star, Download, GitFork } from "lucide-react";

export function Metrics() {
  return (
    <div className="w-full border-y border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50">
          <div className="flex flex-col items-center justify-center text-center px-4">
            <div className="text-3xl font-bold font-mono mb-1">2.4k+</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3 h-3" /> Stars
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-4">
            <div className="text-3xl font-bold font-mono mb-1">15k+</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Download className="w-3 h-3" /> Installs
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-4">
            <div className="text-3xl font-bold font-mono mb-1">99%</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              Test Coverage
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center px-4">
            <div className="text-3xl font-bold font-mono mb-1">0ms</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              Config Time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
