import { createFileRoute } from "@tanstack/react-router";
import { Github, Package, Globe } from "lucide-react";
import { Hero } from "../components/landing/Hero";
import { WhyMemori } from "../components/landing/WhyMemori";
import { SearchComparison } from "../components/landing/SearchComparison";
import { ComparisonTable } from "../components/landing/ComparisonTable";
import { ProviderShowcase } from "../components/landing/ProviderShowcase";
import { PhilosophySection } from "../components/landing/PhilosophySection";
import { Features } from "../components/landing/Features";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Hero Section */}
      <Hero />

      {/* Main Content Stack */}
      <div className="flex flex-col gap-24 pb-24">
        {/* Why Memori - Pain Points & Solution */}
        <WhyMemori />

        {/* Interactive Search Comparison */}
        <div className="container mx-auto px-6">
          <SearchComparison />
        </div>

        {/* Comparison Table */}
        <div className="bg-muted/30 py-24">
          <ComparisonTable />
        </div>

        {/* Features / Core Capabilities */}
        <div className="container mx-auto px-6">
          <Features />
        </div>

        {/* Provider Showcase */}
        <div className="bg-muted/30 py-24">
          <ProviderShowcase />
        </div>

        {/* Philosophy Section */}
        <PhilosophySection />
      </div>

      {/* Footer */}
      <footer className="border-t bg-card py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                <span className="font-bold text-xl">memori-js</span>
              </div>
              <p className="text-muted-foreground max-w-sm leading-relaxed">
                The SQL-Native AI Memory Fabric for JavaScript & TypeScript.
                Building the long-term memory layer for the next generation of
                AI agents.
              </p>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="font-semibold tracking-tight">Resources</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a
                    href="/docs"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/shambhav15/memori-js"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/memori-js"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    NPM Package
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="space-y-4">
              <h4 className="font-semibold tracking-tight">Community</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a
                    href="/community"
                    className="hover:text-foreground transition-colors"
                  >
                    Join Community
                  </a>
                </li>
                <li>
                  <a
                    href="https://memorilabs.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    memorilabs.ai
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div>
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
