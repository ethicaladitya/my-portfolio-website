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
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-background transition-colors duration-300"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-70" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl opacity-70" />

      {/* Floating blobs */}
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 right-16 w-64 h-64 rounded-full bg-primary/5 backdrop-blur-sm border border-text-primary/10 hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-32 right-32 w-40 h-40 rounded-full bg-accent/5 backdrop-blur-sm border border-text-primary/10 hidden lg:block"
      />
      <motion.div
        animate={{ x: [0, 30, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 left-8 w-20 h-20 rounded-2xl bg-primary/5 backdrop-blur-sm border border-text-primary/10 hidden xl:block"
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-text-secondary font-medium mb-3"
          >
            {data.hero.greeting}
          </motion.div>

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
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 h-10 flex items-center gap-1"
          >
            I build <span className="gradient-text ml-1.5">{displayText}</span>
            <span className="w-0.5 h-8 bg-primary animate-pulse ml-1" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mb-10"
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
              onClick={onOpenQR}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-text-secondary hover:text-primary border border-text-secondary/20 hover:border-primary/50 bg-background hover:bg-primary/10 transition-all duration-300 hover:-translate-y-0.5"
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
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 flex flex-wrap items-center gap-3"
          >
            <span className="text-sm text-text-secondary/60 font-medium mr-2">Core stack:</span>
            {["WordPress", "PHP/MySQL", "Nginx", "Linux", "Docker", "React"].map((tech, i) => (
              <motion.span
                key={tech}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-background-secondary border border-text-secondary/20 text-text-secondary hover:border-primary/50 hover:text-primary hover:bg-primary/10 transition-all cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary/60"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-text-secondary/40 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
