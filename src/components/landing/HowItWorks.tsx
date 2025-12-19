import { motion } from "framer-motion";
import { CodeBlock } from "../ui/code-block";
import { Terminal, Code2, MessageSquare } from "lucide-react";

const steps = [
  {
    title: "Install & Setup",
    description:
      "Add memori-js to your project. It's a lightweight wrapper around your existing LLM calls.",
    icon: Terminal,
    code: "npm install memori-js",
    lang: "bash",
  },
  {
    title: "Register Middleware",
    description:
      "Initialize Memori and register your client. We intercept specific method calls to inject context.",
    icon: Code2,
    code: `const memori = new Memori();\nmemori.llm.register(openai);`,
    lang: "typescript",
  },
  {
    title: "Chat Naturally",
    description:
      "Your agent now remembers. Every completion call is automatically enhanced with relevant history.",
    icon: MessageSquare,
    code: `await openai.chat.completions.create({\n  messages: [{ role: "user", content: "..." }]\n});`,
    lang: "typescript",
  },
];

export function HowItWorks() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-24 border-t border-border/40">
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-foreground">
          How it works
        </h2>
        <p className="text-muted-foreground max-w-2xl leading-relaxed text-sm md:text-base">
          Memori acts as a transparent middleware layer. You don't need to
          rewrite your application logic or manage vector stores manually.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="bg-muted p-2 rounded-lg">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-base text-foreground">
                {i + 1}. {step.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed h-12">
              {step.description}
            </p>
            <div className="mt-2">
              <CodeBlock
                code={step.code}
                language={step.lang}
                showLineNumbers={false}
                className="text-xs bg-muted/40 border border-border/50"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
