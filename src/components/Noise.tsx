"use client";

import { motion } from "framer-motion";

export default function Noise() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.05 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
    >
      <div 
        className="absolute inset-[-200%] bg-noise-pattern opacity-[0.4] animate-noise-slow"
      />
    </motion.div>
  );
}
