import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import { Book, Code, Layers, Play } from "lucide-react";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});

function DocsLayout() {
  const links = [
    { to: "/docs", label: "Introduction", icon: <Book size={14} /> },
    {
      to: "/docs/getting-started",
      label: "Getting Started",
      icon: <Play size={14} />,
    },
    {
      to: "/docs/core-concepts",
      label: "Core Concepts",
      icon: <Layers size={14} />,
    },
    {
      to: "/docs/api-reference",
      label: "API Reference",
      icon: <Code size={14} />,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row pt-16">
      {/* Sidebar */}
      <aside className="w-full md:w-64 md:fixed md:top-16 md:bottom-0 md:left-0 border-b md:border-b-0 md:border-r border-border bg-background/95 backdrop-blur z-30">
        <div className="p-6 h-full overflow-y-auto">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 px-2">
            Documentation
          </h2>
          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeProps={{
                  className:
                    "bg-primary/5 text-primary border-primary font-medium",
                }}
                className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-all border-l-2 border-transparent"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 w-full max-w-4xl mx-auto p-6 md:p-12 lg:pr-24">
        <Outlet />
      </main>
    </div>
  );
}
