import { motion } from "framer-motion";
import { Terminal, Play, Bot } from "lucide-react";
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
    <section className="container mx-auto px-4 py-12 flex flex-col items-center">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl font-black mb-4">
          Simple API. <br />{" "}
          <span className="text-primary">Infinite Context.</span>
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          Don't waste time building RAG pipelines. Just import and remember.
        </p>
      </div>

      <div className="w-full max-w-5xl bg-[#0d0d0d] rounded-xl overflow-hidden shadow-2xl border border-white/10 relative group ring-1 ring-white/10">
        {/* Window Controls */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#171717] border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="text-xs text-muted-foreground font-mono flex items-center gap-2 opacity-50">
            <Terminal className="w-3 h-3" />
            memori-demo
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 text-xs hover:bg-white/5 hover:text-green-400"
            onClick={runCode}
            disabled={isRunning}
          >
            <Play className="w-3 h-3 mr-1" /> Run Code
          </Button>
        </div>

        {/* Editor Area */}
        <div className="grid md:grid-cols-2 min-h-[400px]">
          {/* Code */}
          <div className="p-6 font-mono text-sm overflow-x-auto border-r border-white/5 bg-[#0d0d0d] relative">
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="px-2 py-1 bg-white/10 rounded text-[10px] text-muted-foreground">
                TypeScript
              </div>
            </div>
            <pre className="text-gray-300 leading-relaxed">
              <span className="text-purple-400">import</span> &#123; Memori
              &#125; <span className="text-purple-400">from</span>{" "}
              <span className="text-orange-300">"memori-js"</span>;<br />
              <br />
              <span className="text-gray-500">// 1. Initialize</span>
              <br />
              <span className="text-purple-400">const</span> memori ={" "}
              <span className="text-purple-400">new</span>{" "}
              <span className="text-yellow-300">Memori</span>();
              <br />
              <br />
              <span className="text-gray-500">// 2. Add Memory</span>
              <br />
              <span className="text-purple-400">await</span> memori.
              <span className="text-blue-300">store</span>(&#123;
              <br />
              &nbsp;&nbsp;content:{" "}
              <span className="text-orange-300">"User prefers dark mode."</span>
              ,<br />
              &nbsp;&nbsp;tags: [<span className="text-orange-300">"ui"</span>]
              <br />
              &#125;);
              <br />
              <br />
              <span className="text-gray-500">// 3. Recall</span>
              <br />
              <span className="text-purple-400">const</span> context ={" "}
              <span className="text-purple-400">await</span> memori.
              <span className="text-blue-300">retrieve</span>(<br />
              &nbsp;&nbsp;
              <span className="text-orange-300">"What do they like?"</span>
              <br />
              );
            </pre>
          </div>

          {/* Output */}
          <div className="p-6 font-mono text-sm bg-[#050505] text-green-500/90 relative">
            <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground border-b border-white/5 pb-2">
              <Bot className="w-3 h-3" />
              <span>Agent Output</span>
            </div>

            <div className="space-y-2">
              {output.length === 0 && !isRunning && (
                <div className="text-muted-foreground/30 italic">
                  Click "Run Code" to see the agent in action...
                </div>
              )}
              {output.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    line.includes("Error")
                      ? "text-red-400"
                      : line.includes("Found")
                        ? "text-green-400 font-bold"
                        : "text-gray-400"
                  }
                >
                  {line}
                </motion.div>
              ))}
              {isRunning && (
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2 h-4 bg-green-500 inline-block align-middle"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
