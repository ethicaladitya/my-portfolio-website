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
    <section id="experience" className="py-24 bg-gray-50/70 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-100/50 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-purple-600 tracking-widest uppercase mb-3 block">
            Professional Experience
          </span>
          <h2 className="section-heading">
            Where I&apos;ve <span className="gradient-text">Delivered</span>
          </h2>
          <p className="section-subheading mx-auto mt-4">
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
              <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl hover:border-purple-200 transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.role}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-semibold gradient-text-static">
                        {exp.company}
                      </span>
                      {exp.remote && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600">
                          Remote
                        </span>
                      )}
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-600">
                        {exp.type}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-4 py-2 rounded-xl whitespace-nowrap flex-shrink-0">
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
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="pt-5 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="tag-pill bg-purple-50 text-purple-700 border border-purple-100 hover:bg-purple-100 transition-colors text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gradient accent on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
