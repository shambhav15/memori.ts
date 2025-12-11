import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
  delay?: number;
}

export function Card({ children, className, gradient, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm p-6 group transition-colors",
        "hover:border-white/10 hover:bg-zinc-800/40",
        className
      )}
    >
      {/* Gradient Background Glow */}
      <div
        className={cn(
          "absolute -inset-px opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl",
          gradient ||
            "bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500"
        )}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
