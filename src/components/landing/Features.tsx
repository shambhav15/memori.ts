import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Zap,
  Box,
  Layout,
  Cpu,
  Database,
  ChevronRight,
  Terminal,
  Copy,
  Check,
} from "lucide-react";
import { CodeBlock } from "../ui/CodeBlock";

export function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [copied, setCopied] = useState(false);

  const features = [
    {
      id: 0,
      icon: <Brain className="w-4 h-4" />,
      title: "ACTIVE_MEMORY",
      description:
        "Memori lives inside your app, actively managing context for your agents.",
      technical_detail: "Context Injection via Middleware",
      code: `// Auto-injects relevant context
memori.llm.register(openai);
await openai.chat.completions.create({...})`,
    },
    {
      id: 1,
      icon: <Zap className="w-4 h-4" />,
      title: "ZERO_CONFIG",
      description:
        "Start with a local SQLite database instantly. No Docker needed.",
      technical_detail: "Embedded SQLite Vector",
      code: `// No docker run needed
const memori = new Memori({
  storage: 'sqlite-local' 
});`,
    },
    {
      id: 2,
      icon: <Box className="w-4 h-4" />,
      title: "PROVIDER_AGNOSTIC",
      description:
        "Seamless integration with OpenAI, Google GenAI, and Anthropic.",
      technical_detail: "Unified LLM Interface",
      code: `// Works with any provider
import { OpenAI, Anthropic } from 'memori-js';`,
    },
    {
      id: 3,
      icon: <Layout className="w-4 h-4" />,
      title: "AUTO_AUGMENTATION",
      description:
        "Patches your existing LLM client to inject memory automatically.",
      technical_detail: "Runtime Monkey-Patching",
      code: `// Standard client remains unchanged
const client = new OpenAI(apiKey);`,
    },
    {
      id: 4,
      icon: <Cpu className="w-4 h-4" />,
      title: "SQL_NATIVE",
      description: "Powered by sqlite-vec locally or pgvector in the cloud.",
      technical_detail: "SQL-Based Vector Search",
      code: `SELECT * FROM embeddings 
ORDER BY vec_distance(vec, ?) 
LIMIT 5;`,
    },
    {
      id: 5,
      icon: <Database className="w-4 h-4" />,
      title: "CLOUD_READY",
      description: "Scale from local SQLite to Postgres (Supabase, Neon).",
      technical_detail: "Postgres Adapter",
      code: `// Switch to Postgres easily
storage: {
  type: 'postgres',
  url: process.env.DATABASE_URL
}`,
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-6 relative z-10 bg-[#050505]">
      {/* Subtle Background Gradient for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8 border-l-2 border-indigo-500 pl-4">
          <h2 className="text-base font-bold font-mono text-white uppercase mb-1">
            CORE_CAPABILITIES
          </h2>
          <p className="text-xs text-zinc-400 max-w-xl font-mono">
            Explore the primitives that power stateful agents.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive List - More Compact */}
          <div className="lg:col-span-4 flex flex-col gap-1">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}
                className={`group flex items-center gap-3 p-3 rounded-md text-left transition-all duration-200 border ${
                  activeFeature === index
                    ? "bg-zinc-900/80 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                    : "bg-transparent border-transparent hover:bg-zinc-900/30 hover:border-white/5"
                }`}
              >
                <div
                  className={`p-1.5 rounded bg-zinc-950 border border-white/5 ${activeFeature === index ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"}`}
                >
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-mono text-xs font-bold transition-colors ${activeFeature === index ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"}`}
                  >
                    {feature.title}
                  </h3>
                </div>
                <ChevronRight
                  className={`w-3 h-3 transition-all ${activeFeature === index ? "text-indigo-500 opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
                />
              </button>
            ))}
          </div>

          {/* Right Column: Dynamic Preview - Compact & Code-Focused */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="h-full bg-zinc-900/30 border border-indigo-500/10 rounded-lg p-1 relative overflow-hidden backdrop-blur-md"
              >
                <div className="h-full bg-[#0a0a0a]/90 rounded p-6 flex flex-col justify-between relative z-10">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-indigo-400 uppercase tracking-widest">
                        <Terminal size={10} />
                        {features[activeFeature].technical_detail}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                      {features[activeFeature].title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6 max-w-lg font-mono">
                      {features[activeFeature].description}
                    </p>
                  </div>

                  {/* Code Snippet Area - Enhanced Styling */}
                  <div className="mt-auto">
                    <CodeBlock
                      code={features[activeFeature].code}
                      language="typescript"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
