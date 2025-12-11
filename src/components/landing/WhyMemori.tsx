import { motion } from "framer-motion";
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

export function WhyMemori() {
  const painPoints = [
    {
      icon: Database,
      text: "Set up a vector DB (Pinecone, Qdrant, Weaviate...)",
      color: "text-red-400",
    },
    {
      icon: Scissors,
      text: "Manually chunk and embed user input",
      color: "text-red-400",
    },
    { icon: FileSearch, text: "Query the DB", color: "text-red-400" },
    {
      icon: MessageSquare,
      text: "Inject user context into the system prompt",
      color: "text-red-400",
    },
    { icon: Brain, text: "Call the LLM", color: "text-red-400" },
    {
      icon: Save,
      text: "Save the new conversation back to the DB",
      color: "text-red-400",
    },
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20 text-xs font-mono text-red-400 mb-4"
          >
            THE_PROBLEM
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-bold text-white mb-4"
          >
            If you're building an AI app today, you usually have to:
          </motion.h2>
        </div>

        {/* Pain Points Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-3 p-4 rounded-lg bg-zinc-900/50 border border-white/5 hover:border-red-500/20 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                <point.icon className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-300 transition-colors">
                {index + 1}. {point.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-emerald-500/10 rounded-xl blur-xl" />
          <div className="relative rounded-xl border border-indigo-500/20 bg-zinc-900/80 backdrop-blur-xl p-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-4">
              <Sparkles className="w-3 h-3" />
              THE_SOLUTION
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-6">
              With <span className="text-indigo-400">memori-js</span>, you just
              do this:
            </h3>

            <div className="max-w-md mx-auto text-left">
              <div className="bg-black/60 rounded-lg p-4 font-mono text-sm space-y-2 border border-white/10">
                <div className="text-zinc-500">
                  // 1 line to register memory
                </div>
                <div>
                  <span className="text-purple-400">memori</span>
                  <span className="text-zinc-300">.llm.</span>
                  <span className="text-blue-400">register</span>
                  <span className="text-zinc-300">(client);</span>
                </div>
                <div className="text-zinc-500 pt-2">
                  // Call your LLM as normal
                </div>
                <div>
                  <span className="text-purple-400">await</span>
                  <span className="text-zinc-300">
                    {" "}
                    client.chat.completions.
                  </span>
                  <span className="text-blue-400">create</span>
                  <span className="text-zinc-300">({"{ ... }"});</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-zinc-500">
              <span>That's it.</span>
              <ArrowRight className="w-3 h-3" />
              <span className="text-emerald-400">Memory is now automatic.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
