import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/landing/Hero";
import { WhyMemori } from "../components/landing/WhyMemori";
import { SearchComparison } from "../components/landing/SearchComparison";
import { ComparisonTable } from "../components/landing/ComparisonTable";
import { ProviderShowcase } from "../components/landing/ProviderShowcase";
import { PhilosophySection } from "../components/landing/PhilosophySection";
import { Features } from "../components/landing/Features";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen bg-[#020205] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] text-zinc-300 selection:bg-indigo-500/30 font-sans">
      {/* Hero Section */}
      <Hero />

      {/* Why Memori - Pain Points & Solution */}
      <WhyMemori />

      {/* Interactive Search Comparison */}
      <div className="border-y border-white/5">
        <SearchComparison />
      </div>

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Features / Core Capabilities */}
      <div className="border-y border-white/5 bg-[#050505]">
        <Features />
      </div>

      {/* Provider Showcase */}
      <ProviderShowcase />

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🧠</span>
                <span className="font-bold text-white">memori-js</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                The SQL-Native AI Memory Fabric for JavaScript & TypeScript.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                Resources
              </h4>
              <div className="space-y-2 text-sm">
                <a
                  href="/docs"
                  className="block text-zinc-500 hover:text-white transition-colors"
                >
                  Documentation
                </a>
                <a
                  href="https://github.com/shambhav15/memori-js"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-zinc-500 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.npmjs.com/package/memori-js"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-zinc-500 hover:text-white transition-colors"
                >
                  npm Package
                </a>
              </div>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-4">
                Community
              </h4>
              <div className="space-y-2 text-sm">
                <a
                  href="/community"
                  className="block text-zinc-500 hover:text-white transition-colors"
                >
                  Join Community
                </a>
                <a
                  href="https://memorilabs.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-zinc-500 hover:text-white transition-colors"
                >
                  memorilabs.ai
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[10px] text-zinc-600 font-mono">
              COPYRIGHT_{new Date().getFullYear()} © MEMORI_JS_CONTRIBUTORS //
              MIT_LICENSE
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-600">
              <span className="px-2 py-1 rounded bg-zinc-900/50 border border-white/5">
                v1.0.57
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
