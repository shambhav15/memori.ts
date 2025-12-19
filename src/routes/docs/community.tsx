import { createFileRoute } from "@tanstack/react-router";
import { Github, MessageSquare, Mail } from "lucide-react";

export const Route = createFileRoute("/docs/community")({
  component: Community,
});

function Community() {
  return (
    <div className="min-h-screen bg-[#020205] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] text-zinc-300 pt-24 px-6 font-mono">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] text-zinc-400 mb-6 uppercase tracking-widest backdrop-blur-md">
          Community_Access
        </div>
        <h1 className="text-2xl font-bold mb-6 font-mono uppercase tracking-tight text-white">
          Community & Support
        </h1>
        <p className="text-sm text-zinc-400 mb-16 max-w-lg mx-auto leading-relaxed">
          Join the conversation, contribute to the project, or get help with
          your integration.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <a
            href="https://github.com/shambhav15/memori-js"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-xl bg-black/40 border border-white/10 hover:border-indigo-500/50 transition-all text-left relative overflow-hidden backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="mb-6 w-10 h-10 bg-black/50 rounded flex items-center justify-center border border-white/10 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-colors">
                <Github size={20} />
              </div>
              <h2 className="text-sm font-bold mb-2 uppercase text-white group-hover:text-indigo-300">
                GitHub
              </h2>
              <p className="text-xs text-zinc-500 mb-4">
                Report bugs, request features, or contribute.
              </p>
              <div className="w-full h-px bg-white/5 group-hover:bg-indigo-500/20 transition-colors mb-4" />
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider group-hover:text-indigo-400 transition-colors">
                View Repository &rarr;
              </span>
            </div>
          </a>

          <a
            href="https://github.com/shambhav15/memori-js/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-xl bg-black/40 border border-white/10 hover:border-purple-500/50 transition-all text-left relative overflow-hidden backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="mb-6 w-10 h-10 bg-black/50 rounded flex items-center justify-center border border-white/10 group-hover:border-purple-500/50 group-hover:text-purple-400 transition-colors">
                <MessageSquare size={20} />
              </div>
              <h2 className="text-sm font-bold mb-2 uppercase text-white group-hover:text-purple-300">
                Discussions
              </h2>
              <p className="text-xs text-zinc-500 mb-4">
                Ask questions and connect with developers.
              </p>
              <div className="w-full h-px bg-white/5 group-hover:bg-purple-500/20 transition-colors mb-4" />
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider group-hover:text-purple-400 transition-colors">
                Join Discussion &rarr;
              </span>
            </div>
          </a>
        </div>

        <div className="mt-20 p-8 rounded-xl bg-black/40 border border-dashed border-white/10 text-center backdrop-blur-sm">
          <h3 className="text-sm font-bold mb-4 uppercase text-zinc-300">
            Need Enterprise Support?
          </h3>
          <p className="text-xs text-zinc-500 mb-8 max-w-2xl mx-auto">
            Dedicated support and consulting integration services for
            mission-critical applications.
          </p>
          <a
            href="mailto:contact@memori.js.org"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors shadow-lg hover:shadow-indigo-500/20"
          >
            <Mail size={14} /> Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
