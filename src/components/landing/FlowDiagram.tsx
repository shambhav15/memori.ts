import { motion } from "framer-motion";

export function FlowDiagram() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-black mb-4">How it works</h2>
          <p className="text-base text-muted-foreground">
            The proactive memory loop.
          </p>
        </div>

        <div className="relative w-full max-w-4xl aspect-video md:aspect-[2.5/1] bg-muted/5 rounded-2xl border border-border/50 p-8 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-size-[20px_20px] bg-grid-white/[0.02]" />

          <div className="relative z-10 flex items-center justify-between w-full max-w-3xl gap-4">
            {/* Apps / User */}
            <Node label="Your App" icon="📱" delay={0} />

            <Connection delay={0.5} />

            {/* Memori Core */}
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="relative z-10 w-24 h-24 rounded-2xl bg-card border border-primary/50 flex flex-col items-center justify-center shadow-2xl"
              >
                <div className="text-3xl mb-1">🧠</div>
                <div className="text-xs font-bold text-primary">Memori</div>
              </motion.div>
            </div>

            <Connection delay={1.5} />

            {/* LLM */}
            <Node label="LLM Provider" icon="🤖" delay={2} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Node({
  label,
  icon,
  delay,
}: {
  label: string;
  icon: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex flex-col items-center gap-2"
    >
      <div className="w-16 h-16 rounded-xl bg-muted border border-border flex items-center justify-center text-2xl shadow-sm">
        {icon}
      </div>
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
    </motion.div>
  );
}

function Connection({ delay }: { delay: number }) {
  return (
    <div className="flex-1 h-[2px] bg-border relative overflow-hidden rounded-full mx-4">
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay,
          ease: "linear",
          repeatDelay: 1,
        }}
        className="absolute inset-0 bg-linear-to-r from-transparent via-primary to-transparent w-1/2"
      />
    </div>
  );
}
