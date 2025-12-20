import { motion } from "framer-motion";
import { Database, Zap, Globe, Cloud } from "lucide-react";

const features = [
  {
    title: "SQL Native",
    description:
      "Query your agent's memory using standard SQL. No learning curve, just powerful relational queries.",
    icon: Database,
    color: "from-blue-500/20 to-blue-600/20 text-blue-400",
    border: "group-hover:border-blue-500/50",
  },
  {
    title: "Zero Config",
    description:
      "Start coding instantly. No Docker, no API keys, no complex vector DB infrastructure to manage.",
    icon: Zap,
    color: "from-amber-500/20 to-amber-600/20 text-amber-400",
    border: "group-hover:border-amber-500/50",
  },
  {
    title: "Universal LLM Support",
    description:
      "Works with OpenAI, Anthropic, Gemini, and local LLMs via a simple, unified adapter interface.",
    icon: Globe,
    color: "from-purple-500/20 to-purple-600/20 text-purple-400",
    border: "group-hover:border-purple-500/50",
  },
  {
    title: "Local-First + Cloud Sync",
    description:
      "Data lives on your device by default for max privacy. Sync to the cloud only when you need it.",
    icon: Cloud,
    color: "from-green-500/20 to-green-600/20 text-green-400",
    border: "group-hover:border-green-500/50",
  },
];

export function Features() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-black mb-4">
          Everything you need. <br />
          <span className="text-muted-foreground">Nothing you don't.</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`group relative overflow-hidden rounded-2xl border border-border/40 bg-card/20 p-8 transition-all hover:bg-card/40 hover:shadow-2xl hover:-translate-y-1 ${feature.border}`}
          >
            <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />

            <div
              className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br ${feature.color} border border-white/5 shadow-inner`}
            >
              <feature.icon className="h-7 w-7" />
            </div>

            <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground">
              {feature.title}
            </h3>

            <p className="text-sm leading-relaxed text-muted-foreground/80 font-medium">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
