"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  remote: boolean;
  highlights: string[];
  stack: string[];
}

export default function Experience({ items }: { items: ExperienceItem[] }) {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

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
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section id="experience" className="py-24 bg-background-secondary/70 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-primary tracking-widest uppercase mb-3 block">
            Work History
          </span>
          <h2 className="section-heading">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subheading text-text-secondary mx-auto mt-4 px-4">
            Building and scaling infrastructure for millions of sites.
          </p>
        </motion.div>

        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto space-y-8"
        >
          {items.map((exp, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-background border border-text-secondary/10 rounded-2xl p-8 hover:shadow-soft-elevation hover:border-primary/40 transition-all duration-300 relative overflow-hidden">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-bold text-text-primary tracking-tight">{exp.role}</h3>
                      <p className="text-primary/40 font-light hidden lg:block text-xl">|</p>
                      <p className="text-lg font-semibold text-text-secondary">{exp.company}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-background-secondary border border-text-secondary/10 text-text-secondary">
                        {exp.type}
                      </span>
                      {exp.remote && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-accent/5 border border-accent/20 text-accent">
                          Remote
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 lg:gap-0 lg:flex-col lg:items-end">
                    <span className="text-xs font-bold text-text-secondary bg-background-secondary/80 px-4 py-2 rounded-xl whitespace-nowrap flex-shrink-0 border border-text-secondary/5">
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-10">
                  {exp.highlights.map((highlight, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm text-text-secondary group/item"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-primary transition-colors duration-300">
                        <svg className="w-3 h-3 text-primary group-hover/item:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="pt-8 border-t border-text-secondary/5">
                  <p className="text-[10px] font-black text-text-secondary/40 uppercase tracking-[0.2em] mb-4">
                    Technology Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="tag-pill bg-primary/5 text-primary border border-primary/10 hover:bg-primary/10 hover:border-primary/30 transition-all text-[10px] font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Solid accent on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-primary via-accent to-accent-alt opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
