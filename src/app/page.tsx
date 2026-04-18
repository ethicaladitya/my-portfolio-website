"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatIDo from "@/components/WhatIDo";
import LiveStats from "@/components/LiveStats";
import Timeline from "@/components/Timeline";
import Experience from "@/components/Experience";
import Community from "@/components/Community";
import Blog from "@/components/Blog";
import Terminal from "@/components/Terminal";
import RecruiterMode from "@/components/RecruiterMode";
import QRModal from "@/components/QRModal";

interface MetaData {
  name: string;
  title: string;
  company: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
  location: string;
  tagline: string;
}

interface ContentData {
  meta: MetaData;
  hero: { greeting: string; roles: string[]; description: string };
  stats: { value: number; suffix: string; label: string; icon: string }[];
  whatIDo: { icon: string; title: string; description: string; tags: string[] }[];
  timeline: { year: string; title: string; company: string; description: string; tags: string[] }[];
  experience: { role: string; company: string; period: string; type: string; remote: boolean; highlights: string[]; stack: string[] }[];
  community: { event: string; role: string; years: string; impact: string; impactLabel: string; description: string; icon: string }[];
  blog: { title: string; slug: string; category: string; excerpt: string; readTime: string; date: string; gradient: string }[];
}

export default function Home() {
  const [data, setData] = useState<ContentData | null>(null);
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const portfolioUrl =
    typeof window !== "undefined"
      ? window.location.origin + window.location.pathname
      : "https://theadityashah.com";

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    fetch(`${base}/content.json`)
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background transition-colors">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-text-secondary text-sm font-medium">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar
        recruiterMode={recruiterMode}
        onToggleRecruiter={() => setRecruiterMode((v) => !v)}
      />

      <main>
        <Hero data={data} onOpenQR={() => setQrOpen(true)} />

        <WhatIDo items={data.whatIDo} />

        <LiveStats stats={data.stats} />

        <Timeline items={data.timeline} />

        <Experience items={data.experience} />

        <Community items={data.community} />

        <Blog posts={data.blog} />

        <Terminal />
      </main>

      <Footer meta={data.meta} />

      {/* Modals */}
      <RecruiterMode
        isOpen={recruiterMode}
        onClose={() => setRecruiterMode(false)}
        data={data}
      />
      <QRModal
        isOpen={qrOpen}
        onClose={() => setQrOpen(false)}
        url={portfolioUrl}
      />
    </>
  );
}

// Inline Footer to avoid circular import
function Footer({ meta }: { meta: MetaData }) {
  return (
    <footer className="relative bg-background border-t border-text-secondary/10 overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-primary via-accent to-accent-alt" />
      <div className="section-container py-12">
        <div className="flex flex-col items-center text-center gap-5">
          <div className="text-2xl font-black text-text-primary">
            Aditya<span className="text-primary">.</span>
          </div>
          <p className="text-text-secondary text-sm max-w-sm">
            Building the infrastructure that powers the web — one WordPress site at a time.
          </p>
          <div className="flex items-center gap-3">
            {[
              { href: meta.github, label: "GitHub" },
              { href: meta.linkedin, label: "LinkedIn" },
              { href: `mailto:${meta.email}`, label: "Email" },
              { href: meta.website, label: "Website" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer me"
                className="text-xs font-medium text-text-secondary hover:text-primary transition-colors border border-text-secondary/20 hover:border-primary/50 px-3 py-1.5 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-text-secondary/50 text-xs">
            © {new Date().getFullYear()} Aditya Shah ·
          </p>
        </div>
      </div>
    </footer>
  );
}
