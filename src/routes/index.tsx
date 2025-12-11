import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { BenchmarkChart } from "../components/landing/BenchmarkChart";
import { Check } from "lucide-react";
import { BorderBeam } from "../components/ui/BorderBeam";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen bg-[#020205] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] text-zinc-300 selection:bg-indigo-500/30 font-sans">
      <Hero />

      {/* Quick Benchmark Section */}
      <section className="py-12 px-6 border-y border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-lg font-bold font-mono text-white mb-4 border-l-2 border-emerald-500 pl-4">
              ZERO_LATENCY_IMPACT
            </h2>
            <p className="text-sm text-zinc-400 mb-6 font-mono leading-relaxed pl-4">
              By bypassing external HTTP requests to Pinecone/Weaviate, Memori
              reduces retrieval latency by 90%. It runs in the same process as
              your LLM logic.
            </p>
            <ul className="space-y-2 font-mono text-xs pl-4">
              <li className="flex items-center gap-2 text-zinc-300">
                <Check size={12} className="text-emerald-500" />
                <span>IN_PROCESS_SQLITE_ADAPTER</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-300">
                <Check size={12} className="text-emerald-500" />
                <span>NO_NETWORK_OVERHEAD</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-300">
                <Check size={12} className="text-emerald-500" />
                <span>SYNCHRONOUS_INJECTION</span>
              </li>
            </ul>
          </div>
          <BenchmarkChart />
        </div>
      </section>

      <Features />

      {/* Comparison Section (Condensed) */}
      <section className="py-32 px-6 border-t border-white/5 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/20 via-[#050505] to-[#050505]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xl font-bold font-mono text-white mb-3">
              ARCHITECTURE_COMPARISON
            </h2>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              TRADITIONAL_RAG_STACK{" "}
              <span className="text-indigo-500 mx-2">VS</span>{" "}
              MEMORI_ACTIVE_LAYER
            </p>
          </div>

          <div className="relative grid md:grid-cols-2 gap-8 items-stretch">
            {/* VS Badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-black border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
              <span className="font-black italic text-indigo-500 text-sm">
                VS
              </span>
            </div>

            {/* Standard VDB Column */}
            <div className="relative p-8 rounded-2xl bg-zinc-900/20 border border-white/5 backdrop-blur-sm group hover:border-red-500/20 hover:bg-red-500/[0.02] transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-mono text-sm font-bold text-zinc-500 group-hover:text-red-400 transition-colors">
                  LEGACY_STACK
                </h3>
                <div className="px-2 py-1 rounded bg-zinc-900 border border-white/5 text-[10px] text-zinc-600 font-mono">
                  COMPLEX
                </div>
              </div>

              <ul className="space-y-4 font-mono text-xs text-zinc-500">
                <li className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="w-5 h-5 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  </div>
                  <span>Docker Container Required</span>
                </li>
                <li className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="w-5 h-5 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  </div>
                  <span>Manual Embedding Pipeline</span>
                </li>
                <li className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className="w-5 h-5 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  </div>
                  <span>High Network Latency</span>
                </li>
              </ul>
            </div>

            {/* Memori Column */}
            <div className="relative p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 shadow-2xl group overflow-hidden">
              {/* Holographic Beam */}
              <BorderBeam
                duration={8}
                size={150}
                colorFrom="#6366f1"
                colorTo="#10b981"
              />

              <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="font-mono text-sm font-bold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                  MEMORI_LAYER
                </h3>
                <span className="px-2 py-1 rounded text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                  ACTIVE
                </span>
              </div>

              <ul className="space-y-4 font-mono text-xs text-zinc-300">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <Check size={10} className="text-indigo-400" />
                  </div>
                  <span className="text-white">
                    Zero Infrastructure (SQLite)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <Check size={10} className="text-indigo-400" />
                  </div>
                  <span className="text-white">Auto-Injection Middleware</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <Check size={10} className="text-indigo-400" />
                  </div>
                  <span className="text-white">Zero-Latency / Synchronous</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 bg-black text-center">
        <div className="flex justify-center gap-6 mb-6 font-mono text-xs text-zinc-500">
          <a
            href="https://github.com/shambhav15/memori-js"
            className="hover:text-white transition-colors uppercase"
          >
            GitHub
          </a>
          <a
            href="/docs"
            className="hover:text-white transition-colors uppercase"
          >
            Documentation
          </a>
          <a
            href="/community"
            className="hover:text-white transition-colors uppercase"
          >
            Community
          </a>
        </div>
        <div className="text-[10px] text-zinc-700 font-mono">
          COPYRIGHT_{new Date().getFullYear()} © MEMORI_JS_CONTRIBUTORS //
          MIT_LICENSE
        </div>
      </footer>
    </div>
  );
}
