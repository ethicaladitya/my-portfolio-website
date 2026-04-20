"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface HeroV2Props {
  data: {
    meta: {
      name: string;
      tagline: string;
      location: string;
    };
    hero: {
      greeting: string;
      roles: string[];
      description: string;
    };
  };
}

export default function HeroV2({ data }: HeroV2Props) {
  const [displayText, setDisplayText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const roles = data.hero.roles;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  
  const moveX = useTransform(springX, [0, 1000], [-30, 30]);
  const moveY = useTransform(springY, [0, 1000], [-30, 30]);

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
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setCurrentRole((r) => (r + 1) % roles.length);
    }

    setDisplayText(role.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentRole, roles]);

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden font-sans selection:bg-white selection:text-black">
      {/* Igloo-style Atmospheric Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_100%)]" />
        <div className="absolute inset-0 bg-noise-pattern opacity-[0.03]" />
      </div>

      {/* Central "Core Object" */}
      <motion.div 
        style={{ x: moveX, y: moveY }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative">
          {/* Layered Glows */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-white/5 blur-[120px] rounded-full"
          />
          <div className="absolute inset-0 w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 bg-white/10 blur-[60px] rounded-full" />
          
          {/* Main Content */}
          <div className="relative z-20 text-center flex flex-col items-center">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               className="mb-6"
             >
               <span className="font-mono text-[10px] tracking-[0.5em] text-white/40 uppercase block mb-4">
                 {"//"} ENGINEER_CORE_v2.0
               </span>
               <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">
                 {data.meta.name.split(" ").map((word, i) => (
                   <span key={i} className="block">{word.toUpperCase()}</span>
                 ))}
               </h1>
             </motion.div>

             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.8 }}
               className="h-8 flex items-center font-mono text-sm tracking-widest text-white/50 uppercase"
             >
               I build <span className="text-white mx-3">{displayText}</span>
               <span className="w-1 h-4 bg-white animate-pulse" />
             </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Corner UI Elements (Igloo Style) */}
      
      {/* Top Left: Logo */}
      <div className="absolute top-12 left-12 z-20">
        <span className="text-2xl font-black tracking-tighter text-white">ADITYA.</span>
      </div>

      {/* Top Right: Manifesto */}
      <div className="absolute top-12 right-12 z-20 hidden md:block max-w-[280px]">
        <div className="flex flex-col gap-4 text-right items-end">
          <span className="font-mono text-[9px] tracking-[0.4em] text-white/40 uppercase">
            {"//////"} MANIFESTO
          </span>
          <p className="text-[11px] leading-relaxed text-white/60 font-medium tracking-tight">
            High-performance infrastructure is the silent foundation of digital creativity. 
            I engineer resilience into systems so that brands can scale without friction.
          </p>
        </div>
      </div>

      {/* Bottom Left: Metadata status */}
      <div className="absolute bottom-12 left-12 z-20">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-white/50 uppercase">
              STATUS: OPTIMAL
            </span>
          </div>
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase">
            {"//"} {data.meta.location.toUpperCase()} {"//"} CV_EST.2014
          </span>
        </div>
      </div>

      {/* Bottom Right: Scroll to Discover */}
      <div className="absolute bottom-12 right-12 z-20">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-end gap-3"
        >
          <span className="font-mono text-[9px] tracking-[0.4em] text-white/40 uppercase">
            SCROLL TO EXPLORE
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
