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
        className="absolute inset-[-200%] bg-[url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\"/%3E%3C/svg%3E')] opacity-[0.4] animate-noise"
      />
      <style jsx>{`
        @keyframes noise {
          0% { transform: translate(0,0) }
          10% { transform: translate(-5%,-5%) }
          20% { transform: translate(-10%,5%) }
          30% { transform: translate(5%,-10%) }
          40% { transform: translate(-5%,15%) }
          50% { transform: translate(-10%,5%) }
          60% { transform: translate(15%,0) }
          70% { transform: translate(0,10%) }
          80% { transform: translate(-15%,0) }
          90% { transform: translate(10%,5%) }
          100% { transform: translate(5%,0) }
        }
        .animate-noise {
          animation: noise 1s steps(2) infinite;
        }
      `}</style>
    </motion.div>
  );
}
