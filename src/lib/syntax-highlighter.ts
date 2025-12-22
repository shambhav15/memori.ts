export type TokenType =
  | "comment"
  | "keyword"
  | "command"
  | "class"
  | "text"
  | "string";

export interface Token {
  type: TokenType;
  content: string;
}

export type TokenizedLine = Token[];

const KEYWORDS = [
  "const",
  "let",
  "var",
  "function",
  "import",
  "export",
  "from",
  "await",
  "new",
  "class",
  "return",
  "interface",
  "type",
  "async",
];

const COMMANDS = ["npm", "install", "run", "build", "npx", "bun", "yarn"];

const CLASSES = [
  "Memori",
  "OpenAI",
  "Anthropic",
  "Google",
  "Client",
  "VectorDB",
];

export function tokenizeCode(code: string): TokenizedLine[] {
  return code.split("\n").map((line) => {
    // 1. Handle Comments directly
    if (line.trim().startsWith("//")) {
      return [{ type: "comment", content: line }];
    }

    // 2. Tokenize line
    // Split by non-word characters but keep delimiters to reconstruct strict spacing
    // Current approach in CodeBlock was splitting by keywords regex, which is a bit loose.
    // We will mimic the CodeBlock logic for consistency but structure it.

    // The previous regex was: /(\b(?:...)\b)/g
    // We need to construct this regex dynamically for better maintenance
    const allKeywords = [...KEYWORDS, ...COMMANDS, ...CLASSES];
    const regex = new RegExp(`(\\b(?:${allKeywords.join("|")})\\b)`, "g");

    const parts = line.split(regex);

    return parts.map((part) => {
      if (KEYWORDS.includes(part)) return { type: "keyword", content: part };
      if (COMMANDS.includes(part)) return { type: "command", content: part };
      if (CLASSES.includes(part)) return { type: "class", content: part };
      // Simple heuristic for strings could go here but let's stick to the original scope
      return { type: "text", content: part };
    });
  });
}
