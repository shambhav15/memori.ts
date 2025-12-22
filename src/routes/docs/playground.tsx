import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  Send,
  Database,
  Sparkles,
  Trash2,
  FileText,
  Upload,
  Eye,
  Loader2,
  Activity,
  BarChart3,
  Zap,
  ArrowRightLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";

export const Route = createFileRoute("/docs/playground")({
  component: Playground,
});

const LONG_CONVERSATION = `[TRANSCRIPT: STARTUP WEEKLY SYNC - "PROJECT CHIMERA"]
[Attendees: Sarah (CEO), Mike (CTO), Emily (Product), David (Intern)]

Sarah: Alright everyone, let's get started. Big week ahead.
Mike: Can we make this quick? I've got the server migration at 2 PM.
Emily: I still haven't received the updated slide deck for the investor pitch.
David: Uh, I think I sent that? Let me check my sent folder... wait, no, it's in drafts.
Sarah: David, please get that out by end of day. It's critical.
Mike: Speaking of critical, did anyone touch the AWS keys? My access was denied this morning.
Emily: Not me. I was working on the Figma prototypes all night.
David: I might have tried to log in to check the logs? I guessed the password a few times.
Mike: David! You triggered the security lockout. The new admin password is 'BlueSky$99'—and don't type it in wrong again.
Sarah: Write that down securely, David. We can't afford verify-code delays. 
Emily: Moving on—user testing results are in for the 'Dark Mode' feature.
Sarah: And?
Emily: Mixed. 40% of users couldn't find the toggle. It's hidden under 'Advanced Settings'.
Mike: That was a backend decision. The legacy codebase breaks if we move it to the main header.
Sarah: We need to fix that. Project Chimera depends on a sleek UI.
David: What actually *is* Project Chimera? I just started last week.
Sarah: It's our pivot to AI-driven cat toys. But that's top secret.
Mike: Like, seriously David. If this leaks, we lose the Series B funding from 'CapitalOne Ventures'.
Emily: Did we secure that funding? I thought they were on the fence.
Sarah: They signed the term sheet yesterday. $5M at a $20M valuation.
David: Wow. That buys a lot of catnip.
Mike: Focus, people. The API latency on the laser pointer controller is 500ms. It needs to be under 100ms.
Emily: Maybe we switch from Python to Go?
Mike: START OVER in Go? Are you insane? We launch in 3 weeks.
Sarah: What if we just cache the movement patterns?
Mike: Hmmm. Maybe. Memcached implementation would take 2 days.
Emily: I can update the roadmap. So, launch date is still October 15th?
Sarah: No, we pushed it to November 1st to align with 'National Cat Day'.
David: My cat's birthday is November 3rd!
Mike: Irrelevant, David.
Sarah: Okay, let's talk budget. We're burning $50k a month.
Emily: That marketing campaign for 'Purr-fect Match' was expensive.
David: I liked the billboard though. The giant whisker was cool.
Mike: It cost $12,000 and drove exactly 4 signups.
Sarah: Lesson learned. Organic growth only from now on.
Emily: I've got a lead on an influencer. 'TabbyTammy' on TikTok. 
Sarah: Reach out to her. Offer her 2% equity if she can get us 10k users.
Mike: Equity? That's steep.
Sarah: It's cheaper than cash right now.
David: Can I have equity?
Mike: Finish the slide deck first.
Emily: Oh, before I forget—the office lease is up. Are we renewing?
Sarah: No, we're going fully remote starting December. Save the $8k rent.
Mike: Thank god. The commute is killing me.
David: But free coffee...
Sarah: Buy your own coffee, David.
Emily: Back to Chimera. The ultrasonic sound feature... is it safe?
Mike: Legal says yes, as long as it's under 20kHz. Ours is 18kHz.
Sarah: Good. Put that in the legal disclaimer anyway.
David: I heard a rumor that 'DogGo', our competitor, is launching a smart collar.
Sarah: Where did you hear that?
David: Reddit. r/Startups.
Mike: We need to accelerate. If they launch first, Chimera looks like a copycat.
Sarah: Pun intended?
Mike: No.
Emily: I'll prioritize the 'Bark Detection' module. It can disable the laser if a dog is near.
Sarah: Brilliant. That's a USP. 
David: Wait, I think I locked myself out of the AWS console again.
Mike: DAVID. The password is 'BlueSky$99'. Capital B. Capital S.
Sarah: Okay, wrap it up.
1. Fix the toggle UI.
2. Optimize API latency with Memcached.
3. Emily, contact TabbyTammy.
4. David, send the slides.
5. Everyone prep for November 1st launch.
Mike: I'll be in the server room. Don't disturb me unless the building is on fire.
Emily: Or if TabbyTammy replies.
Sarah: Meeting adjourned.
[END TRANSCRIPT]
`;

function Playground() {
  const [messagesStandard, setMessagesStandard] = useState<any[]>([
    { role: "system", content: "Standard Memori System" },
    { role: "assistant", content: "Ready (Standard Mode)" },
  ]);
  const [messagesClara, setMessagesClara] = useState<any[]>([
    { role: "system", content: "CLaRa Enhanced System" },
    { role: "assistant", content: "Ready (CLaRa Mode)" },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statsStandard, setStatsStandard] = useState<any>(null);
  const [statsClara, setStatsClara] = useState<any>(null);

  const [contextFile, setContextFile] = useState<{
    name: string;
    content: string;
  } | null>({
    name: "project_chimera_meeting_notes.txt",
    content: LONG_CONVERSATION,
  });
  const [isContextDialogOpen, setIsContextDialogOpen] = useState(false);
  const [editableContext, setEditableContext] = useState("");
  const [isSavingContext, setIsSavingContext] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setContextFile({ name: file.name, content });
      setEditableContext(content);
    };
    reader.readAsText(file);
  };

  const handleSaveContext = async () => {
    if (!contextFile) return;
    setIsSavingContext(true);
    setStatsStandard(null);
    setStatsClara(null);

    try {
      const [resStandard, resClara] = await Promise.all([
        fetch("http://localhost:3001/api/ingest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: contextFile.name,
            content: editableContext,
            isClaraEnabled: false,
            sessionId: "playground-standard",
          }),
        }),
        fetch("http://localhost:3001/api/ingest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: contextFile.name,
            content: editableContext,
            isClaraEnabled: true,
            sessionId: "playground-clara",
          }),
        }),
      ]);

      const dataStandard = await resStandard.json();
      const dataClara = await resClara.json();

      if (dataStandard.success) setStatsStandard(dataStandard.stats);
      if (dataClara.success) setStatsClara(dataClara.stats);

      setContextFile({ ...contextFile, content: editableContext });
      setIsContextDialogOpen(false);
    } catch (e) {
      console.error("Ingestion failed", e);
    } finally {
      setIsSavingContext(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userContent = input;
    setInput("");
    setIsLoading(true);

    setMessagesStandard((prev) => [
      ...prev,
      { role: "user", content: userContent },
    ]);
    setMessagesClara((prev) => [
      ...prev,
      { role: "user", content: userContent },
    ]);

    try {
      const [resStandard, resClara] = await Promise.all([
        fetch("http://localhost:3001/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userContent,
            history: messagesStandard,
            isClaraEnabled: false,
            sessionId: "playground-standard",
            contextFile,
          }),
        }),
        fetch("http://localhost:3001/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userContent,
            history: messagesClara,
            isClaraEnabled: true,
            sessionId: "playground-clara",
            contextFile,
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
        },
      ]);

      setMessagesClara((prev) => [
        ...prev,
        {
          role: "assistant",
          content: dataClara.response,
          analysis: dataClara.analysis,
        },
      ]);
    } catch (error) {
      console.error("Chat failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-background">
      {/* Header Dashboard */}
      <div className="h-24 shrink-0 border-b border-border/50 bg-muted/10 grid grid-cols-[1fr_250px] gap-0">
        <div className="p-4 flex items-center gap-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold tracking-tight">
              Comparison Playground
            </h2>
            <p className="text-xs text-muted-foreground">
              Side-by-side analysis of Standard Memori vs CLaRa Engine
            </p>
          </div>

          {statsStandard && statsClara && (
            <div className="flex gap-4 ml-8">
              <div className="flex flex-col gap-1 px-4 border-l border-border/50">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase">
                  Latency (Ingest)
                </span>
                <div className="flex items-end gap-2 text-xs">
                  <div className="text-muted-foreground">
                    Std:{" "}
                    <span className="font-mono text-foreground">
                      {statsStandard.latencyMs}ms
                    </span>
                  </div>
                  <div className="text-purple-500 font-bold">
                    CLaRa:{" "}
                    <span className="font-mono">{statsClara.latencyMs}ms</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 px-4 border-l border-border/50">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase">
                  Storage Size
                </span>
                <div className="flex items-end gap-2 text-xs">
                  <div className="text-muted-foreground line-through opacity-70">
                    {statsStandard.originalSize}b
                  </div>
                  <ArrowRightLeft className="w-3 h-3 text-muted-foreground" />
                  <div className="text-green-500 font-bold font-mono">
                    {statsClara.compressedSize}b (
                    {(
                      (statsClara.compressedSize / statsStandard.originalSize) *
                      100
                    ).toFixed(0)}
                    %)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* File Controls */}
        <div className="p-3 flex flex-col justify-center border-l border-border/50 bg-background/50">
          {contextFile ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium truncate max-w-[120px]">
                    {contextFile.name}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => {
                    setEditableContext(contextFile.content);
                    setIsContextDialogOpen(true);
                  }}
                >
                  <Eye className="w-3 h-3 text-muted-foreground" />
                </Button>
              </div>
              <Button
                onClick={handleSaveContext}
                disabled={isSavingContext}
                size="sm"
                className="w-full text-xs h-7"
              >
                {isSavingContext ? (
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                ) : (
                  <Upload className="w-3 h-3 mr-1" />
                )}
                Run Ingest Pipeline
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full h-full border-dashed"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-3.5 h-3.5 mr-2" />
              Upload Context
            </Button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".txt"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* Split View Content - CRITICAL: min-h-0 for flex children with overflow */}
      <div className="flex-1 grid grid-cols-2 min-h-0 divide-x divide-border/50">
        <ChatPane
          title="Standard Memori"
          badge="Vector Only"
          messages={messagesStandard}
          isLoading={isLoading}
          onClear={() => setMessagesStandard([])}
          borderColor="border-border/50"
        />

        <ChatPane
          title="CLaRa Engine"
          badge="Groq + Reasoner"
          messages={messagesClara}
          isLoading={isLoading}
          onClear={() => setMessagesClara([])}
          borderColor="border-purple-500/20"
          themeColor="purple"
        />
      </div>

      {/* Unified Input Footer */}
      <div className="p-4 border-t border-border/50 bg-background shrink-0">
        <div className="relative max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Type to query both engines simultaneously..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
            className="w-full bg-muted/30 border border-border rounded-lg pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 shadow-sm"
          />
          <Button
            className="absolute right-1.5 top-1.5 h-8 w-8"
            size="icon"
            disabled={isLoading}
            onClick={handleSend}
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Dialog for Context Edit */}
      <Dialog open={isContextDialogOpen} onOpenChange={setIsContextDialogOpen}>
        <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Context</DialogTitle>
          </DialogHeader>
          <textarea
            className="flex-1 p-3 bg-muted/20 border rounded-md font-mono text-xs resize-none focus:outline-none"
            value={editableContext}
            onChange={(e) => setEditableContext(e.target.value)}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsContextDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveContext}>Save & Re-Ingest</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Completely rewritten ChatPane with guaranteed scrolling
function ChatPane({
  title,
  badge,
  messages,
  isLoading,
  onClear,
  borderColor,
  themeColor = "primary",
}: any) {
  const isPurple = themeColor === "purple";
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full min-h-0 bg-muted/5">
      {/* Fixed Header */}
      <div
        className={`shrink-0 h-12 flex items-center justify-between px-4 border-b ${borderColor} bg-background/60 backdrop-blur-sm`}
      >
        <div className="flex items-center gap-2">
          {isPurple ? (
            <Sparkles className="w-4 h-4 text-purple-500" />
          ) : (
            <Database className="w-4 h-4 text-muted-foreground" />
          )}
          <span
            className={`text-xs font-bold ${isPurple ? "text-purple-600" : "text-foreground"}`}
          >
            {title}
          </span>
          <Badge
            variant="outline"
            className={`text-[9px] h-4 px-1.5 ${isPurple ? "border-purple-200 text-purple-500 bg-purple-50" : "text-muted-foreground"}`}
          >
            {badge}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-destructive"
          onClick={onClear}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      {/* Scrollable Messages Container - THIS IS THE KEY */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ minHeight: 0 }} // Critical for flexbox overflow
      >
        {messages.map((msg: any, i: number) => (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            key={i}
            className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`rounded-lg px-3 py-2 max-w-[85%] text-sm leading-relaxed border ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground border-primary/20"
                  : `bg-background border-border shadow-sm ${isPurple && msg.role === "assistant" ? "border-purple-200 bg-purple-50/50" : ""}`
              }`}
            >
              {msg.content}
            </div>

            {msg.role === "assistant" && msg.analysis && (
              <AnalysisButton analysis={msg.analysis} isPurple={isPurple} />
            )}
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted/30 rounded-lg px-4 py-2 flex items-center gap-2">
              <Loader2
                className={`w-3.5 h-3.5 animate-spin ${isPurple ? "text-purple-500" : "text-primary"}`}
              />
              <span className="text-xs text-muted-foreground">
                Processing...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AnalysisButton({
  analysis,
  isPurple,
}: {
  analysis: any;
  isPurple: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`flex items-center gap-1.5 text-[9px] font-medium mt-0.5 px-2 py-0.5 rounded-full transition-colors ${
            isPurple
              ? "text-purple-500 hover:bg-purple-100/50"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <Activity className="w-2.5 h-2.5" />
          {analysis.latencyMs}ms / {analysis.tokenUsage}tok
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-0 shadow-lg">
        <div
          className={`p-2 border-b flex items-center gap-2 ${isPurple ? "bg-purple-50/50 border-purple-100" : "bg-muted/30"}`}
        >
          <BarChart3
            className={`w-3.5 h-3.5 ${isPurple ? "text-purple-500" : ""}`}
          />
          <span className="text-xs font-bold">Execution Analysis</span>
        </div>
        <div className="p-3 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-0.5">
              <div className="text-[9px] text-muted-foreground uppercase font-bold">
                Latency
              </div>
              <div
                className={`text-sm font-mono font-medium ${isPurple ? "text-purple-600" : ""}`}
              >
                {analysis.latencyMs}ms
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[9px] text-muted-foreground uppercase font-bold">
                Chunks
              </div>
              <div className="text-sm font-mono font-medium">
                {analysis.contextChunksUsed}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[9px] text-muted-foreground">
              <span>Token Usage</span>
              <span>{analysis.tokenUsage}</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${isPurple ? "bg-purple-500" : "bg-primary"}`}
                style={{
                  width: `${Math.min((analysis.tokenUsage / 1000) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {analysis.reasoningTrace && (
            <div className="space-y-1 pt-2 border-t border-border/50">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" />
                <span className="text-[9px] font-bold text-muted-foreground uppercase">
                  Reasoning Trace
                </span>
              </div>
              <div className="bg-muted/30 rounded p-2 text-[9px] font-mono leading-tight space-y-1 max-h-32 overflow-y-auto">
                {analysis.reasoningTrace.map((t: string, i: number) => (
                  <div key={i} className="flex gap-1.5">
                    <span className="text-muted-foreground/50">{i + 1}.</span>
                    <span className="text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
