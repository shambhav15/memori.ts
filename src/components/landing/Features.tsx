import { Brain, Zap, Box, Layout, Cpu, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Features() {
  const features = [
    {
      title: "Active Memory",
      desc: "Injects context automatically.",
      icon: Brain,
      className: "md:col-span-2",
    },
    {
      title: "Zero Config",
      desc: "Starts with local SQLite.",
      icon: Zap,
      className: "",
    },
    {
      title: "Provider Agnostic",
      desc: "Works with OpenAI, Anthropic, etc.",
      icon: Box,
      className: "",
    },
    {
      title: "Auto Augmentation",
      desc: "Patches your client seamlessly.",
      icon: Layout,
      className: "md:col-span-2",
    },
    {
      title: "SQL Native",
      desc: "Powered by vector extensions.",
      icon: Cpu,
      className: "",
    },
    {
      title: "Cloud Ready",
      desc: "Scale to Postgres easily.",
      icon: Database,
      className: "",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight mb-3">
          Core Capabilities
        </h2>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          Essential primitives for building stateful, long-term memory into your
          agents.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
        {features.map((f, i) => (
          <Card
            key={i}
            className={`flex flex-col justify-between border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 ${f.className || ""}`}
          >
            <CardHeader>
              <f.icon className="w-6 h-6 text-primary mb-2 opacity-80" />
              <CardTitle className="text-lg">{f.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}


