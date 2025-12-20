import { motion, Variants } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { ArrowRight, Zap } from "lucide-react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "circOut", // Standard easing to avoid TS tuple issues
    },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[120px] animate-pulse duration-3000" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center gap-10 max-w-5xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 border border-border/40 backdrop-blur-md shadow-sm mb-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            v1.0.61 is live
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-3xl md:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-foreground via-foreground to-foreground/50 leading-[0.95] text-balance"
        >
          Give your AI <br />
          <span className="text-foreground">Unforgettable Memory.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-base md:text-lg text-muted-foreground/90 max-w-2xl text-balance font-light leading-relaxed"
        >
          The missing SQL-native layer for intelligent agents.{" "}
          <br className="hidden md:block" /> No vector DB complexity. Just pure
          recall.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto"
        >
          <Button
            asChild
            size="lg"
            className="h-12 px-8 rounded-full text-base font-bold bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105 shadow-xl shadow-foreground/10 group"
          >
            <Link to="/docs/quickstart">
              Start Building
              <Zap className="ml-2 w-4 h-4 group-hover:fill-current" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8 rounded-full text-base font-medium border-foreground/10 bg-background/50 backdrop-blur-xl hover:bg-background/80 transition-all hover:scale-105 group"
            onClick={() => {
              document
                .getElementById("comparison-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Compare vs Others
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
