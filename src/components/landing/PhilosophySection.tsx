import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function PhilosophySection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-30" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Quote className="w-10 h-10 text-indigo-500/30 mx-auto mb-6" />

          <blockquote className="text-2xl md:text-4xl font-bold text-white leading-relaxed mb-8">
            <span className="text-indigo-400">"</span>
            Memory should be{" "}
            <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              invisible
            </span>
            .<span className="text-indigo-400">"</span>
          </blockquote>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Most "Memory" libraries are just complex wrappers around vector
            stores. Memori-JS takes a different approach: as a developer, you
            shouldn't care <em className="text-zinc-300">how</em> the relevant
            context is found, only that your agent{" "}
            <em className="text-zinc-300">has</em> it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-mono text-zinc-500"
          >
            <span className="px-3 py-1 rounded-full bg-zinc-900/50 border border-white/5">
              SQLite/Postgres Native
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-900/50 border border-white/5">
              Client-Side Patching
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-900/50 border border-white/5">
              Zero Configuration
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
