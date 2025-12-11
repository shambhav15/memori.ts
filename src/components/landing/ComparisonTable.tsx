import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";

interface ComparisonRow {
  feature: string;
  vectorDb: string;
  memori: string;
  highlight?: boolean;
}

export function ComparisonTable() {
  const rows: ComparisonRow[] = [
    {
      feature: "Setup",
      vectorDb: "Requires Docker, API keys, or cloud infrastructure.",
      memori: "Zero-Config. Creates a local memori.db SQLite file instantly.",
      highlight: true,
    },
    {
      feature: "Scalability",
      vectorDb: "Manual migration needed.",
      memori:
        "Pluggable. Scale from local SQLite to Postgres/Supabase seamlessly.",
    },
    {
      feature: "Integration",
      vectorDb: "You write the RAG pipeline logic manually.",
      memori:
        "Auto-Augmentation. Patches the LLM client to inject memory automatically.",
      highlight: true,
    },
    {
      feature: "Complexity",
      vectorDb: "High (Embeddings, Chunking, Retrieval).",
      memori: "Low. Handles embedding generation and retrieval internally.",
    },
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(99,102,241,0.08),transparent)]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-xs font-mono text-indigo-400 mb-4"
          >
            <Sparkles className="w-3 h-3" />
            WHY_MEMORI
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold text-white mb-4"
          >
            Memori vs. Standard Vector DBs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-zinc-400 max-w-xl mx-auto"
          >
            Stop building complex RAG pipelines. Let Memori handle context
            injection automatically.
          </motion.p>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-white/10 overflow-hidden bg-zinc-900/50 backdrop-blur-xl"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-white/10 bg-black/40">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              Feature
            </div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-2">
              <X className="w-3 h-3 text-red-400" />
              Standard Vector DB
            </div>
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Check className="w-3 h-3 text-emerald-400" />
              🧠 Memori-JS
            </div>
          </div>

          {/* Table Rows */}
          {rows.map((row, index) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className={`grid grid-cols-3 gap-4 px-6 py-5 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors ${
                row.highlight ? "bg-indigo-500/[0.03]" : ""
              }`}
            >
              <div className="text-sm font-semibold text-white">
                {row.feature}
              </div>
              <div className="text-xs text-zinc-500 leading-relaxed">
                {row.vectorDb}
              </div>
              <div className="text-xs text-zinc-300 leading-relaxed">
                {row.memori}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
