import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Noise from "@/components/Noise";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aditya Shah | V2 Experiment",
  description: "An Igloo-inspired, atmospheric engineering portfolio experiment.",
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans selection:bg-primary/30 selection:text-primary-foreground`}>
      <Noise />
      {children}
    </div>
  );
}
