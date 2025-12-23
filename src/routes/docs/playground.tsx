import { createFileRoute } from "@tanstack/react-router";
import { useRef, useEffect, useState } from "react";
// import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";
import {
  Send,
  Database,
  Sparkles,
  Trash2,
  Loader2,
  Activity,
  BrainCircuit,
  RefreshCw,
  CheckCircle2,
  Cpu,
  Save,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { usePlaygroundState } from "@/hooks/usePlaygroundState";

export const Route = createFileRoute("/docs/playground")({
  component: Playground,
});

function Playground() {
  const {
    messagesStandard, // Renamed back from initialStandard for clarity
    setMessagesStandard,
    messagesClara, // Renamed back from initialClara for clarity
    setMessagesClara,
    input,
    setInput,
    isLoading, // Uncommented - used from global state now
    setIsLoading,
    statsStandard,
    setStatsStandard,
    statsClara,
    setStatsClara,
    contextContent,
    setContextContent,
    lastIngestedContent,
    setLastIngestedContent,
    isIngesting,
    setIsIngesting,
    ingestionStatus,
    setIngestionStatus,
    resetToSample,
    clearHistory,
  } = usePlaygroundState();

  const isDirty = contextContent !== lastIngestedContent;

  /* REMOVED useChat hooks to support custom JSON metadata response */

  // Mobile Responsiveness States
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [mobileChatTab, setMobileChatTab] = useState<"standard" | "clara">(
    "standard"
  );

  const handleIngest = async () => {
    if (!contextContent.trim()) return;
    setIsIngesting(true);
    setIngestionStatus("idle");
    setStatsStandard(null);
    setStatsClara(null);

    try {
      const [resStandard, resClara] = await Promise.all([
        fetch("/api/ingest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "playground_context.txt",
            content: contextContent,
            isClaraEnabled: false,
            sessionId: "playground-standard",
          }),
        }),
        fetch("/api/ingest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "playground_context.txt",
            content: contextContent,
            isClaraEnabled: true,
            sessionId: "playground-clara",
          }),
        }),
      ]);

      const dataStandard = await resStandard.json();
      const dataClara = await resClara.json();

      if (dataStandard.success) setStatsStandard(dataStandard.stats);
      if (dataClara.success) setStatsClara(dataClara.stats);

      setLastIngestedContent(contextContent);
      setIngestionStatus("success");
      setIsConfigOpen(false); // Auto-close config on mobile after ingest

      // Reset chats
      setMessagesStandard([
        {
          role: "assistant",
          content: "Context updated. Ready for queries.",
          id: "init-1",
        },
      ]);
      setMessagesClara([
        {
          role: "assistant",
          content: "Knowledge graph updated. Ready for reasoning.",
          id: "init-2",
        },
      ]);
    } catch (e) {
      console.error("Ingestion failed", e);
      setIngestionStatus("error");
    } finally {
      setIsIngesting(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (ingestionStatus !== "success" && !lastIngestedContent) {
      alert("Please ingest the context first!");
      setIsConfigOpen(true); // Open config for user
      return;
    }

    const userContent = input;
    setInput("");
    setIsLoading(true);

    const userMsg = {
      role: "user",
      content: userContent,
      id: Date.now().toString(),
    };

    // Optimistic update
    const newHistoryStandard = [...messagesStandard, userMsg];
    const newHistoryClara = [...messagesClara, userMsg];

    setMessagesStandard(newHistoryStandard);
    setMessagesClara(newHistoryClara);

    try {
      const [resStandard, resClara] = await Promise.all([
        fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newHistoryStandard,
            isClaraEnabled: false,
            sessionId: "playground-standard",
            contextFile: { name: "context", content: lastIngestedContent },
          }),
        }),
        fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: newHistoryClara,
            isClaraEnabled: true,
            sessionId: "playground-clara",
            contextFile: { name: "context", content: lastIngestedContent },
          }),
        }),
      ]);

      const dataStandard = await resStandard.json();
      const dataClara = await resClara.json();

      setMessagesStandard((prev) => [
        ...prev,
        {
          role: "assistant",
          content: dataStandard.response,
          analysis: dataStandard.analysis,
          id: (Date.now() + 1).toString(),
        },
      ]);

      setMessagesClara((prev) => [
        ...prev,
        {
          role: "assistant",
          content: dataClara.response,
          analysis: dataClara.analysis,
          id: (Date.now() + 2).toString(),
        },
      ]);
    } catch (e) {
      console.error("Chat failed", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-dvh md:h-[calc(100vh-3.5rem)] overflow-hidden bg-background relative">
      {/* LEFT PANEL: CONFIGURATION */}
      <div
        className={cn(
          "w-full md:w-[400px] flex flex-col border-r border-border shrink-0 transition-transform duration-300 ease-in-out md:translate-x-0 md:bg-muted/10 bg-background",
          isConfigOpen ? "absolute inset-0 z-50" : "hidden md:flex"
        )}
      >
        <div className="p-6 border-b border-border/50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-primary" />
              Playground
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Design your agent's memory.
            </p>
          </div>
          {/* Mobile Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsConfigOpen(false)}
            className="md:hidden"
          >
            <CheckCircle2 className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
          <Accordion
            type="single"
            collapsible
            defaultValue="knowledge-base"
            className="w-full"
          >
            <AccordionItem value="knowledge-base" className="border-b-0">
              <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider text-foreground hover:no-underline py-2">
                <div className="flex items-center justify-between w-full">
                  <span>1. Knowledge Base</span>
                  <div
                    className="flex gap-2 mr-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={resetToSample}
                      title="Reset to Sample"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <div className="relative group">
                  <Textarea
                    placeholder="Paste your context data here..."
                    className="min-h-[300px] font-mono text-xs resize-none bg-background focus:ring-primary/20"
                    value={contextContent}
                    onChange={(e) => setContextContent(e.target.value)}
                  />
                  <div className="absolute bottom-2 right-2 text-[10px] text-muted-foreground bg-background/80 px-2 py-1 rounded border">
                    {contextContent.length} chars
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full transition-all duration-300",
                    ingestionStatus === "success" && !isDirty
                      ? "bg-green-600 hover:bg-green-700"
                      : ""
                  )}
                  onClick={handleIngest}
                  disabled={isIngesting || !contextContent.trim()}
                >
                  {isIngesting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Ingesting...
                    </>
                  ) : ingestionStatus === "success" && !isDirty ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Synced
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {lastIngestedContent ? "Update" : "Ingest"}
                    </>
                  )}
                </Button>

                {/* Ingest Stats Mini-Card */}
                {statsStandard && statsClara && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="rounded-lg border border-border bg-background p-3 space-y-2 text-xs"
                  >
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Compression Ratio</span>
                      <span className="font-mono text-green-500 font-bold">
                        {(
                          (statsClara.compressedSize /
                            statsStandard.originalSize) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-green-500 h-full rounded-full"
                        style={{
                          width: `${(statsClara.compressedSize / statsStandard.originalSize) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground pt-1">
                      <span>Standard: {statsStandard.originalSize}b</span>
                      <span>CLaRa: {statsClara.compressedSize}b</span>
                    </div>
                  </motion.div>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="settings" className="border-b-0">
              <AccordionTrigger className="text-sm font-semibold uppercase tracking-wider text-foreground hover:no-underline py-2">
                2. Query Settings
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 border rounded bg-background flex flex-col gap-1">
                    <span className="text-muted-foreground">Model</span>
                    <span className="font-medium">Gemini 1.5 Flash</span>
                  </div>
                  <div className="p-2 border rounded bg-background flex flex-col gap-1">
                    <span className="text-muted-foreground">Temperature</span>
                    <span className="font-medium">0.7</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* RIGHT PANEL: CHAT & COMPARISON */}
      <div className="flex-1 flex flex-col min-w-0 bg-background relative z-0">
        {/* Header Stats Bar */}
        <div className="h-14 border-b border-border flex items-center px-4 md:px-6 justify-between shrink-0 gap-2">
          {/* Mobile Config Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsConfigOpen(true)}
            className="md:hidden shrink-0"
          >
            <Settings2 className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-4 flex-1 overflow-hidden">
            <span className="hidden md:block text-sm font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
              Live Comparison
            </span>

            {/* Mobile Tab Switcher */}
            <div className="flex md:hidden bg-muted/50 rounded-lg p-1 items-center gap-1 mx-auto">
              <Button
                variant={mobileChatTab === "standard" ? "default" : "ghost"}
                size="sm"
                onClick={() => setMobileChatTab("standard")}
                className={cn(
                  "h-7 text-xs",
                  mobileChatTab === "standard" &&
                    "bg-background text-foreground shadow-sm"
                )}
              >
                Standard
              </Button>
              <Button
                variant={mobileChatTab === "clara" ? "default" : "ghost"}
                size="sm"
                onClick={() => setMobileChatTab("clara")}
                className={cn(
                  "h-7 text-xs",
                  mobileChatTab === "clara" &&
                    "bg-background text-foreground shadow-sm"
                )}
              >
                CLaRa
              </Button>
            </div>

            <Badge
              variant="secondary"
              className="text-xs font-normal bg-muted/50 text-muted-foreground hover:bg-muted/50 hidden md:inline-flex"
            >
              Dual-Stream Reference
            </Badge>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={clearHistory}
              className="text-xs h-8 px-2 md:px-3"
            >
              <Trash2 className="w-3.5 h-3.5 md:mr-2 text-muted-foreground" />
              <span className="hidden md:inline">Clear</span>
            </Button>
          </div>
        </div>

        {/* Chat Area - Split View */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border min-h-0 bg-background">
          {/* Standard Pane */}
          <div
            className={cn(
              "flex-col h-full min-h-0 relative",
              mobileChatTab === "clara" ? "hidden md:flex" : "flex"
            )}
          >
            <ChatPane
              title="Standard Memori"
              description="Vector Similarity Search"
              icon={Database}
              messages={messagesStandard}
              isLoading={isLoading}
              colorClass="text-blue-500"
              bgClass="bg-blue-500/5"
              borderClass="border-blue-200"
            />
          </div>

          {/* CLaRa Pane */}
          <div
            className={cn(
              "flex-col h-full min-h-0 relative",
              mobileChatTab === "standard" ? "hidden md:flex" : "flex"
            )}
          >
            <ChatPane
              title="CLaRa Engine"
              description="Cognitive Latent Retrieval"
              icon={Sparkles}
              messages={messagesClara}
              isLoading={isLoading}
              isClara
              colorClass="text-purple-500"
              bgClass="bg-purple-500/5"
              borderClass="border-purple-200"
            />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-3 md:p-6 border-t border-border bg-background/80 backdrop-blur shrink-0 safe-pb">
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute -top-3 left-4 px-2 bg-background text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Query Input
            </div>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={
                  ingestionStatus === "success"
                    ? "Ask a question..."
                    : "Ingest first..."
                }
                className="w-full bg-muted/30 border border-border rounded-xl pl-4 md:pl-5 pr-12 md:pr-14 py-3 md:py-4 text-sm md:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading || ingestionStatus !== "success"}
              />
              <div className="absolute right-2 flex items-center">
                <Button
                  size="icon"
                  className={cn(
                    "h-8 w-8 md:h-10 md:w-10 rounded-lg transition-all",
                    isLoading ? "opacity-50" : "hover:scale-105"
                  )}
                  onClick={handleSend}
                  disabled={
                    isLoading || !input.trim() || ingestionStatus !== "success"
                  }
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatPane({
  title,
  description,
  icon: Icon,
  messages,
  isLoading,
  isClara = false,
  colorClass,
  bgClass,
  borderClass,
}: any) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      className={cn(
        "flex flex-col h-full min-h-0 relative",
        isClara ? "bg-purple-50/10" : "bg-blue-50/10"
      )}
    >
      {/* Pane Header */}
      <div className="p-4 border-b border-border/50 flex items-center gap-3 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className={cn("p-2 rounded-lg", bgClass)}>
          <Icon className={cn("w-4 h-4", colorClass)} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
            {description}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex flex-col gap-1 max-w-[90%]",
                msg.role === "user"
                  ? "ml-auto items-end"
                  : "mr-auto items-start"
              )}
            >
              <div
                className={cn(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-background border border-border rounded-bl-none"
                )}
              >
                {msg.content
                  ? msg.content
                  : msg.parts?.map((part: any, i: number) => {
                      if (part.type === "text") {
                        return <span key={i}>{part.content}</span>;
                      }
                      return null;
                    })}
              </div>

              {/* Analysis Footers for Assistant */}
              {msg.role === "assistant" && msg.analysis && (
                <div className="flex items-center gap-2 mt-1 px-1">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] h-5 px-2 font-mono gap-1",
                      borderClass,
                      bgClass
                    )}
                  >
                    <Cpu className="w-3 h-3 opacity-70" />
                    {msg.analysis.latencyMs}ms
                  </Badge>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-[10px] font-medium text-muted-foreground hover:text-foreground underline decoration-dotted underline-offset-2 transition-colors">
                        View Logic
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="start">
                      <div className="p-3 border-b border-border bg-muted/20">
                        <h4 className="font-semibold text-xs flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5" />
                          Execution Analysis
                        </h4>
                      </div>
                      <div className="p-3 space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-muted/10 p-2 rounded border border-border/50">
                            <div className="text-[10px] text-muted-foreground uppercase">
                              Tokens
                            </div>
                            <div className="text-sm font-mono font-bold">
                              {msg.analysis.tokenUsage}
                            </div>
                          </div>
                          <div className="bg-muted/10 p-2 rounded border border-border/50">
                            <div className="text-[10px] text-muted-foreground uppercase">
                              Chunks
                            </div>
                            <div className="text-sm font-mono font-bold">
                              {msg.analysis.contextChunksUsed}
                            </div>
                          </div>
                        </div>

                        {msg.analysis.reasoningTrace && (
                          <div className="space-y-1">
                            <div className="text-[10px] font-bold text-muted-foreground uppercase">
                              Reasoning Trace
                            </div>
                            <div className="max-h-40 overflow-y-auto bg-muted/30 p-2 rounded text-[10px] font-mono space-y-1">
                              {msg.analysis.reasoningTrace.map(
                                (line: string, idx: number) => (
                                  <div key={idx} className="flex gap-2">
                                    <span className="text-muted-foreground/50 select-none">
                                      {idx + 1}
                                    </span>
                                    <span>{line}</span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 text-muted-foreground p-2"
          >
            <Loader2 className={cn("w-4 h-4 animate-spin", colorClass)} />
            <span className="text-xs font-medium animate-pulse">
              Thinking...
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
