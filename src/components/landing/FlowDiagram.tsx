import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";

export function FlowDiagram() {
  return (
    <section className="container-factory py-12 border-t border-border">
      <div className="flex flex-col items-center">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-normal leading-none tracking-tight mb-2">
            Architecture
          </h2>
          <p className="text-muted-foreground text-sm">
            The proactive memory loop.
          </p>
        </div>

        {/* Schematic Container */}
        <div className="relative w-full max-w-2xl h-[200px] border border-border bg-background/50 flex items-center justify-center overflow-hidden rounded-sm mb-6">
          {/* Technical Grid Background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-50" />

          <div className="relative z-10 flex items-center justify-between w-full max-w-lg gap-4 px-8">
            {/* Apps / User */}
            <Node label="APP LAYER" icon="DEVICE" delay={0} />

            <Connection delay={0.5} label="RETRIEVE" />

            {/* Memori Core - Technical Box */}
            <div className="relative group cursor-help">
              <div className="absolute -inset-2 bg-accent/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="relative z-10 w-24 h-24 border border-border bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center shadow-lg group-hover:border-accent/50 transition-colors"
              >
                <div className="text-xl mb-1 text-foreground">⦿</div>
                <div className="text-[10px] font-mono text-foreground uppercase tracking-wider font-semibold">
                  CORE
                </div>
              </motion.div>
            </div>

            <Connection delay={1.5} label="INJECT" />

            {/* LLM */}
            <Node label="MODEL LAYER" icon="LLM" delay={2} />
          </div>
        </div>

        {/* Smart Link to Docs */}
        <Link to="/docs" className="group">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-muted/30 border border-border/50 hover:bg-muted/60 hover:border-accent/20 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-accent/10 text-accent">
              <BookOpen className="w-3 h-3" />
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-xs font-medium text-foreground">
                Deep Dive into Core Concepts
              </span>
              <span className="text-[10px] text-muted-foreground group-hover:text-accent/80 transition-colors">
                Learn how Memori orchestrates context
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform ml-1" />
          </motion.div>
        </Link>
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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex flex-col items-center gap-2"
    >
      <div className="w-16 h-16 border border-border bg-background flex items-center justify-center shadow-sm">
        <span className="text-[10px] font-mono text-muted-foreground">
          {icon}
        </span>
      </div>
      <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  );
}

function Connection({ delay, label }: { delay: number; label?: string }) {
  return (
    <div className="flex-1 flex flex-col items-center relative gap-1">
      {label && (
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest bg-background px-1 absolute -top-4"
        >
          {label}
        </motion.span>
      )}
      <div className="w-full h-px border-t border-dashed border-border relative overflow-hidden">
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          whileInView={{ x: "100%", opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay,
            ease: "linear",
            repeatDelay: 1,
          }}
          className="absolute top-[-1px] left-0 h-full w-1/2 bg-linear-to-r from-transparent via-foreground/50 to-transparent"
        />
      </div>
    </div>
  );
}
