import { Link, useLocation } from "@tanstack/react-router";
import { ModeToggle as ThemeToggle } from "./mode-toggle";
import { CommandMenu } from "./CommandMenu";
import { Memori } from "@/lib/icons";
import { MobileSidebar } from "./AppSidebar";

export default function Header() {
  const location = useLocation();
  const isDocsPage = location.pathname.startsWith("/docs");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 sm:px-6 max-w-[1220px] mx-auto">
        {/* Mobile menu trigger - only on docs pages */}
        {isDocsPage && <MobileSidebar />}

        {/* Logo with brand name - Factory.ai style */}
        <Link to="/" className="flex items-center gap-2 group">
          <Memori className="h-5 w-auto transition-transform group-hover:scale-105" />
          <span className="text-mono text-foreground hidden sm:inline">
            memori
          </span>
        </Link>

        {/* Spacer to push everything else to the right */}
        <div className="flex-1" />

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Command Menu (Search) */}
          <div className="w-48 md:w-64">
            <CommandMenu />
          </div>
          <div className="w-px h-4 bg-border/50 hidden sm:block mx-1" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
