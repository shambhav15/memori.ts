import { createFileRoute } from "@tanstack/react-router";
import { Github, MessageSquare, Mail } from "lucide-react";

export const Route = createFileRoute("/community")({
  component: Community,
});

function Community() {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-white pt-24 px-6 font-mono">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-white/10 text-[10px] text-zinc-500 mb-6 uppercase tracking-widest">
          Community_Access
        </div>
        <h1 className="text-2xl font-bold mb-6 font-mono uppercase tracking-tight">
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
            className="group p-6 rounded bg-zinc-900/40 border border-white/5 hover:border-indigo-500/50 transition-all text-left relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="mb-6 w-10 h-10 bg-black rounded flex items-center justify-center border border-white/10 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-colors">
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
            className="group p-6 rounded bg-zinc-900/40 border border-white/5 hover:border-purple-500/50 transition-all text-left relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="mb-6 w-10 h-10 bg-black rounded flex items-center justify-center border border-white/10 group-hover:border-purple-500/50 group-hover:text-purple-400 transition-colors">
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

        <div className="mt-20 p-8 rounded bg-zinc-950 border border-dashed border-zinc-800 text-center">
          <h3 className="text-sm font-bold mb-4 uppercase text-zinc-300">
            Need Enterprise Support?
          </h3>
          <p className="text-xs text-zinc-500 mb-8 max-w-2xl mx-auto">
            Dedicated support and consulting integration services for
            mission-critical applications.
          </p>
          <a
            href="mailto:contact@memori.js.org"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-widest rounded-sm transition-colors"
          >
            <Mail size={14} /> Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
