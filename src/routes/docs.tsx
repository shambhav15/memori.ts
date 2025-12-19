import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});

function DocsLayout() {
  return (
    <div className="flex w-full min-h-[calc(100vh-3.5rem)]">
      {/* Sidebar - only visible on docs pages */}
      <AppSidebar />

      <main className="flex-1 w-full min-w-0 py-8 lg:py-10 px-6 md:px-8">
        <div className="mx-auto max-w-3xl lg:mr-auto lg:ml-0 xl:mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Right Rail - Table of Contents */}
      <aside className="hidden xl:block w-64 shrink-0 border-l border-border/50 py-8 px-6 lg:py-10">
        <div className="sticky top-20">
          <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            On this page
          </h4>
          <div className="flex flex-col gap-2">
            <a
              href="#"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Overview
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Prerequisites
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Configuration
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-xs h-8"
            >
              Edit this page on GitHub
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
