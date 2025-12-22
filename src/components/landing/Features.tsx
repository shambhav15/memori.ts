import { motion } from "framer-motion";
import { Database, Zap, Globe, Cloud } from "lucide-react";

const features = [
  {
    title: "SQL Native",
    description:
      "Query your agent's memory using standard SQL. No learning curve, just powerful relational queries.",
    icon: Database,
  },
  {
    title: "Zero Config",
    description:
      "Start coding instantly. No Docker, no API keys, no complex vector DB infrastructure to manage.",
    icon: Zap,
  },
  {
    title: "Universal Support",
    description:
      "Works with OpenAI, Anthropic, Gemini, and local LLMs via a simple, unified adapter interface.",
    icon: Globe,
  },
  {
    title: "Local-First",
    description:
      "Data lives on your device by default for max privacy. Sync to the cloud only when you need it.",
    icon: Cloud,
  },
];

export function Features() {
  return (
    <section className="container-factory py-16 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-border">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative border-r border-border p-6 hover:bg-muted/30 transition-colors"
          >
            {/* Top Border for Mobile/Grid adjustments - using strict grid now */}
            <div className="absolute top-0 left-0 w-full h-px bg-border md:hidden" />

            {/* Monospace Numbering */}
            <div className="text-mono text-muted-foreground mb-4 text-xs">
              {(i + 1).toString().padStart(2, "0")}
            </div>

            <div className="mb-4 text-foreground">
              <feature.icon className="w-5 h-5 stroke-1" />
            </div>

            <h3 className="font-normal tracking-tight mb-2 text-foreground">
              {feature.title}
            </h3>

            <p className="leading-relaxed text-muted-foreground max-w-[24ch]">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
