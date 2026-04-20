"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

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
  const containerRef = useRef<HTMLElement>(null);

  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth mouse movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  // Parallax transforms
  const moveX = useTransform(springX, [0, 1000], [-20, 20]);
  const moveY = useTransform(springY, [0, 1000], [-20, 20]);
  const moveXSlow = useTransform(springX, [0, 1000], [-10, 10]);
  const moveYSlow = useTransform(springY, [0, 1000], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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

  // Name splitting for staggered reveal
  const nameChars = data.meta.name.split("");

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-background transition-colors duration-300"
    >
      {/* Background depth layer 1: Subtle moving grid */}
      <motion.div 
        style={{ x: moveXSlow, y: moveYSlow }}
        className="absolute inset-[-5%] bg-grid-pattern opacity-40 select-none pointer-events-none" 
      />
      
      {/* Background depth layer 2: Large blurred blobs with parallax */}
      <motion.div 
        style={{ x: moveX, y: moveY }}
        className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-70 pointer-events-none" 
      />
      <motion.div 
        style={{ x: moveXSlow, y: moveYSlow }}
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] opacity-70 pointer-events-none" 
      />

      {/* Floating glass elements with parallax */}
      <motion.div
        style={{ x: moveX, y: moveY }}
        animate={{ rotate: [0, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 right-16 w-64 h-64 rounded-full bg-primary/5 backdrop-blur-sm border border-text-primary/10 hidden lg:block pointer-events-none"
      />
      <motion.div
        style={{ x: moveXSlow, y: moveYSlow }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-32 right-32 w-40 h-40 rounded-full bg-accent/5 backdrop-blur-sm border border-text-primary/10 hidden lg:block pointer-events-none"
      />

      <div className="section-container relative z-10 pt-24 pb-12">
        <div className="max-w-4xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Active across production environments
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
            className="text-lg text-text-secondary font-medium mb-4"
          >
            {data.hero.greeting}
          </motion.p>

          {/* Premium Staggered Name Reveal */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 flex flex-wrap overflow-hidden">
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.04,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
                }}
                className="gradient-text inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          {/* Typewriter role with smoother entrance */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
            className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 h-10 flex items-center gap-1"
          >
            I build <span className="gradient-text ml-2">{displayText}</span>
            <span className="w-0.5 h-8 bg-primary animate-pulse ml-1" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
            className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mb-12"
          >
            {data.meta.tagline}
          </motion.p>

          {/* CTAs with magnetic-like hover feel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
            className="flex flex-wrap items-center gap-4"
          >
            <a 
              href="#what-i-do" 
              id="hero-view-work" 
              className="btn-primary text-base group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>

            <button
              onClick={onOpenQR}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-text-secondary hover:text-primary border border-text-secondary/20 hover:border-primary/50 bg-background hover:bg-primary/5 transition-all duration-350 ease-premium hover:shadow-soft-elevation"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              Quick Share
            </button>
          </motion.div>

          {/* Tech stack reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-20 flex flex-wrap items-center gap-3"
          >
            <span className="text-sm text-text-secondary/60 font-medium mr-2">Core stack:</span>
            {["WordPress", "PHP/MySQL", "Nginx", "Linux", "Docker", "React"].map((tech, i) => (
              <motion.span
                key={tech}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-background-secondary/50 border border-text-secondary/10 text-text-secondary hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all cursor-default"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.5 + i * 0.05, ease: "easeOut" }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator with softer motion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-text-secondary/40"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border border-text-secondary/20 flex items-start justify-center p-1.5"
        >
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-primary/60 rounded-full" 
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
