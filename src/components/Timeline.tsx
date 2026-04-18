"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <section id="timeline" className="py-24 bg-background relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-primary tracking-widest uppercase mb-4 block">
            Career Journey
          </span>
          <h2 className="section-heading">
            The <span className="gradient-text">Timeline</span>
          </h2>
          <p className="section-subheading text-text-secondary mx-auto mt-6 max-w-2xl px-4">
            10+ years of progression — from WordPress freelancer to engineering manager at a global SaaS company.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line with gradient */}
            <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary via-primary/20 to-transparent" />

            <motion.div 
              ref={containerRef}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-6"
            >
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                >
                  <button
                    id={`timeline-item-${i}`}
                    className="w-full text-left focus:outline-none group"
                    onClick={() => setExpanded(expanded === i ? null : i)}
                  >
                    <div
                      className={`flex items-start gap-6 p-6 rounded-2xl border transition-all duration-350 ease-premium ${
                        expanded === i
                          ? "border-primary/20 bg-primary/5 shadow-soft-elevation"
                          : "border-text-secondary/5 bg-background-secondary/50 hover:bg-background-secondary hover:border-text-secondary/10"
                      }`}
                    >
                      {/* Timeline dot */}
                      <div className="relative flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-xl border flex items-center justify-center text-[10px] font-black tracking-tighter transition-all duration-350 ease-premium ${
                            expanded === i
                              ? "border-primary bg-primary text-background shadow-glow"
                              : "border-text-secondary/10 bg-background text-text-secondary group-hover:border-primary/30"
                          }`}
                        >
                          {item.year.slice(-2)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                          <h3 className="text-lg font-bold text-text-primary tracking-tight">{item.title}</h3>
                          <span className="text-[10px] font-black text-primary bg-primary/5 border border-primary/10 px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">
                            {item.year}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary font-bold mb-1 opacity-60 uppercase tracking-widest text-[10px]">{item.company}</p>

                        <AnimatePresence>
                          {expanded === i && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="h-px w-full bg-text-secondary/5 mb-4" />
                              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                                {item.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="tag-pill bg-primary/5 text-primary border border-primary/10 text-[9px] font-bold uppercase tracking-widest"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Expand chevron */}
                      <div
                        className={`flex-shrink-0 pt-2 transition-transform duration-350 ease-premium ${
                          expanded === i ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 transition-colors ${expanded === i ? "text-primary" : "text-text-secondary/30"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
