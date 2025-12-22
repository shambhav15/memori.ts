import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Home,
  Terminal,
  LayoutGrid,
  Github,
  BookOpen,
  Menu,
  X,
  Zap,
  Download,
  Puzzle,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Navigation items
const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Playground", url: "/docs/playground", icon: Terminal },
  { title: "Examples", url: "/docs/examples", icon: LayoutGrid },
];

const docsItems = [
  { title: "Introduction", url: "/docs", icon: BookOpen },
  { title: "Quickstart", url: "/docs/quickstart", icon: Zap },
  { title: "Installation", url: "/docs/installation", icon: Download },
  { title: "Core Concepts", url: "/docs/core-concepts", icon: Puzzle },
  { title: "Providers", url: "/docs/providers", icon: Settings },
];

// Documentation nav with indented line
function DocsNav({
  pathname,
  onItemClick,
}: {
  pathname: string;
  onItemClick?: () => void;
}) {
  return (
    <div className="space-y-1">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-3">
        Documentation
      </h3>
      <div className="relative">
        {/* Vertical indent line */}
        <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border/60" />

        <ul className="space-y-1">
          {docsItems.map((item, index) => (
            <li key={item.title} className="relative">
              {/* Horizontal connector line */}
              <div
                className={cn(
                  "absolute left-[18px] top-1/2 w-3 h-px bg-border/60",
                  index === 0 && "hidden"
                )}
              />
              <Link
                to={item.url}
                onClick={onItemClick}
                className={cn(
                  "flex items-center gap-3 py-2 rounded-lg text-sm transition-colors",
                  index === 0 ? "px-3" : "pl-8 pr-3",
                  pathname === item.url
                    ? "bg-red-500/10 text-red-500 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Mobile Sidebar Component
export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {/* Hamburger Button - visible only on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 -ml-2 rounded-lg hover:bg-muted/50 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-background z-50 transform transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-bold text-sm">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Application Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3">
              Application
            </h3>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.url}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      pathname === item.url
                        ? "bg-red-500/10 text-red-500 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentation Section */}
          <DocsNav pathname={pathname} onItemClick={() => setIsOpen(false)} />
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <a
            href="https://github.com/shambhav15/memori-js"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </>
  );
}

// Desktop Sidebar Component
export function AppSidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className="hidden md:flex flex-col w-80 min-h-screen sticky top-0 border-r border-border bg-background/95 backdrop-blur-sm">
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6">
        {/* Application Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3">
            Application
          </h3>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.title}>
                <Link
                  to={item.url}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    pathname === item.url
                      ? "bg-red-500/10 text-red-500 font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Documentation Section */}
        <DocsNav pathname={pathname} />
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <a
          href="https://github.com/shambhav15/memori-js"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <Github className="h-5 w-5" />
          <span>GitHub</span>
        </a>
      </div>
    </aside>
  );
}
