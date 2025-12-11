import { motion } from "framer-motion";
import { Card } from "../ui/Card";

export function BenchmarkChart() {
  const data = [
    {
      label: "Standard Vector DB",
      value: 85,
      color: "bg-zinc-700",
      steps: "Manual Chunk + Embed + Search",
    },
    {
      label: "Memori-JS",
      value: 15,
      color: "bg-emerald-500",
      steps: "Zero-Config",
    },
  ];

  return (
    <Card className="w-full h-full min-h-[300px] flex flex-col justify-center">
      <h3 className="text-lg font-bold font-mono text-white mb-8 border-b border-white/10 pb-4">
        SETUP_TIME_ANALYSIS (MINUTES)
      </h3>

      <div className="space-y-8">
        {data.map((item, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between text-xs font-mono text-zinc-400 mb-2">
              <span>{item.label}</span>
              <span>{item.value}m</span>
            </div>
            <div className="h-4 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(item.value / 100) * 100}%` }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.2 + index * 0.2,
                }}
                className={`h-full ${item.color} rounded-full relative`}
              >
                <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
              </motion.div>
            </div>
            <div className="text-[10px] text-zinc-500 mt-1 font-mono">
              {item.steps}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
