import { motion } from "framer-motion";
import { Terminal, Play } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export function CodeTeaser() {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const runCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutput(["> Compiling..."]);

    setTimeout(() => {
      setOutput((prev) => [...prev, "> Initializing Memori adapter..."]);
    }, 600);

    setTimeout(() => {
      setOutput((prev) => [...prev, "> Storing vector [0.02, 0.91, -0.15]..."]);
    }, 1400);

    setTimeout(() => {
      setOutput((prev) => [...prev, "> Indexing complete."]);
    }, 2000);

    setTimeout(() => {
      setOutput((prev) => [...prev, "> Retrieving context for query..."]);
    }, 2800);

    setTimeout(() => {
      setOutput((prev) => [
        ...prev,
        "✔ Found relevant context (Score: 0.98):",
        '  "User prefers dark mode and TypeScript."',
      ]);
      setIsRunning(false);
    }, 3600);
  };

  return (
    <section className="container-factory py-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Terminal Window - Factory Style */}
        <div className="bg-card border border-border/50 shadow-lg relative rounded-sm">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border/50 rounded-t-sm">
            <div className="flex items-center gap-4">
              <div className="text-mono text-xs text-muted-foreground flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                TERMINAL
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-muted-foreground/20" />
              <div className="w-2 h-2 bg-muted-foreground/20" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 min-h-[400px]">
            {/* Editor Area */}
            <div className="p-6 font-mono text-xs border-r border-border/50 bg-background text-foreground">
              <div className="flex justify-between items-start mb-4">
                <div className="text-xs text-muted-foreground uppercase tracking-widest">
                  Input
                </div>
              </div>

              <pre className="text-foreground leading-loose">
                <span className="text-accent">import</span> &#123; Memori &#125;{" "}
                <span className="text-accent">from</span> "memori-js";
                <br />
                <br />
                <span className="text-muted-foreground/60">
                  // 1. Initialize
                </span>
                <br />
                <span className="text-accent">const</span> memori ={" "}
                <span className="text-accent">new</span> Memori();
                <br />
                <br />
                <span className="text-muted-foreground/60">
                  // 2. Add Memory
                </span>
                <br />
                <span className="text-accent">await</span> memori.store(&#123;
                <br />
                &nbsp;&nbsp;content: "User prefers dark mode",
                <br />
                &nbsp;&nbsp;tags: ["ui"]
                <br />
                &#125;);
                <br />
                <br />
                <span className="text-muted-foreground/60">// 3. Recall</span>
                <br />
                <span className="text-accent">const</span> context ={" "}
                <span className="text-accent">await</span> memori.retrieve(
                <br />
                &nbsp;&nbsp;"What do they like?"
                <br />
                );
              </pre>
            </div>

            {/* Output Area */}
            <div className="p-6 font-mono text-xs bg-muted/30 text-muted-foreground relative">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-border/50">
                <div className="text-xs text-muted-foreground uppercase tracking-widest">
                  Output
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-6 text-[10px] uppercase tracking-wider bg-background hover:bg-muted border-border text-foreground px-2 rounded-none"
                  onClick={runCode}
                  disabled={isRunning}
                >
                  <Play className="w-3 h-3 mr-1" /> Execute
                </Button>
              </div>

              <div className="space-y-2">
                {output.length === 0 && !isRunning && (
                  <div className="text-muted-foreground/40 text-xs mt-20 text-center">
                    // WAITING FOR INPUT...
                  </div>
                )}
                {output.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1 }}
                    className={
                      line.includes("Error")
                        ? "text-destructive"
                        : line.includes("Found")
                          ? "text-accent font-bold"
                          : "text-foreground"
                    }
                  >
                    {line}
                  </motion.div>
                ))}
                {isRunning && (
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-accent inline-block align-middle"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
