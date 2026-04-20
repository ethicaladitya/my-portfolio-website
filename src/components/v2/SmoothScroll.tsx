"use client";

import { useLayoutEffect } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    // any manual setup here if needed
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
