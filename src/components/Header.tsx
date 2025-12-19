import { Link } from "@tanstack/react-router";

import { Menu, Github, BookOpen, Users } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export default function Header() {
  const navLinks = [
    { name: "Documentation", href: "/docs", icon: BookOpen },
    { name: "Community", href: "/community", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/memori.svg"
              alt="Logo"
              className="h-8 w-16 opacity-75 dark:opacity-100 dark:invert"
            />
            <span className="text-lg font-bold tracking-tight text-foreground font-sans">
              memori.ts
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              {link.name}
            </Link>
          ))}
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/shambhav15/memori-js"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <ModeToggle />
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="text-left font-bold flex items-center gap-2">
                  <span className="text-xl">🧠</span> memori.ts
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <link.icon className="h-5 w-5" />
                    {link.name}
                  </Link>
                ))}
                <Separator className="my-2" />
                <a
                  href="https://github.com/shambhav15/memori-js"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                  GitHub
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
