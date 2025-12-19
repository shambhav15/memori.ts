import { Brain, Zap, Box, Layout, Cpu, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      title: "Active Memory",
      desc: "Automatically injects relevant conversation context into every LLM call.",
      icon: Brain,
      className: "md:col-span-2",
    },
    {
      title: "Zero Config",
      desc: "Starts instantly with local SQLite. No docker needed.",
      icon: Zap,
    },
    {
      title: "Provider Agnostic",
      desc: "Works with OpenAI, Anthropic, DeepSeek, and custom LLMs.",
      icon: Box,
    },
    {
      title: "Auto Augmentation",
      desc: "Patches your client seamlessly without changing business logic.",
      icon: Layout,
      className: "md:col-span-2",
    },
    {
      title: "SQL Native",
      desc: "Powered by vector extensions. Fast, reliable, and queryable.",
      icon: Cpu,
    },
    {
      title: "Cloud Ready",
      desc: "Scale to Postgres/Supabase when you need production power.",
      icon: Database,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Core Capabilities
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Essential primitives for building stateful, long-term memory into your
          agents.
        </p>
      </div>

      <motion.div
        className="grid md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {features.map((f, i) => (
          <motion.div key={i} variants={item} className={f.className}>
            <Card className="h-full flex flex-col justify-between border-primary/10 bg-card hover:bg-muted/50 transition-all duration-300 group">
              <CardHeader>
                <div className="mb-4 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <f.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
