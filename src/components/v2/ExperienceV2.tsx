"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeaderV2 from "./SectionHeaderV2";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  remote: boolean;
  highlights: string[];
  stack: string[];
}

export default function ExperienceV2({ items }: { items: ExperienceItem[] }) {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section id="experience" className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="section-container relative z-10">
        <SectionHeaderV2 
          metadata="// CAREER_REGISTRY"
          title="Industrial Journey"
          subtitle="A decade of engineering resilience, from WordPress freelancing to managing multi-regional infrastructure."
        />

        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto space-y-20"
        >
          {items.map((exp, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative flex flex-col md:flex-row gap-12"
            >
              {/* Sidebar: Year/Status */}
              <div className="w-full md:w-48 flex-shrink-0">
                <div className="sticky top-10 flex flex-col gap-4">
                  <div className="font-mono text-[11px] tracking-[0.4em] text-white/30 uppercase">
                    PERIOD [{exp.period}]
                  </div>
                  <div className="h-[2px] w-8 bg-primary/40 group-hover:w-full transition-all duration-700" />
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-white/20 uppercase">STATUS: ARCHIVED</span>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-primary uppercase">CODE: {exp.type.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* Main content: Information */}
              <div className="flex-grow space-y-10">
                <header className="space-y-4">
                  <h3 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                    {exp.role} <span className="text-white/20">@</span> {exp.company}
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 border border-primary/50 rotate-45" />
                    <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase">SYSTEM_ACCESS_GRANTED</span>
                  </div>
                </header>

                {/* Highlights as "LOG ENTRIES" */}
                <div className="space-y-6">
                  {exp.highlights.map((highlight, j) => (
                    <div key={j} className="flex gap-6 group/log">
                      <span className="font-mono text-[9px] text-white/20 mt-1 uppercase whitespace-nowrap">
                        LOG_0{j + 1}
                      </span>
                      <p className="text-white/60 text-[13px] leading-relaxed font-medium tracking-tight group-hover/log:text-white transition-colors">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="pt-10 border-t border-white/5 flex flex-wrap gap-x-6 gap-y-3">
                  {exp.stack.map((tech) => (
                    <span key={tech} className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase hover:text-primary transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Background index */}
              <div className="absolute top-0 right-0 font-black text-[180px] text-white/[0.02] leading-none pointer-events-none select-none -translate-y-1/4 translate-x-1/4">
                0{items.length - i}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
