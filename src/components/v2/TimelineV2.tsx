"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeaderV2 from "./SectionHeaderV2";

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
}

export default function TimelineV2({ items }: { items: TimelineItem[] }) {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="py-32 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
      <div className="section-container relative z-10">
        <SectionHeaderV2 
          metadata="// SEQUENCE_HISTORY"
          title="The Progression"
          subtitle="Sequential records of infrastructure growth and professional architectural evolution."
        />

        <div className="max-w-4xl mx-auto">
          <motion.div 
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
            className="space-y-0"
          >
            {items.map((item, i) => (
              <div 
                key={i} 
                className="group relative flex gap-12 border-l border-white/10 pl-12 pb-20 last:pb-0"
              >
                {/* Connector Dot */}
                <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 bg-[#0a0a0a] border border-white/20 rounded-full group-hover:border-primary group-hover:bg-primary transition-all duration-500" />

                {/* Content */}
                <div className="flex-grow space-y-6">
                  <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                       <span className="font-mono text-[9px] tracking-[0.3em] text-primary uppercase">
                         {item.year}
                       </span>
                       <h3 className="text-2xl font-black text-white tracking-tighter uppercase whitespace-normal">
                         {item.title}
                       </h3>
                    </div>
                    <span className="font-mono text-[9px] tracking-[0.4em] text-white/20 uppercase whitespace-nowrap">
                       @ {item.company}
                    </span>
                  </header>

                  <p className="text-white/50 text-xs leading-relaxed font-medium tracking-tight max-w-2xl">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[8px] tracking-[0.2em] text-white/20 uppercase border border-white/5 px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Index metadata */}
                <div className="hidden lg:block absolute top-0 right-0 font-mono text-[10px] tracking-[0.4em] text-white/10 uppercase">
                   SEQ_0x0{items.length - i}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
