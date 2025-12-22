import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { tokenizeCode, Token } from "../../lib/syntax-highlighter";

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

  // SDE 3 Optimization: Memoize parsing to prevent O(n) regex ops on every render
  const tokenizedLines = useMemo(() => tokenizeCode(code), [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyButton = (
    <button
      onClick={handleCopy}
      className={`cursor-pointer ${
        variant === "inline"
          ? "text-muted-foreground hover:text-foreground ml-3 shrink-0"
          : "text-muted-foreground hover:text-primary transition-colors relative"
      }`}
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

  const renderToken = (token: Token, key: number) => {
    switch (token.type) {
      case "keyword":
        return (
          <span key={key} className="text-purple-600 dark:text-purple-400">
            {token.content}
          </span>
        );
      case "command":
        return (
          <span key={key} className="text-red-600 dark:text-red-400">
            {token.content}
          </span>
        );
      case "class":
        return (
          <span key={key} className="text-amber-600 dark:text-yellow-300">
            {token.content}
          </span>
        );
      case "comment":
        return (
          <span key={key} className="text-muted-foreground/70 italic">
            {token.content}
          </span>
        );
      default:
        return token.content;
    }
  };

  if (variant === "inline") {
    return (
      <div
        className={`rounded-md bg-muted/50 border border-border font-mono text-xs relative group overflow-hidden flex items-center justify-between px-4 py-2.5 ${className}`}
      >
        <div className="flex items-center gap-3 overflow-x-auto text-foreground">
          <span className="text-primary select-none">$</span>
          <code>{code}</code>
        </div>
        {copyButton}
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg bg-card dark:bg-[#0a0a0a] border border-border/40 font-mono text-sm relative group overflow-hidden shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-muted/30">
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
        <pre className="text-foreground dark:text-gray-300 text-[13px] leading-7 font-ligatures-none">
          <code>
            {tokenizedLines.map((lineTokens, i) => (
              <div key={i} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell text-muted-foreground/40 select-none text-right pr-4 w-8 border-r border-border/50 mr-4">
                    {i + 1}
                  </span>
                )}
                <span className="table-cell pl-4">
                  {lineTokens.map((token, j) => renderToken(token, j))}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
