import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import { Book, Code, Layers, Play } from "lucide-react";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});

function DocsLayout() {
  const links = [
    {
      to: "/docs",
      label: "Introduction",
      icon: <Book size={14} />,
    },
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
    <div className="min-h-screen bg-zinc-900 text-white pt-16 flex">
      {/* Sidebar */}
      <aside className="w-64 fixed top-16 bottom-0 left-0 border-r border-white/10 overflow-y-auto bg-zinc-900/50 backdrop-blur-xl hidden md:block">
        <div className="p-6">
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">
            Documentation
          </h2>
          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeProps={{
                  className:
                    "bg-indigo-500/10 text-indigo-400 border-r-2 border-indigo-400",
                }}
                className="flex items-center gap-3 px-4 py-2 text-xs text-zinc-400 hover:text-white hover:bg-white/5 rounded-r-lg transition-colors border-r-2 border-transparent"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-12 max-w-4xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
