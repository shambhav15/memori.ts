import { motion } from "framer-motion";
import { Terminal, MessageSquare, Database } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Install & Initialize",
      desc: "Add memori-js to your project and initialize it with your preferred configuration.",
      icon: Terminal,
      code: "npm install memori-js",
    },
    {
      id: "02",
      title: "Register Middleware",
      desc: "Connect Memori to your LLM client. It works with OpenAI, Anthropic, and others.",
      icon: Database,
      code: "memori.llm.register(client)",
    },
    {
      id: "03",
      title: "Chat Naturally",
      desc: "Memori automatically retrieves and injects relevant context into your prompts.",
      icon: MessageSquare,
      code: "await client.chat.create(...)",
    },
  ];

  return (
    <section className="py-24 bg-muted/30 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to give your agent a brain.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -z-10" />

          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-2xl bg-background border flex items-center justify-center mb-6 shadow-sm group-hover:border-primary/50 group-hover:shadow-md transition-all relative z-10">
                <step.icon className="w-8 h-8 text-primary" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-muted border flex items-center justify-center font-mono text-xs font-bold">
                  {step.id}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
                {step.desc}
              </p>

              <div className="w-full max-w-[280px] bg-background rounded-lg border px-4 py-2 font-mono text-xs text-muted-foreground truncate">
                {step.code}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
