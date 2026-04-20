"use client";

import { motion } from "framer-motion";
import TextReveal from "./TextReveal";

interface SectionHeaderV2Props {
  title: string;
  subtitle?: string;
  metadata?: string;
  align?: "left" | "center";
}

export default function SectionHeaderV2({ title, subtitle, metadata, align = "left" }: SectionHeaderV2Props) {
  const isCenter = align === "center";

  return (
    <div className={`mb-20 ${isCenter ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, x: isCenter ? 0 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-3"
      >
        <div className={`flex items-center gap-4 ${isCenter ? "justify-center" : ""}`}>
          <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase">
            {metadata || "////// SYSTEM_STORY"}
          </span>
          <div className="h-[1px] w-12 bg-primary/20" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-text-primary">
          <TextReveal text={title} />
        </h2>
        
        {subtitle && (
          <p className="text-sm text-text-secondary font-medium tracking-tight mt-2 max-w-2xl opacity-70">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
