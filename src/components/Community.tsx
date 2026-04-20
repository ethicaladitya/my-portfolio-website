"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CommunityItem {
  event: string;
  role: string;
  years: string;
  impact: string;
  impactLabel: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, JSX.Element> = {
  wordpress: (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.109m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61zM12 22.785c-1.23 0-2.415-.181-3.536-.507l3.755-10.92 3.842 10.533c.025.06.053.117.084.171-1.286.459-2.667.723-4.145.723M1.215 12c0-1.274.22-2.499.628-3.64L7.38 22.47C3.692 20.71 1.215 16.643 1.215 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0" />
    </svg>
  ),
  google: (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  ),
  book: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  calendar: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
};

export default function Community({ items }: { items: CommunityItem[] }) {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section id="community" className="py-24 bg-background relative overflow-hidden transition-colors duration-300">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute top-20 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-primary tracking-widest uppercase mb-4 block">
            Community & Speaking
          </span>
          <h2 className="section-heading">
            Beyond the <span className="gradient-text">Terminal</span>
          </h2>
          <p className="section-subheading text-text-secondary mx-auto mt-6 px-4">
            Engineering is more than code. I have spent years building communities, sharing knowledge, and developing the next generation of WordPress and DevOps engineers.
          </p>
        </motion.div>

        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {items.map((item, i) => {
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group bg-background-secondary/50 rounded-2xl border border-text-secondary/10 p-8 hover:shadow-soft-elevation transition-all duration-300 hover:border-primary/40 flex flex-col h-full"
              >
                <div className="flex items-start gap-6 mb-6">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white flex-shrink-0 shadow-sm group-hover:scale-110 group-hover:shadow-glow transition-all duration-300"
                  >
                    {iconMap[item.icon] || iconMap["calendar"]}
                  </div>

                  <div className="pt-1">
                    <h3 className="text-xl font-bold text-text-primary tracking-tight">{item.event}</h3>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1 opacity-70">{item.role}</p>
                    <p className="text-[10px] font-bold text-text-secondary/40 uppercase tracking-[0.2em] mt-2">{item.years}</p>
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-8 flex-grow">{item.description}</p>

                {/* Impact number */}
                <div className="flex items-center gap-4 bg-background/50 rounded-xl px-5 py-4 border border-text-secondary/5 group-hover:border-primary/20 transition-colors">
                  <span className="text-3xl font-black text-primary tracking-tighter">{item.impact}</span>
                  <div className="h-4 w-px bg-text-secondary/10" />
                  <span className="text-[10px] text-text-secondary font-black uppercase tracking-[0.2em]">{item.impactLabel}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
