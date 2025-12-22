import { createFileRoute } from "@tanstack/react-router";
import { Github, Package, Globe } from "lucide-react";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { ComparisonTable } from "../components/landing/ComparisonTable";
import { CodeTeaser } from "../components/landing/CodeTeaser";
import { FlowDiagram } from "../components/landing/FlowDiagram";
import { WhyMemori } from "@/components/landing/WhyMemori";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Hero />

      <div className="relative z-10 space-y-0 pb-0">
        <CodeTeaser />
        <WhyMemori />
        <ComparisonTable />
        <Features />
        <FlowDiagram />
      </div>

      {/* Footer */}
      {/* Footer - Factory Style */}
      <footer className="border-t border-border bg-background py-12">
        <div className="container-factory">
          <div className="grid md:grid-cols-4 gap-12 lg:gap-24 mb-10">
            {/* Brand Column */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center font-bold text-lg rounded-sm">
                  M
                </div>
                <span className="font-bold text-xl tracking-tighter">
                  memori.ts
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                The SQL-Native AI Memory Fabric. <br />
                Engineered for the next generation of intelligent agents.
              </p>

              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                SYSTEM STATUS: OPERATIONAL
              </div>
            </div>

            {/* Resources */}
            <div className="space-y-6">
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Resources
              </h4>
              <ul className="space-y-4 text-sm font-medium">
                <li>
                  <a
                    href="/docs"
                    className="hover:text-accent transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/shambhav15/memori-js"
                    className="hover:text-accent transition-colors"
                  >
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/memori-js"
                    className="hover:text-accent transition-colors"
                  >
                    NPM Package
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="space-y-6">
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Connect
              </h4>
              <ul className="space-y-4 text-sm font-medium">
                <li>
                  <a
                    href="/community"
                    className="hover:text-accent transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="https://memorilabs.ai"
                    className="hover:text-accent transition-colors"
                  >
                    Memorilabs.ai
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/memori_ts"
                    className="hover:text-accent transition-colors"
                  >
                    Twitter / X
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground font-mono">
              © {new Date().getFullYear()} MEMORI.TS INC. ALL RIGHTS RESERVED.
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/shambhav15/memori-js"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.npmjs.com/package/memori-js"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Package className="w-5 h-5" />
              </a>
              <a
                href="https://memorilabs.ai"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
