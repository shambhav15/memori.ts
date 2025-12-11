import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Link } from "@tanstack/react-router";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  to?: string;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      to,
      href,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-white text-black hover:bg-zinc-200 border border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]",
      secondary:
        "bg-zinc-800 text-white hover:bg-zinc-700 border border-white/10",
      outline:
        "bg-transparent text-white border border-white/20 hover:bg-white/5 hover:border-white/40",
      ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-white/5",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg font-semibold",
    };

    const classes = cn(
      "inline-flex items-center justify-center rounded-xl transition-all duration-200 font-medium gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
      variants[variant],
      sizes[size],
      className
    );

    const content = <>{children}</>;

    const motionProps = {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
    };

    if (to) {
      // TanStack Router Link
      return (
        <Link to={to} className={classes}>
          <motion.span {...motionProps} className="flex items-center gap-2">
            {content}
          </motion.span>
        </Link>
      );
    }

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.span {...motionProps} className="flex items-center gap-2">
            {content}
          </motion.span>
        </a>
      );
    }

    return (
      <motion.button
        ref={ref as any}
        className={classes}
        {...motionProps}
        {...(props as any)}
      >
        {content}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
