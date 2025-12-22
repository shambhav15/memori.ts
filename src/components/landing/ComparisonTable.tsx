import { Check, Minus } from "lucide-react";

const comparisonData = [
  {
    feature: "Infrastructure",
    memori: "None (Embedded)",
    others: "Container/Cluster",
  },
  {
    feature: "Setup Time",
    memori: "Instant (<1 min)",
    others: "Hours (Docker/Cloud)",
  },
  {
    feature: "Query Language",
    memori: "Standard SQL",
    others: "Proprietary APIs",
  },
  {
    feature: "Developer Exp.",
    memori: "Zero Config",
    others: "Complex Config",
  },
  {
    feature: "Data Privacy",
    memori: "Local-First",
    others: "Cloud Dependent",
  },
  {
    feature: "Latency",
    memori: "In-Memory (<10ms)",
    others: "Network (>100ms)",
  },
  {
    feature: "LLM Support",
    memori: "Universal Adapter",
    others: "Vendor Locked",
  },
  {
    feature: "Cost Model",
    memori: "Open Source",
    others: "Usage Based",
  },
];

export function ComparisonTable() {
  return (
    <section
      id="comparison-section"
      className="py-16 border-t border-border bg-muted/30"
    >
      <div className="container-factory">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Section Header */}
          {/* Section Header */}
          <div className="space-y-6">
            <h2 className="font-normal tracking-tighter leading-none">
              Why settle for <br />
              complexity?
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Most memory solutions require complex infrastructure, vector
              databases, and cloud dependencies. Memori.ts is just a standard
              library.
            </p>
          </div>

          {/* Technical Data Sheet */}
          <div className="w-full">
            {/* Table Header */}
            <div className="grid grid-cols-12 pb-4 border-b border-border text-mono text-muted-foreground text-xs tracking-wider">
              <div className="col-span-4">SPECIFICATION</div>
              <div className="col-span-4 text-foreground">MEMORI.TS</div>
              <div className="col-span-4">VECTOR DBs</div>
            </div>

            {/* Table Body */}
            <div>
              {comparisonData.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 py-3 border-b border-border/50 items-center text-xs"
                >
                  <div className="col-span-4 text-muted-foreground font-medium">
                    {row.feature}
                  </div>
                  <div className="col-span-4 text-foreground font-medium flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 mx-auto md:mx-0 text-emerald-500" />
                    <span className="hidden md:inline">{row.memori}</span>
                  </div>
                  <div className="col-span-4 text-muted-foreground flex items-center gap-2">
                    <Minus className="w-3.5 h-3.5 mx-auto md:mx-0 opacity-50" />
                    <span className="hidden md:inline opacity-75">
                      {row.others}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
