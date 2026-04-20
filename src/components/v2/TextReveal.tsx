"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        ease: "easeOut" as any,
        duration: 0.8
      }
    }
  };

  const wrapperVariants = {
    hidden: { opacity: 1 },
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay
      }
    }
  };

  const words = text.split(" ");

  return (
    <motion.span
      ref={ref}
      variants={wrapperVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex mr-[0.25em]">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
