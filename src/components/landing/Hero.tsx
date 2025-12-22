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
      ease: "circOut",
    },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden py-10 lg:py-16">
      {/* Minimal Background - Factory.ai style */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        className="container-factory relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Status Badge - Factory.ai monospace style */}
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-card border border-border backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="text-mono text-foreground">v1.1.1 is live</span>
        </motion.div>

        {/* Heading - Factory.ai tight letter-spacing */}
        <motion.h1
          variants={item}
          className="text-5xl md:text-6xl font-normal tracking-tighter text-foreground leading-none text-balance"
          style={{ letterSpacing: "-0.048em" }}
        >
          Give your AI <br />
          <span className="text-foreground">Unforgettable Memory.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="text-base md:text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed"
        >
          The missing SQL-native layer for intelligent agents.{" "}
          <br className="hidden md:block" /> No vector DB complexity. Just pure
          recall.
        </motion.p>

        {/* CTA Buttons - Factory.ai style */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full sm:w-auto"
        >
          <Button asChild size="lg" className="group">
            <Link to="/docs/quickstart">
              Start Building
              <Zap className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="group"
            onClick={() => {
              document
                .getElementById("comparison-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Compare vs Others
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
