"use client";

import { motion } from "framer-motion";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export default function LiveStatsV2({ stats }: { stats: Stat[] }) {
  return (
    <section className="py-24 bg-[#050505] border-t border-white/5">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className="group flex flex-col gap-4 text-center items-center"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                  {stat.value}
                </span>
                <span className="text-xl md:text-2xl font-bold text-primary">
                  {stat.suffix}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-4 bg-white/20 group-hover:w-8 group-hover:bg-primary transition-all duration-500" />
                <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase group-hover:text-white transition-colors">
                  {stat.label.replace(/ /g, "_")}
                </span>
                <div className="h-[1px] w-4 bg-white/20 group-hover:w-8 group-hover:bg-primary transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
