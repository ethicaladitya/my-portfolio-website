"use client";

import { motion } from "framer-motion";
import SectionHeaderV2 from "./SectionHeaderV2";

interface CommunityItem {
  event: string;
  role: string;
  years: string;
  impact: string;
  impactLabel: string;
  description: string;
}

export default function CommunityV2({ items }: { items: CommunityItem[] }) {
  return (
    <section id="community" className="py-32 bg-[#050505] relative overflow-hidden border-t border-white/5">
      <div className="section-container relative z-10">
        <SectionHeaderV2 
          metadata="// ECOSYSTEM_IMPACT"
          title="Community Logic"
          subtitle="Contributing to the global open-source and professional infrastructure through leadership and mentorship."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className="p-8 border-r border-b border-white/10 group hover:bg-white/[0.02] transition-all"
            >
              <div className="font-mono text-[9px] tracking-[0.3em] text-white/50 uppercase mb-8">
                ENTRY_ID: {i + 1}
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-black text-white tracking-tighter block mb-1">
                  {item.impact}
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-primary uppercase">
                  {item.impactLabel}
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  {item.event}
                </h3>
                <p className="text-white/70 text-[11px] leading-relaxed font-medium tracking-tight">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <span className="font-mono text-[9px] tracking-[0.2em] text-white/50 uppercase">
                   {item.role} {"//"} {item.years}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
