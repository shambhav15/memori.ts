import { motion } from "framer-motion";
import { ArrowRight, Terminal, Activity, Database, Cpu } from "lucide-react";
import { Button } from "../ui/Button";
import { CodeBlock } from "../ui/CodeBlock";
import { BackgroundBeams } from "../ui/BackgroundBeams";

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 px-6 min-h-[80vh] flex flex-col justify-center overflow-hidden bg-[#020205] selection:bg-indigo-500/30">
      {/* Dynamic Background Beams */}
      <div className="absolute inset-0 z-0">
        <BackgroundBeams />
      </div>

      {/* HUD Grid Background - Fainter */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Technical Copy */}
        <div className="text-left space-y-6">
          {/* Status Indicator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-xs font-mono text-emerald-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SYSTEM_ACTIVE: V1.2.0-STABLE
          </motion.div>

          {/* Main Headline - Dense & Technical */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl font-bold font-mono tracking-tight text-white uppercase border-l-2 border-indigo-500 pl-4"
            >
              SQL_NATIVE_MEMORY_LAYER <br />
              <span className="text-zinc-500">FOR_AUTONOMOUS_AGENTS</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-zinc-400 max-w-lg leading-relaxed border-l-2 border-white/5 pl-4"
          >
            Bridge the context gap. Memori-JS injects active state into LLM
            completions without manual vector store management. Zero-config.
            Type-safe.
          </motion.p>

          {/* Metrics / Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-4 py-6 border-y border-white/5"
          >
            <div>
              <div className="text-xs text-zinc-500 font-mono mb-1">
                LATENCY
              </div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Activity size={14} className="text-indigo-400" /> &lt;20ms
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 font-mono mb-1">
                STORAGE
              </div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Database size={14} className="text-purple-400" /> SQLite/PG
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 font-mono mb-1">
                RUNTIME
              </div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu size={14} className="text-emerald-400" /> Node/Bun
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <div className="w-full sm:w-auto">
              <CodeBlock
                code="npm install memori-js"
                language="bash"
                variant="inline"
                className="border-indigo-500/20 bg-zinc-900/50"
              />
            </div>

            <Button to="/docs" size="sm" className="font-mono text-xs h-9">
              INIT_DOCUMENTATION <ArrowRight className="w-3 h-3 ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* Right Column: Code Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative decorative lines */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-indigo-500/50" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-indigo-500/50" />

          <div className="rounded-lg border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
              <span className="text-zinc-500">core/agent.ts</span>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-zinc-700" />
                <div className="w-2 h-2 rounded-full bg-zinc-700" />
              </div>
            </div>
            <div className="p-6 overflow-x-auto text-zinc-300">
              <div className="flex">
                <span className="text-zinc-600 mr-4">01</span>
                <span className="text-purple-400">import</span> {"{"} Memori{" "}
                {"}"} <span className="text-purple-400">from</span>{" "}
                <span className="text-green-400">'memori-js'</span>;
              </div>
              <div className="flex">
                <span className="text-zinc-600 mr-4">02</span>
              </div>
              <div className="flex">
                <span className="text-zinc-600 mr-4">03</span>
                <span className="text-zinc-500">
                  // Initialize active memory layer
                </span>
              </div>
              <div className="flex">
                <span className="text-zinc-600 mr-4">04</span>
                <span className="text-purple-400">const</span> memori ={" "}
                <span className="text-purple-400">new</span>{" "}
                <span className="text-yellow-300">Memori</span>();
              </div>
              <div className="flex">
                <span className="text-zinc-600 mr-4">05</span>
              </div>
              <div className="flex">
                <span className="text-zinc-600 mr-4">06</span>
                <span className="text-zinc-500">
                  // Patch LLM client (OpenAI/Anthropic)
                </span>
              </div>
              <div className="flex">
                <span className="text-zinc-600 mr-4">07</span>memori.llm.
                <span className="text-blue-400">register</span>(client);
              </div>
              <div className="flex">
                <span className="text-zinc-600 mr-4">08</span>
              </div>
              <div className="flex">
                <span className="text-zinc-600 mr-4">09</span>
                <span className="text-zinc-500">
                  // Context is auto-injected
                </span>
              </div>
              <div className="flex">
                <span className="text-zinc-600 mr-4">10</span>
                <span className="text-purple-400">const</span> res ={" "}
                <span className="text-purple-400">await</span>{" "}
                client.chat.completions.
                <span className="text-blue-400">create</span>({"{"}
              </div>
              <div className="flex">
                <span className="text-zinc-600 mr-4">11</span> messages: [{"{"}{" "}
                role: <span className="text-green-400">'user'</span>, content:
                query {"}"}]
              </div>
              <div className="flex">
                <span className="text-zinc-600 mr-4">12</span>
                {"}"});
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
