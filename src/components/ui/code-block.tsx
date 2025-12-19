import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
  variant?: "default" | "inline";
}

export function CodeBlock({
  code,
  language = "typescript",
  className = "",
  showLineNumbers = true,
  variant = "default",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyButton = (
    <button
      onClick={handleCopy}
      className={`cursor-pointer ${variant === "inline" ? "cursor-pointer text-zinc-500 hover:text-white ml-3 shrink-0" : "text-zinc-500 hover:text-indigo-400 transition-colors relative"}`}
      title="Copy code"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.div
            key="check"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
          >
            <Check size={14} className="text-emerald-500" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.15 }}
          >
            <Copy size={14} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );

  if (variant === "inline") {
    return (
      <div
        className={`rounded-md bg-[#050505] border border-white/5 font-mono text-xs relative group overflow-hidden flex items-center justify-between px-4 py-2.5 ${className}`}
      >
        <div className="flex items-center gap-3 overflow-x-auto text-zinc-300">
          <span className="text-indigo-400 select-none">$</span>
          <code>{code}</code>
        </div>
        {copyButton}
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg bg-[#0a0a0a] border border-border/40 font-mono text-sm relative group overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-muted/20">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 opacity-50">
            <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          </div>
          <span className="text-[11px] text-muted-foreground font-semibold uppercase ml-2 tracking-wider">
            {language}
          </span>
        </div>

        {copyButton}
      </div>
      <div className="p-4 overflow-x-auto relative scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        <pre className="text-gray-300 text-[13px] leading-7 font-ligatures-none">
          <code>
            {code.split("\n").map((line, i) => {
              // Simple syntax highlighting fix
              let content: React.ReactNode = line;
              if (line.trim().startsWith("//")) {
                content = <span className="text-gray-500 italic">{line}</span>;
              } else {
                // Process other keywords safely
                const words = line.split(
                  /(\b(?:const|let|var|function|import|export|from|await|new|class|return|npm|install|run|build|Memori|OpenAI|Anthropic|interface|type)\b)/g
                );
                content = words.map((word, wIndex) => {
                  if (
                    [
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
                    ].includes(word)
                  ) {
                    return (
                      <span key={wIndex} className="text-purple-400">
                        {word}
                      </span>
                    );
                  }
                  if (["npm", "install", "run", "build"].includes(word)) {
                    return (
                      <span key={wIndex} className="text-red-400">
                        {word}
                      </span>
                    );
                  }
                  if (["Memori", "OpenAI", "Anthropic"].includes(word)) {
                    return (
                      <span key={wIndex} className="text-yellow-300">
                        {word}
                      </span>
                    );
                  }
                  return word;
                });
              }

              return (
                <div key={i} className="table-row">
                  {showLineNumbers && (
                    <span className="table-cell text-gray-700 select-none text-right pr-4 w-8 border-r border-gray-800/50 mr-4">
                      {i + 1}
                    </span>
                  )}
                  <span className="table-cell pl-4">{content}</span>
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}
