"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 bg-neutral-950 opacity-40 overflow-hidden perspective-500",
        className
      )}
    >
      <div className="absolute h-[100%] w-[100%] left-0 top-0 [transform-style:preserve-3d]">
        {/* Central light source */}
        <div className="absolute left-1/2 top-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-indigo-500/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

        {/* Animated Grid Lines */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: Math.random() * 100 - 50 + "%", y: -100 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: "120%",
              x: Math.random() * 100 - 50 + "%",
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            className="absolute top-0 w-px h-[400px] bg-gradient-to-b from-transparent via-indigo-500 to-transparent left-1/2"
            style={{
              transform: `translateX(${Math.random() * 2000 - 1000}px) rotateZ(${Math.random() * 40 - 20}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
