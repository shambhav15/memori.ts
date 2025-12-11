import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/landing/Hero";
import { BentoGrid, BentoGridItem } from "../components/landing/BentoGrid";
import { Check, Activity, Database } from "lucide-react";
import { BorderBeam } from "../components/ui/BorderBeam";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen bg-[#020205] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] text-zinc-300 selection:bg-indigo-500/30 font-sans">
      <Hero />

      <section className="py-8 px-6 bg-[#020205]">
        <div className="max-w-7xl mx-auto mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            System_Modules
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <BentoGrid>
          {/* 1. Comparison Card (Span 2) - The visual anchor */}
          <div className="md:col-span-2 row-span-2 rounded-xl bg-[#0a0a0a] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            <BorderBeam
              duration={8}
              size={200}
              colorFrom="#6366f1"
              colorTo="#10b981"
            />

            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-md z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <h3 className="font-mono text-sm font-bold text-white uppercase">
                  Active_Memory_Layer
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-400">
                RFC-9022
              </span>
            </div>

            <div className="p-6 grid grid-cols-2 gap-8 h-full items-center relative z-10">
              {/* Legacy Side */}
              <div className="space-y-4 opacity-50 grayscale transition-all duration-500 hover:opacity-80 hover:grayscale-0">
                <h4 className="text-xs font-mono text-red-400 mb-2 border-b border-red-500/20 pb-2">
                  LEGACY_RAG
                </h4>
                <div className="space-y-2">
                  <div className="h-2 w-3/4 bg-zinc-800 rounded" />
                  <div className="h-2 w-1/2 bg-zinc-800 rounded" />
                  <div className="h-8 w-full bg-zinc-900 border border-white/10 rounded flex items-center justify-center text-[10px] text-zinc-600 font-mono mt-4">
                    DOCKER_CONTAINER
                  </div>
                  <div className="h-8 w-full bg-zinc-900 border border-white/10 rounded flex items-center justify-center text-[10px] text-zinc-600 font-mono">
                    HTTP_LATENCY_500MS
                  </div>
                </div>
              </div>

              {/* Memori Side */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono text-indigo-400 mb-2 border-b border-indigo-500/20 pb-2">
                  MEMORI_RUNTIME
                </h4>
                <div className="space-y-2">
                  <div className="h-2 w-3/4 bg-zinc-700 rounded" />
                  <div className="h-2 w-1/2 bg-zinc-700 rounded" />
                  <div className="h-20 w-full bg-indigo-500/10 border border-indigo-500/20 rounded flex flex-col items-center justify-center text-center p-2 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-indigo-500/5 animate-pulse" />
                    <Database size={16} className="text-indigo-400 mb-2" />
                    <span className="text-[10px] text-indigo-300 font-mono relative z-10">
                      IN-MEMORY_SQLITE
                    </span>
                    <span className="text-[9px] text-emerald-400 font-mono mt-1 relative z-10">
                      0ms_LATENCY
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Zero Latency (Span 1) */}
          <BentoGridItem
            title="ZERO_LATENCY"
            description="Bypass HTTP overhead. Runs in the same process as your LLM logic."
            header={
              <div className="h-24 w-full bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                <Activity className="text-emerald-500" />
              </div>
            }
            className="md:col-span-1 border-white/5 bg-[#0a0a0a]"
          />

          {/* 3. Auto Injection (Span 1) */}
          <BentoGridItem
            title="AUTO_INJECTION"
            description="Middleware automatically injects relevant context into prompt."
            header={
              <div className="h-24 w-full bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20">
                <span className="font-mono text-purple-400 text-xs">{`{ context: [...] }`}</span>
              </div>
            }
            className="md:col-span-1 border-white/5 bg-[#0a0a0a]"
          />

          {/* 4. Type Safety (Span 1) */}
          <BentoGridItem
            title="TYPE_SAFE_SCHEMA"
            description="Define memory schemas with TypeScript interfaces."
            header={
              <div className="h-24 w-full bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                <span className="font-mono text-blue-400 text-xs">
                  interface Memory {}
                </span>
              </div>
            }
            className="md:col-span-1 border-white/5 bg-[#0a0a0a]"
          />

          {/* 5. Metrics / Benchmarks (Span 1) */}
          <div className="md:col-span-1 row-span-1 p-6 rounded-xl bg-[#0a0a0a] border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
            <h3 className="font-mono text-xs font-bold text-zinc-500 mb-4 uppercase">
              BENCHMARKS
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white">Pinecone</span>
                <span className="text-zinc-500">~450ms</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full w-[80%] bg-zinc-700" />
              </div>

              <div className="flex items-center justify-between text-xs font-mono mt-4">
                <span className="text-white">Memori</span>
                <span className="text-emerald-400">12ms</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full w-[5%] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </div>
            </div>
          </div>
        </BentoGrid>
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
