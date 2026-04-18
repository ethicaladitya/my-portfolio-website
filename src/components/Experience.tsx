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
    <section id="experience" className="py-24 bg-gray-50/70 dark:bg-gray-900/50 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-10" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-emerald-600 tracking-widest uppercase mb-3 block">
            Professional Experience
          </span>
          <h2 className="section-heading">
            Where I&apos;ve <span className="gradient-text">Delivered</span>
          </h2>
          <p className="section-subheading dark:text-gray-400 mx-auto mt-4">
            Real outcomes in production — not side projects or toy examples.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {items.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group"
            >
              {/* Card */}
              <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-500/50 transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{exp.role}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-semibold gradient-text-static">
                        {exp.company}
                      </span>
                      {exp.remote && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400">
                          Remote
                        </span>
                      )}
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-600 dark:text-green-400">
                        {exp.type}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 px-4 py-2 rounded-xl whitespace-nowrap flex-shrink-0">
                    {exp.period}
                  </span>
                </div>

                {/* Highlights */}
                <ul className="space-y-3 mb-6">
                  {exp.highlights.map((point, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + j * 0.05 }}
                      className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="pt-5 border-t border-gray-100 dark:border-gray-700/50">
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="tag-pill bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/30 transition-colors text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gradient accent on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
