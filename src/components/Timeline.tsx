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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="timeline" className="py-24 bg-background relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-60" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary tracking-widest uppercase mb-3 block">
            Career Journey
          </span>
          <h2 className="section-heading">
            The <span className="gradient-text">Timeline</span>
          </h2>
          <p className="section-subheading text-text-secondary mx-auto mt-4">
            10+ years of progression — from WordPress freelancer to engineering manager at a global SaaS company.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/30" />

            <div className="space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <button
                    id={`timeline-item-${i}`}
                    className="w-full text-left"
                    onClick={() => setExpanded(expanded === i ? null : i)}
                  >
                    <div
                      className={`flex items-start gap-6 p-5 rounded-2xl border-2 transition-all duration-300 ${
                        expanded === i
                          ? "border-primary/30 bg-primary/5 shadow-glass"
                          : "border-transparent bg-background-secondary hover:bg-background-secondary/80 hover:border-text-secondary/10"
                      }`}
                    >
                      {/* Timeline dot */}
                      <div className="relative flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            expanded === i
                              ? "border-primary bg-primary text-background shadow-glow"
                              : "border-primary/20 bg-background text-primary"
                          }`}
                        >
                          {item.year.slice(-2)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                          <h3 className="text-base font-semibold text-text-primary">{item.title}</h3>
                          <span className="text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full flex-shrink-0">
                            {item.year}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary font-medium">{item.company}</p>

                        <AnimatePresence>
                          {expanded === i && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                                {item.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-3">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="tag-pill bg-primary/5 text-primary border border-primary/20 text-xs"
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
                        className={`flex-shrink-0 transition-transform duration-300 ${
                          expanded === i ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
