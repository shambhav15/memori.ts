import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import Header from "../components/Header";
import appCss from "../styles.css?url";
import { ThemeProvider } from "@/provider/theme-provider";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/" className="text-primary text-xs hover:underline">
        Go back home
      </Link>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "memori.ts",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="relative min-h-screen w-full bg-background font-sans antialiased text-foreground overflow-x-hidden">
            {/* Premium Background Glows */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              <div
                className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse"
                style={{ animationDuration: "4s" }}
              />
              <div
                className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse"
                style={{ animationDuration: "5s" }}
              />
              <div
                className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] bg-red-500/5 rounded-full blur-[150px] animate-pulse"
                style={{ animationDuration: "6s" }}
              />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 w-full">{children}</main>
            </div>
          </div>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
