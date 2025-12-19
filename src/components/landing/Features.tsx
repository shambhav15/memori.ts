import { motion } from "framer-motion";
import { Database, Zap, Shield, Globe, Cpu, Layers } from "lucide-react";

const features = [
  {
    title: "SQL Native",
    description:
      "Built on standard SQL. Query your agent's memory using tools you already know and trust.",
    icon: Database,
    color: "text-blue-400",
  },
  {
    title: "Zero Config",
    description:
      "Starts with local SQLite. No Docker containers or complex vector DB setups required to develop.",
    icon: Zap,
    color: "text-amber-400",
  },
  {
    title: "Universal",
    description:
      "Works with OpenAI, Anthropic, and any other LLM provider via a simple middleware pattern.",
    icon: Globe,
    color: "text-purple-400",
  },
  {
    title: "Local First",
    description:
      "Your data stays on your machine. Optional cloud sync only when you're ready to deploy.",
    icon: Shield,
    color: "text-green-400",
  },
];

export function Features() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/30 p-6 transition-all hover:bg-card/50 hover:shadow-lg hover:border-border/80"
          >
            <div
              className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 ${feature.color}`}
            >
              <feature.icon className="h-5 w-5" />
            </div>
            <h3 className="mb-2 text-base font-bold tracking-tight text-foreground">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground/90">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
