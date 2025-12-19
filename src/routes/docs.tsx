import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import { Book, Code, Layers, Play, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});

function DocsLayout() {
  const sections = [
    {
      title: "Getting Started",
      items: [
        { to: "/docs", label: "Introduction", icon: Book },
        { to: "/docs/quickstart", label: "Quickstart", icon: Play },
        { to: "/docs/installation", label: "Installation", icon: Terminal },
      ],
    },
    {
      title: "Core Concepts",
      items: [
        { to: "/docs/core-concepts", label: "Concepts", icon: Layers },
        { to: "/docs/providers", label: "Providers", icon: Layers },
      ],
    },
    {
      title: "Reference",
      items: [
        { to: "/docs/api-reference", label: "API Reference", icon: Code },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background flex pt-14">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 fixed top-14 bottom-0 left-0 border-r bg-background/50 backdrop-blur-xl z-30 overflow-y-auto pb-10">
        <div className="p-6">
          {sections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 px-2">
                {section.title}
              </h4>
              <nav className="space-y-0.5">
                {section.items.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    activeProps={{
                      className: "bg-primary/10 text-primary font-medium",
                    }}
                    inactiveProps={{
                      className:
                        "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    }}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-md transition-colors"
                  >
                    <link.icon className="h-4 w-4 opacity-70" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 w-full min-w-0">
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-12 lg:px-12">
          <Outlet />
        </div>
      </main>

      {/* Right Rail (Placeholder for Table of Contents) */}
      <div className="hidden xl:block w-64 fixed top-14 bottom-0 right-0 py-10 px-6 border-l bg-background/20 backdrop-blur-sm">
        <div className="text-sm font-medium text-foreground mb-4">
          On this page
        </div>
        <div className="text-sm text-muted-foreground space-y-2">
          <p className="hover:text-foreground cursor-pointer transition-colors">
            Overview
          </p>
          <p className="hover:text-foreground cursor-pointer transition-colors">
            Installation
          </p>
          <p className="hover:text-foreground cursor-pointer transition-colors">
            Usage
          </p>
        </div>
      </div>
    </div>
  );
}
