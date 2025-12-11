import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Zap, History, AlertTriangle } from "lucide-react";

interface SearchResult {
  text: string;
  relevance: number;
}

interface LegacyResult {
  text: string;
  match: string;
  error?: boolean;
}

export function SearchComparison() {
  const [query, setQuery] = useState("what is the speed of light");
  const [isComparing, setIsComparing] = useState(false);
  const [showResults, setShowResults] = useState(true);

  // Simulated data matching the user's image
  const legacyResults: LegacyResult[] = [
    {
      text: "[Legacy SQL Match] Found keyword 'what' in unrelated record #8492",
      match: "1.5%",
    },
    {
      text: "System Error: Index out of sync.",
      match: "0.5%",
      error: true,
    },
  ];

  const semanticResults: SearchResult[] = [
    {
      text: "The speed of light is approximately 299,792 km/s.",
      relevance: 0.252,
    },
    {
      text: "Photosynthesis converts light into chemical energy.",
      relevance: -0.071,
    },
    {
      text: "The Great Wall of China is visible from space (mostly a myth).",
      relevance: -0.095,
    },
    { text: "The Earth is the third planet from the Sun.", relevance: -0.1 },
    { text: "DNA carries genetic instructions for life.", relevance: -0.11 },
  ];

  const legacyTime = 1064;
  const currentTime = 515;
  const improvement = Math.round(
    ((legacyTime - currentTime) / legacyTime) * 100
  );

  const handleCompare = () => {
    setIsComparing(true);
    setShowResults(false);
    setTimeout(() => {
      setShowResults(true);
      setIsComparing(false);
    }, 800);
  };

  return (
    <section className="py-16 px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
            Compare legacy keyword search vs semantic vector search
          </h2>
        </div>

        {/* Search Input */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-zinc-900/80 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              placeholder="Enter a search query..."
            />
          </div>
          <button
            onClick={handleCompare}
            disabled={isComparing}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-black font-semibold text-sm rounded-lg transition-colors disabled:opacity-50"
          >
            {isComparing ? "Comparing..." : "Compare"}
          </button>
        </div>

        {/* Speed Improvement Badge */}
        <div className="text-center mb-6">
          <span className="text-sm font-mono">
            <span className="text-white">
              {improvement}% faster with semantic search
            </span>
            <span className="text-zinc-500 mx-2">·</span>
            <span className="text-orange-400">{legacyTime}ms</span>
            <span className="text-zinc-500 mx-2">→</span>
            <span className="text-emerald-400">{currentTime}ms</span>
          </span>
        </div>

        {/* Comparison Panels */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Legacy Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl bg-zinc-900/50 border border-white/5 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/40">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-zinc-500" />
                <span className="text-sm font-mono text-zinc-400">
                  Legacy v1.0
                </span>
              </div>
              <span className="text-orange-400 font-mono text-sm font-bold">
                {legacyTime}ms
              </span>
            </div>

            <div className="p-4 space-y-4 min-h-[280px]">
              <AnimatePresence>
                {showResults &&
                  legacyResults.map((result, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`p-3 rounded-lg border ${
                        result.error
                          ? "bg-red-500/5 border-red-500/20"
                          : "bg-zinc-800/50 border-white/5"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {result.error && (
                          <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                        )}
                        <div>
                          <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                            {result.text}
                          </p>
                          <p className="text-[10px] font-mono text-zinc-600 mt-1">
                            Match: {result.match}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>

              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] font-mono text-zinc-600">
                  Keyword / Basic SQL · None
                </p>
              </div>
            </div>
          </motion.div>

          {/* Current Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl bg-zinc-900/50 border border-emerald-500/20 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-500/10 bg-emerald-500/5">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-mono text-emerald-300">
                  Current v1.0.57
                </span>
              </div>
              <span className="text-emerald-400 font-mono text-sm font-bold">
                {currentTime}ms
              </span>
            </div>

            <div className="p-4 space-y-2 min-h-[280px]">
              <AnimatePresence>
                {showResults &&
                  semanticResults.map((result, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 py-2 border-l-2 border-emerald-500/50 pl-3"
                    >
                      <div className="flex-1">
                        <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                          {result.text}
                        </p>
                        <p className="text-[10px] font-mono text-emerald-400/70 mt-0.5">
                          Relevance: {result.relevance.toFixed(3)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>

              <div className="pt-4 border-t border-white/5 mt-4">
                <p className="text-[10px] font-mono text-zinc-500">
                  Vector Similarity (Cosine) · HNSW / IVFFlat (via sqlite-vec)
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
