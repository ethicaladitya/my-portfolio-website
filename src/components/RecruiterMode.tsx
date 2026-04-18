"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeData {
  meta: {
    name: string;
    title: string;
    company: string;
    email: string;
    website: string;
    github: string;
    linkedin: string;
    location: string;
  };
  experience: Array<{
    role: string;
    company: string;
    period: string;
    highlights: string[];
    stack: string[];
  }>;
  community: Array<{
    event: string;
    role: string;
    years: string;
    impact: string;
    impactLabel: string;
  }>;
}

export default function RecruiterMode({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-background overflow-y-auto"
        >
          {/* Top bar */}
          <div className="no-print sticky top-0 bg-background border-b border-text-secondary/10 px-6 py-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="text-sm font-semibold text-text-primary">Recruiter Mode — Clean Resume View</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                id="recruiter-print-btn"
                onClick={() => window.print()}
                className="btn-secondary text-sm py-2 px-4"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print / Save PDF
              </button>
              <button
                id="recruiter-close-btn"
                onClick={onClose}
                className="text-sm font-semibold text-red-500 hover:text-red-700 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
              >
                Exit
              </button>
            </div>
          </div>

          {/* Resume content */}
          <div className="max-w-[820px] mx-auto px-8 py-10 space-y-8">

            {/* Header */}
            <header className="border-b border-text-secondary/10 pb-6">
              <h1 className="text-4xl font-black text-text-primary tracking-tight">{data.meta.name}</h1>
              <p className="text-xl font-semibold text-primary mt-1">{data.meta.title}</p>
              <p className="text-text-secondary mt-1">{data.meta.company}</p>

              <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 text-sm text-text-secondary/70">
                <a href={`mailto:${data.meta.email}`} className="hover:text-primary transition-colors">
                  {data.meta.email}
                </a>
                <a href={data.meta.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  theadityashah.com
                </a>
                <a href={data.meta.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  LinkedIn
                </a>
                <a href={data.meta.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  GitHub
                </a>
                <span>{data.meta.location}</span>
              </div>
            </header>

            {/* Summary */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Professional Summary</h2>
              <p className="text-text-primary leading-relaxed text-sm">
                Engineering manager and DevOps practitioner with 10+ years in the WordPress hosting ecosystem.
                Currently leading the Hosting Support division at WPMU DEV — managing distributed teams,
                owning incident response for large-scale production outages, performing malware cleanup and
                security hardening on live sites, and building automation that scales ops workflows. Active
                community contributor: WordCamp speaker, GDG DevFest presenter, and WordPress workshop facilitator.
              </p>
            </section>

            {/* Core Skills */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Core Competencies</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "WordPress Infrastructure",
                  "Linux Server Administration",
                  "Security Hardening",
                  "Malware Cleanup",
                  "Incident Response",
                  "PHP / MySQL Debugging",
                  "Nginx / Apache",
                  "Ansible Automation",
                  "Team Leadership",
                  "Hiring & Mentoring",
                  "Docker",
                  "Bash Scripting",
                  "Performance Optimization",
                  "Public Speaking",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-3 py-1 bg-primary/5 border border-primary/20 text-primary rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Work Experience</h2>
              {data.experience.map((exp, i) => (
                <div key={i} className="mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                    <div>
                      <h3 className="text-base font-bold text-text-primary">{exp.role}</h3>
                      <p className="text-sm font-medium text-text-secondary">{exp.company}</p>
                    </div>
                    <span className="text-sm text-text-secondary/60 mt-1 sm:mt-0">{exp.period}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.stack.map((t) => (
                      <span key={t} className="text-xs text-text-secondary/60 border border-text-secondary/20 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Community */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Community & Speaking</h2>
              <div className="space-y-3">
                {data.community.map((c, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm">
                    <div>
                      <span className="font-semibold text-text-primary">{c.event}</span>
                      <span className="text-text-secondary ml-2">— {c.role}</span>
                    </div>
                    <div className="text-text-secondary/60 text-xs mt-1 sm:mt-0">
                      {c.years} · {c.impact} {c.impactLabel}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Footer note */}
            <div className="text-center pt-4 pb-2">
              <p className="text-xs text-text-secondary/60">
                Generated from{" "}
                <a href="https://theadityashah.com" className="text-primary hover:underline">
                  theadityashah.com
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
