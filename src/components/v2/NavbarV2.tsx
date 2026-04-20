"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

interface NavbarV2Props {
  onToggleRecruiter?: () => void;
}

export default function NavbarV2({ onToggleRecruiter }: NavbarV2Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-700 ${scrolled ? "py-6 bg-black/80 backdrop-blur-xl border-b border-white/5" : "py-10 bg-transparent"}`}>
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <span className="text-xl font-black tracking-tighter text-white">ADITYA<span className="text-white/20">.</span></span>
          <div className="h-[1px] w-8 bg-white/20 hidden sm:block" />
          <span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase hidden sm:block">SYSTEM_v2.0</span>
        </motion.div>

        {/* Links */}
        <div className="flex items-center gap-10">
          <div className="hidden md:flex items-center gap-8">
            {["Services", "Journey", "Impact"].map((link) => (
              <Magnetic key={link}>
                <a 
                  href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                  className="font-mono text-[9px] tracking-[0.4em] text-white/40 uppercase hover:text-white transition-colors py-2 block"
                >
                  {link}
                </a>
              </Magnetic>
            ))}
          </div>

          <Magnetic>
            <button 
              onClick={onToggleRecruiter}
              className="flex items-center gap-3 px-5 py-2.5 border border-white/10 hover:border-white/40 transition-all rounded-sm group font-sans"
            >
              <span className="font-mono text-[9px] tracking-[0.3em] text-white/60 uppercase group-hover:text-white">ACCESS_CORE</span>
              <div className="w-1.5 h-1.5 bg-white/20 group-hover:bg-white transition-colors" />
            </button>
          </Magnetic>
        </div>
      </div>
    </nav>
  );
}
