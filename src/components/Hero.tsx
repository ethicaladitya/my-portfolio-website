"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HeroProps {
  data: {
    meta: {
      name: string;
      tagline: string;
    };
    hero: {
      greeting: string;
      roles: string[];
      description: string;
    };
  };
  onOpenQR: () => void;
}

export default function Hero({ data, onOpenQR }: HeroProps) {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const roles = data.hero.roles;

  useEffect(() => {
    const role = roles[currentRole];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex < role.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 70);
    } else if (!isDeleting && charIndex === role.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 35);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setCurrentRole((r) => (r + 1) % roles.length);
    }

    setDisplayText(role.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentRole, roles]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-20" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-100 dark:from-emerald-900/30 via-teal-50 dark:via-teal-900/20 to-transparent rounded-full blur-3xl opacity-70" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-100 dark:from-cyan-900/30 via-emerald-50 dark:via-emerald-900/20 to-transparent rounded-full blur-3xl opacity-70" />

      {/* Floating blobs */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 right-16 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-200/40 to-cyan-200/40 backdrop-blur-sm border border-white/60 hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-32 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-200/40 to-teal-200/40 backdrop-blur-sm border border-white/60 hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-200/50 to-emerald-200/50 backdrop-blur-sm border border-white/60 hidden xl:block"
      />

      <div className="section-container relative z-10 pt-24 pb-12">
        <div className="max-w-4xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Open to senior engineering & leadership roles
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 dark:text-gray-400 font-medium mb-3"
          >
            {data.hero.greeting}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4"
          >
            <span className="gradient-text">{data.meta.name}</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-gray-300 mb-6 h-10 flex items-center gap-1"
          >
            <span>{displayText}</span>
            <span className="w-0.5 h-8 bg-emerald-500 animate-pulse ml-1" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mb-10"
          >
            {data.meta.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a href="#what-i-do" id="hero-view-work" className="btn-primary text-base">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              View My Work
            </a>

            <button
              id="hero-qr-btn"
              onClick={onOpenQR}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-gray-200 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-500/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-emerald-50 dark:hover:bg-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              Generate QR
            </button>
          </motion.div>

          {/* Tech strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-14 flex flex-wrap items-center gap-3"
          >
            <span className="text-sm text-gray-400 dark:text-gray-500 font-medium mr-2">Core stack:</span>
            {["WordPress", "Linux", "Nginx", "MySQL", "PHP", "Ansible", "Docker", "DevOps"].map((tech) => (
              <span
                key={tech}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-emerald-300 dark:hover:border-emerald-500/50 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/20 transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-emerald-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
