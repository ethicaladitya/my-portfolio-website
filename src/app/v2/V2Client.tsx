"use client";

import { useState } from "react";
import NavbarV2 from "@/components/v2/NavbarV2";
import HeroV2 from "@/components/v2/HeroV2";
import WhatIDoV2 from "@/components/v2/WhatIDoV2";
import LiveStatsV2 from "@/components/v2/LiveStatsV2";
import TimelineV2 from "@/components/v2/TimelineV2";
import ExperienceV2 from "@/components/v2/ExperienceV2";
import CommunityV2 from "@/components/v2/CommunityV2";
import BlogV2 from "@/components/v2/BlogV2";
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

interface V2ClientProps {
  data: ContentData;
}

export default function V2Client({ data }: V2ClientProps) {
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const portfolioUrl =
    typeof window !== "undefined"
      ? window.location.origin + "/v2"
      : "https://theadityashah.com/v2";

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-white selection:text-black min-h-screen">
      <NavbarV2
        onToggleRecruiter={() => setRecruiterMode((v) => !v)}
      />

      <main>
        <HeroV2 data={data} />

        <div id="services">
          <WhatIDoV2 items={data.whatIDo} />
        </div>

        <LiveStatsV2 stats={data.stats} />

        <div id="journey">
          <TimelineV2 items={data.timeline} />
          <ExperienceV2 items={data.experience} />
        </div>

        <div id="impact">
          <CommunityV2 items={data.community} />
        </div>

        <BlogV2 posts={data.blog} />

        {/* Global technical UI elements */}
        <div className="fixed bottom-12 right-12 z-50 pointer-events-none opacity-40 hidden lg:block">
           <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-white/50">BUILD_HASH: 0xFD72A9</span>
        </div>

        <Terminal />
      </main>

      {/* Footer V2 (Inline) */}
      <footer className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
        <div className="section-container relative z-10 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Aditya<span className="text-white/20">.</span></h2>
            <p className="text-white/80 text-xs max-w-sm leading-relaxed font-medium tracking-tight">
              Engineering high-performance infrastructure and automated governance for the decentralized web.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "GITHUB", href: data.meta.github },
              { label: "LINKEDIN", href: data.meta.linkedin },
              { label: "EMAIL", href: `mailto:${data.meta.email}` },
              { label: "BLOG", href: "https://adityashah.blog" },
            ].map((link) => (
              <a 
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-[0.3em] text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

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
    </div>
  );
}
