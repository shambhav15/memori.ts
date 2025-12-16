import {
  Database,
  Scissors,
  FileSearch,
  MessageSquare,
  Brain,
  Save,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WhyMemori() {
  const painPoints = [
    { icon: Database, text: "Set up a vector DB" },
    { icon: Scissors, text: "Chunk/embed manually" },
    { icon: FileSearch, text: "Query the DB" },
    { icon: MessageSquare, text: "Inject context" },
    { icon: Brain, text: "Call the LLM" },
    { icon: Save, text: "Save conversation" },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* The Problem */}
        <div className="space-y-6 flex flex-col justify-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              The Problem
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Building memory for AI agents usually requires glueing together
              multiple complex systems.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {painPoints.map((point, index) => (
              <Card
                key={index}
                className="bg-muted/30 border-primary/5 shadow-none hover:bg-muted/60 transition-colors"
              >
                <CardContent className="flex items-center gap-3 p-3">
                  <point.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium text-sm text-foreground/80">
                    {point.text}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* The Solution */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <Card className="relative h-full border-emerald-500/20 bg-card/80 backdrop-blur-xl overflow-hidden">
            <CardHeader className="pb-2 border-b border-emerald-500/10 bg-emerald-500/5">
              <CardTitle className="flex items-center gap-2 text-base font-medium text-emerald-500">
                <Sparkles className="w-4 h-4" />
                The Solution: Zero Config
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <p className="text-muted-foreground text-lg">
                Memori.ts abstracts the entire RAG pipeline into a single line
                of code.
              </p>

              <div className="bg-muted/80 rounded-lg p-5 font-mono text-sm space-y-3 overflow-x-auto border border-emerald-500/10">
                <div className="flex gap-2 text-muted-foreground opacity-70">
                  <span>//</span> <span>1. Register middleware</span>
                </div>
                <div className="pl-4 border-l-2 border-emerald-500/30">
                  <span className="text-purple-400">memori</span>.llm.
                  <span className="text-blue-400">register</span>(client);
                </div>
                <div className="flex gap-2 text-muted-foreground opacity-70 mt-4">
                  <span>//</span> <span>2. Call LLM as normal</span>
                </div>
                <div className="pl-4 border-l-2 border-amber-500/30">
                  <span className="text-purple-400">await</span>{" "}
                  client.chat.completions.
                  <span className="text-blue-400">create</span>(...)
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-emerald-500 bg-emerald-500/10 w-fit px-3 py-1.5 rounded-full">
                <ArrowRight className="w-4 h-4" />
                <span>Memory is auto-injected.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
