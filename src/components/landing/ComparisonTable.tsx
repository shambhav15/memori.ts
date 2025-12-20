import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const comparisonData = [
  {
    feature: "Setup Time",
    memori: "Instant (<1 min)",
    vectorDb: "Hours (Docker/Cloud)",
    rawFile: "Minutes",
  },
  {
    feature: "Query Language",
    memori: "Standard SQL",
    vectorDb: "Proprietary APIs",
    rawFile: "Manual Parsing",
  },
  {
    feature: "Developer Experience",
    memori: "Zero Config",
    vectorDb: "Complex Configuration",
    rawFile: "Boilerplate Heavy",
  },
  {
    feature: "Data Privacy",
    memori: "Local-First (Your Device)",
    vectorDb: "Cloud Dependent",
    rawFile: "Local",
  },
  {
    feature: "LLM Integration",
    memori: "Universal Adapter",
    vectorDb: "Vendor Locked",
    rawFile: "Manual Implementation",
  },
  {
    feature: "Cost",
    memori: "Free & Open Source",
    vectorDb: "Expensive at Scale",
    rawFile: "Free",
  },
];

export function ComparisonTable() {
  return (
    <section id="comparison-section" className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-3">
            Why settle for{" "}
            <span className="text-muted-foreground line-through decoration-red-500/50">
              complexity?
            </span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            See how Memori.ts stacks up against the old way of doing things.
          </p>
        </div>

        <div className="relative rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="grid grid-cols-4 p-6 border-b border-border/50 bg-muted/20">
            <div className="col-span-1 font-bold text-muted-foreground uppercase text-xs tracking-wider flex items-center">
              Feature
            </div>
            <div className="col-span-1 font-black text-xl text-primary flex items-center gap-2">
              Memori.ts
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] border border-primary/20">
                WINNER
              </span>
            </div>
            <div className="col-span-1 font-bold text-muted-foreground text-sm flex items-center">
              Vector DBs
            </div>
            <div className="col-span-1 font-bold text-muted-foreground text-sm flex items-center">
              Raw JSON
            </div>
          </div>

          {/* Body */}
          <div className="divide-y divide-border/30">
            {comparisonData.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "grid grid-cols-4 p-6 hover:bg-muted/10 transition-colors",
                  i % 2 === 0 ? "bg-transparent" : "bg-muted/5"
                )}
              >
                <div className="col-span-1 font-medium text-muted-foreground text-sm flex items-center">
                  {row.feature}
                </div>

                {/* Memori Column */}
                <div className="col-span-1 font-bold text-foreground text-sm flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  {row.memori}
                </div>

                {/* Vector DB Column */}
                <div className="col-span-1 text-muted-foreground text-sm flex items-center gap-2">
                  {row.vectorDb.includes("Hours") ||
                  row.vectorDb.includes("Expensive") ||
                  row.vectorDb.includes("Complex") ? (
                    <X className="w-5 h-5 text-red-400" />
                  ) : (
                    <Minus className="w-4 h-4 opacity-50" />
                  )}
                  {row.vectorDb}
                </div>

                {/* Raw File Column */}
                <div className="col-span-1 text-muted-foreground text-sm flex items-center gap-2">
                  {row.rawFile.includes("Manual") ||
                  row.rawFile.includes("Boilerplate") ? (
                    <X className="w-5 h-5 text-red-400" />
                  ) : (
                    <Minus className="w-4 h-4 opacity-50" />
                  )}
                  {row.rawFile}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subtle glow overlay */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-primary/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
