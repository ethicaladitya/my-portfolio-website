"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  recruiterMode: boolean;
  onToggleRecruiter: () => void;
}

const navLinks = [
  { label: "What I Do", href: "#what-i-do" },
  { label: "Timeline", href: "#timeline" },
  { label: "Experience", href: "#experience" },
  { label: "Community", href: "#community" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar({ recruiterMode, onToggleRecruiter }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 20);
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-0.5 z-[100] bg-primary transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-text-secondary/10"
            : "bg-transparent"
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#home"
              className="text-xl font-bold gradient-text-static hover:opacity-80 transition-opacity"
            >
              Aditya<span className="text-primary">.</span>
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-bold text-text-secondary hover:text-text-primary transition-colors animated-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              {/* Dark mode toggle */}
              <button
                id="dark-mode-toggle"
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/5 transition-all duration-300 active:scale-90 border border-transparent hover:border-text-secondary/10"
              >
                {darkMode ? (
                  <motion.svg 
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    className="w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </motion.svg>
                ) : (
                  <motion.svg 
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    className="w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </motion.svg>
                )}
              </button>

              {/* Recruiter mode toggle */}
              <button
                id="recruiter-mode-btn"
                onClick={onToggleRecruiter}
                className={`hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-350 ease-premium active:scale-95 ${
                  recruiterMode
                    ? "bg-primary text-background shadow-glow"
                    : "border border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${recruiterMode ? "bg-[#22c55e] animate-pulse" : "bg-primary/30"}`} />
                {recruiterMode ? "Live Resume" : "Hire Me"}
              </button>

              {/* Mobile hamburger */}
              <button
                id="mobile-menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden bg-background/98 backdrop-blur-2xl border-t border-text-secondary/10 shadow-huge"
            >
              <div className="section-container py-8 flex flex-col gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-lg font-bold text-text-secondary hover:text-primary transition-all flex items-center justify-between group"
                  >
                    {link.label}
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
                <div className="pt-4 border-t border-text-secondary/5">
                  <button
                    onClick={() => { onToggleRecruiter(); setMenuOpen(false); }}
                    className="w-full btn-primary text-sm justify-center py-4"
                  >
                    {recruiterMode ? "Exit Recruiter Mode" : "Recruiter Mode"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
