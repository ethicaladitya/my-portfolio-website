"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeaderV2 from "./SectionHeaderV2";

interface WhatIDoItem {
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export default function WhatIDoV2({ items }: { items: WhatIDoItem[] }) {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section id="what-i-do" className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="section-container relative z-10">
        <SectionHeaderV2 
          metadata="// CORE_SERVICES"
          title="Architectural Impact"
          subtitle="Engineering resilience and performance at the intersection of WordPress, Cloud, and Security."
        />

        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-white/10"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative border-r border-b border-white/10 p-10 flex flex-col h-[420px] hover:bg-white/[0.02] transition-colors duration-500"
            >
              {/* ID Metadata */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase">
                  COMPONENT_ID: 0{i + 1}
                </span>
                <div className="w-8 h-[1px] bg-white/10" />
              </div>

              {/* Title */}
              <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-xs leading-relaxed mb-10 line-clamp-4 font-medium tracking-tight">
                {item.description}
              </p>

              {/* Tags & Footer */}
              <div className="mt-auto space-y-6">
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase">
                      [{tag}]
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                   <div className="h-[1px] flex-grow bg-white/10 group-hover:bg-primary/30 transition-colors" />
                   <div className="w-2 h-2 border border-white/20 rotate-45 group-hover:bg-primary group-hover:border-primary transition-all duration-300" />
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_70%) opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
