export type SearchItem = {
  title: string;
  href: string;
  category: "Pages" | "Documentation" | "Community";
};

export const searchIndex: SearchItem[] = [
  // Pages
  { title: "Home", href: "/", category: "Pages" },
  { title: "Playground", href: "/docs/playground", category: "Pages" },
  { title: "Examples", href: "/docs/examples", category: "Pages" },

  // Documentation
  { title: "Documentation Home", href: "/docs", category: "Documentation" },
  { title: "Quickstart", href: "/docs/quickstart", category: "Documentation" },
  {
    title: "Installation",
    href: "/docs/installation",
    category: "Documentation",
  },
  {
    title: "Core Concepts",
    href: "/docs/core-concepts",
    category: "Documentation",
  },
  { title: "Providers", href: "/docs/providers", category: "Documentation" },

  // Community
  {
    title: "GitHub",
    href: "https://github.com/shambhav15/memori-js",
    category: "Community",
  },
  {
    title: "NPM",
    href: "https://www.npmjs.com/package/memori-js",
    category: "Community",
  },
];
