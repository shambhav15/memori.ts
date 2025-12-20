import { Link, useLocation } from "@tanstack/react-router";
import { ModeToggle as ThemeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { CommandMenu } from "./CommandMenu";
import { Memori } from "@/lib/icons";
import { MobileSidebar } from "./AppSidebar";

export default function Header() {
  const location = useLocation();
  const isDocsPage = location.pathname.startsWith("/docs");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 sm:px-6 max-w-6xl mx-auto">
        {/* Mobile menu trigger - only on docs pages */}
        {isDocsPage && <MobileSidebar />}

        {/* Logo with brand name */}
        <Link to="/" className="flex items-center gap-1 group">
          <Memori className="h-6 w-auto" />
          <span className="font-bold text-sm tracking-tight hidden sm:inline">
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
