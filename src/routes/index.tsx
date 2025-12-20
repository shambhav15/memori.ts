import { createFileRoute } from "@tanstack/react-router";
import { Github, Package, Globe } from "lucide-react";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { ComparisonTable } from "../components/landing/ComparisonTable";
import { CodeTeaser } from "../components/landing/CodeTeaser";
import { FlowDiagram } from "../components/landing/FlowDiagram";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Hero />

      <div className="relative z-10 space-y-12 pb-16">
        <CodeTeaser />
        <ComparisonTable />
        <Features />
        <FlowDiagram />
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/40 backdrop-blur-xl py-16 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                <span className="font-bold text-xl tracking-tight">
                  memori.ts
                </span>
              </div>
              <p className="text-muted-foreground/80 max-w-sm leading-relaxed text-sm">
                The SQL-Native AI Memory Fabric for JavaScript & TypeScript.
                Building the long-term memory layer for the next generation of
                AI agents.
              </p>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm tracking-wider uppercase text-foreground/80">
                Resources
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground/80">
                <li>
                  <a
                    href="/docs"
                    className="hover:text-primary transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/shambhav15/memori-js"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/memori-js"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    NPM Package
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm tracking-wider uppercase text-foreground/80">
                Community
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground/80">
                <li>
                  <a
                    href="/community"
                    className="hover:text-primary transition-colors"
                  >
                    Join Community
                  </a>
                </li>
                <li>
                  <a
                    href="https://memorilabs.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    memorilabs.ai
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="mb-8 opacity-10" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/60">
            <div className="flex items-center gap-1">
              &copy; {new Date().getFullYear()} Memori.ts Contributors. Released
              under MIT License.
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/shambhav15/memori-js"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.npmjs.com/package/memori-js"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                <Package className="h-4 w-4" />
              </a>
              <a
                href="https://memorilabs.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
