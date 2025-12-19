import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Send,
  Bot,
  User,
  Database,
  Sparkles,
  Settings2,
  Trash2,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/playground")({
  component: Playground,
});

function Playground() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "System: You are a helpful AI assistant with access to long-term memory.",
    },
    {
      role: "assistant",
      content:
        "Hello! I'm your memory-augmented assistant. I can remember details from our previous conversations.",
    },
  ]);
  const [input, setInput] = useState("");
  const [memories, setMemories] = useState([
    {
      id: 1,
      content: "User is a software engineer using TypeScript.",
      relevance: 0.95,
    },
    {
      id: 2,
      content: "Project is about building an AI agent memory layer.",
      relevance: 0.88,
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    // Simulate generic response for UI demo
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I've noted that. Is there anything else you'd like me to remember?",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] lg:flex-row overflow-hidden bg-background">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border/50">
        <header className="h-12 border-b border-border/50 flex items-center justify-between px-4 bg-background/50 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-primary" />
            <span className="font-bold text-xs text-foreground">
              Agent Chat
            </span>
            <Badge
              variant="secondary"
              className="text-[10px] h-4 px-1 font-normal bg-primary/10 text-primary border-none"
            >
              GPT-4
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
            >
              <Settings2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {messages.map((msg, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i}
              className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border border-border/50 ${msg.role === "user" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
              >
                {msg.role === "user" ? (
                  <User className="w-3 h-3" />
                ) : (
                  <Bot className="w-3 h-3" />
                )}
              </div>
              <div
                className={`rounded-lg px-3 py-2 max-w-[85%] text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary/10 text-foreground border border-primary/20"
                    : "bg-muted/30 border border-border/50 text-muted-foreground"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm shrink-0">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="w-full bg-muted/30 border border-border/50 rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/50"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="absolute right-1 top-1 h-7 w-7 rounded-md bg-transparent text-primary hover:bg-primary/10 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-2 opacity-50">
            <Sparkles className="w-3 h-3 text-primary" />
            <p className="text-[10px] text-muted-foreground font-mono">
              Context Active
            </p>
          </div>
        </div>
      </div>

      {/* Memory Inspector */}
      <div className="w-full lg:w-80 border-t lg:border-t-0 shrink-0 bg-muted/5 flex flex-col h-[40vh] lg:h-auto">
        <header className="h-12 border-b border-border/50 flex items-center px-4 gap-2 bg-background/50 backdrop-blur-sm shrink-0">
          <Database className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-bold text-xs text-foreground">
            Memory Store
          </span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Context Status */}
          <div>
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Status
            </h4>
            <div className="flex items-center gap-2 text-xs text-green-500 bg-green-500/5 border border-green-500/20 px-3 py-1.5 rounded-md">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Connected to Local SQLite</span>
            </div>
          </div>

          {/* Retrieved Memories */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                Relevant Memories
              </h4>
              <Badge
                variant="outline"
                className="text-[10px] h-4 px-1 bg-background border-border/50"
              >
                2
              </Badge>
            </div>

            <AnimatePresence>
              {memories.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border/50 p-3 rounded-lg shadow-sm hover:border-primary/20 transition-colors group cursor-default"
                >
                  <p className="text-xs text-muted-foreground leading-snug mb-2 font-mono">
                    "{m.content}"
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground/70 border-t border-border/30 pt-2 mt-2">
                    <span>id: {m.id}</span>
                    <span className="text-primary/70 font-medium">
                      {(m.relevance * 100).toFixed(0)}% match
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs h-8 dashed border-dashed text-muted-foreground"
          >
            <Save className="w-3 h-3 mr-2" />
            Snapshot DB
          </Button>
        </div>
      </div>
    </div>
  );
}
