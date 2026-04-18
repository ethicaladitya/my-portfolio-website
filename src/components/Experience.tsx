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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24 bg-background-secondary/70 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-10" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-semibold text-primary tracking-widest uppercase mb-3 block">
            Work History
          </span>
          <h2 className="section-heading">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subheading text-text-secondary mx-auto mt-4">
            Building and scaling infrastructure for millions of sites.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {items.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-background border border-text-secondary/10 rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold text-text-primary mb-1">{exp.role}</h3>
                      <p className="text-primary font-semibold hidden lg:block px-2">—</p>
                      <p className="text-lg font-semibold text-text-secondary">{exp.company}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-semibold px-2 py-1 rounded border border-text-secondary/10 text-text-secondary bg-background-secondary">
                        {exp.type}
                      </span>
                      {exp.remote && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent">
                          Remote
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 lg:gap-0 lg:flex-col lg:items-end">
                    <div className="hidden lg:flex w-full justify-end mb-2">
                      <div className="h-0.5 w-12 bg-text-secondary/20 mr-4 mt-2" />
                    </div>
                    <span className="text-sm font-semibold text-text-secondary bg-background-secondary px-4 py-2 rounded-xl whitespace-nowrap flex-shrink-0">
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-4 mb-8">
                  {exp.highlights.map((highlight, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="pt-5 border-t border-text-secondary/10">
                  <p className="text-xs font-semibold text-text-secondary/60 uppercase tracking-widest mb-3">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="tag-pill bg-primary/5 text-primary border border-primary/20 hover:bg-primary/10 transition-colors text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gradient accent on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-primary via-accent to-accent-alt opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
