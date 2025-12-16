import { useState } from "react";
import { Zap, History, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SearchComparison() {
  const [query, setQuery] = useState("what is the speed of light");
  const [isComparing, setIsComparing] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const legacyResults = [
    { text: "Found keyword 'what' in unrelated record #8492", match: "1.5%" },
    { text: "System Error: Index out of sync.", match: "0.5%", error: true },
  ];

  const semanticResults = [
    {
      text: "The speed of light is approximately 299,792 km/s.",
      relevance: 0.98,
    },
    {
      text: "Photosynthesis converts light into chemical energy.",
      relevance: 0.45,
    },
  ];

  const handleCompare = () => {
    setIsComparing(true);
    setShowResults(false);
    setTimeout(() => {
      setShowResults(true);
      setIsComparing(false);
    }, 800);
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          Legacy vs Semantic Search
        </h2>
        <p className="text-muted-foreground text-base">
          See the difference active context makes.
        </p>
      </div>

      <div className="flex gap-3 max-w-lg mx-auto mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a search query..."
            className="pl-9 bg-background/50 border-primary/20"
          />
        </div>
        <Button
          onClick={handleCompare}
          disabled={isComparing}
          variant="secondary"
        >
          {isComparing ? "Comparing..." : "Compare"}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="bg-muted/20 border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-muted-foreground">
              <History className="w-4 h-4" />
              Legacy Keyword Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {showResults &&
              legacyResults.map((r, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border text-sm font-mono ${r.error ? "bg-destructive/10 border-destructive/20 text-destructive-foreground/80" : "bg-card border-border/50 text-muted-foreground"}`}
                >
                  <p className="mb-1">{r.text}</p>
                  <div className="text-xs opacity-60">Match: {r.match}</div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-primary">
              <Zap className="w-4 h-4" />
              Memori Semantic Search
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {showResults &&
              semanticResults.map((r, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg border bg-card/80 border-primary/10 text-sm font-mono backdrop-blur-sm"
                >
                  <p className="mb-1">{r.text}</p>
                  <div className="flex items-center gap-2 text-xs text-primary/70">
                    <div className="h-1.5 flex-1 bg-primary/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${r.relevance * 100}%` }}
                      ></div>
                    </div>
                    <span>{(r.relevance * 100).toFixed(0)}%</span>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
