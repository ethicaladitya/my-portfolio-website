"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Hide on small screens where cursor doesn't matter
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Look for clickable elements or explicit data attributes
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor='hover']")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Remove cursor on mobile
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) return null;

  return (
    <>
      {/* Primary Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isClicking ? 0.8 : isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      
      {/* Trailing Circle */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/40 rounded-full pointer-events-none z-[9998] flex items-center justify-center mix-blend-difference"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isClicking ? 0.9 : isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
          mixBlendMode: isHovering ? "difference" : "normal",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      >
        {isHovering && (
          <span className="text-[6px] font-mono font-bold text-black uppercase tracking-wider absolute">
            Tap
          </span>
        )}
      </motion.div>
    </>
  );
}
