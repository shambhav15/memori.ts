import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";

interface SectionHeaderProps {
  badgeText?: string;
  badgeIcon?: LucideIcon;
  badgeColor?: "indigo" | "red" | "emerald" | "zinc";
  title: string | React.ReactNode;
  description?: string;
  className?: string;
  align?: "center" | "left";
}

const badgeVariants = {
  indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
  red: "bg-red-500/10 border-red-500/20 text-red-400",
  emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  zinc: "bg-zinc-500/10 border-zinc-500/20 text-zinc-400",
};

export function SectionHeader({
  badgeText,
  badgeIcon: BadgeIcon,
  badgeColor = "indigo",
  title,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" ? "text-center" : "text-left",
        "mb-12",
        className
      )}
    >
      {badgeText && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono mb-4",
            badgeVariants[badgeColor]
          )}
        >
          {BadgeIcon && <BadgeIcon className="w-3 h-3" />}
          {badgeText}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xl md:text-3xl font-bold text-white mb-4"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
