import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/docs")({
  component: DocsLayout,
});

function DocsLayout() {
  const location = useLocation();
  const isPlayground = location.pathname.includes("/playground");
  const isExamples = location.pathname.includes("/examples");
  const isFullWidth = isPlayground || isExamples;

  return (
    <div className="relative flex w-full min-h-[calc(100vh-3.5rem)] overflow-hidden">
      {/* Background Elements - hide on interactive pages if needed, but keeping for continuity */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[120px] animate-pulse duration-3000" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>
      {/* Sidebar - only visible on docs pages */}
      <AppSidebar />

      <main
        className={cn(
          "relative z-10 flex-1 w-full min-w-0 transition-all",
          isFullWidth ? "p-0" : "py-6 lg:py-8 px-4 md:px-6" // Reduced from py-8/10 px-6/8
        )}
      >
        <div
          className={cn(
            "h-full",
            !isFullWidth && "mx-auto max-w-3xl lg:mr-auto lg:ml-0 xl:mx-auto"
          )}
        >
          <Outlet />
        </div>
      </main>

      {/* Right Rail - Table of Contents */}
      {!isFullWidth && (
        <aside className="relative z-10 hidden xl:block w-64 shrink-0 border-l border-border py-6 px-4 lg:py-8">
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
            <div className="mt-8 pt-8 border-t border-border">
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
      )}
    </div>
  );
}
