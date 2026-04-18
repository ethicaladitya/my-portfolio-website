"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const iconMap: Record<string, JSX.Element> = {
  server: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  shield: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  zap: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  users: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  code: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  "trending-up": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

const gradients = [
  "from-emerald-500 to-teal-500",
  "from-teal-500 to-cyan-500",
  "from-cyan-500 to-blue-500",
  "from-indigo-500 to-blue-500",
  "from-indigo-400 to-cyan-500",
  "from-slate-600 to-slate-800",
];

interface WhatIDoItem {
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export default function WhatIDo({ items }: { items: WhatIDoItem[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="what-i-do" className="py-24 bg-gray-50/50 dark:bg-gray-900/50 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 dark:bg-emerald-900/20 rounded-full blur-3xl" />

      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-emerald-600 tracking-widest uppercase mb-3 block">
            Impact-Focused
          </span>
          <h2 className="section-heading">
            What I <span className="gradient-text">Actually Do</span>
          </h2>
          <p className="section-subheading dark:text-gray-400 mx-auto mt-4">
            Not a list of technologies. Here&apos;s what I own, solve, and deliver in production environments every day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group gradient-border bg-white dark:bg-gray-800/50 border border-transparent dark:border-white/5 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                {iconMap[item.icon] || iconMap["server"]}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-5">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag-pill bg-gray-100 dark:bg-gray-900/80 border border-transparent dark:border-gray-700 text-gray-600 dark:text-gray-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/20 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
