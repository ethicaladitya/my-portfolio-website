"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export default function QRModal({ isOpen, onClose, url }: QRModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    // Dynamically import qrcode
    import("qrcode").then((QRCode) => {
      QRCode.toCanvas(canvasRef.current!, url, {
        width: 240,
        margin: 2,
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
        errorCorrectionLevel: "M",
      });
    });
  }, [isOpen, url]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-background rounded-3xl shadow-2xl p-8 max-w-sm w-full border border-text-secondary/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              id="qr-modal-close"
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-all"
              aria-label="Close QR modal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent items-center justify-center text-white mb-4 shadow-glow">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-text-primary">Share My Portfolio</h2>
              <p className="text-sm text-text-secondary mt-1">Scan with any camera to open</p>
            </div>

            {/* QR Canvas */}
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
                <canvas ref={canvasRef} id="qr-canvas" className="rounded-xl" />
              </div>
            </div>

            {/* URL display */}
            <div className="bg-background-secondary rounded-xl px-4 py-3 text-center border border-text-secondary/10">
              <p className="text-xs text-text-secondary/60 mb-1 uppercase tracking-widest font-medium">Portfolio URL</p>
              <p className="text-sm font-mono text-text-primary break-all">{url}</p>
            </div>

            {/* Share button */}
            <button
              className="mt-4 w-full btn-primary justify-center"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "Aditya Shah — Portfolio", url });
                } else {
                  navigator.clipboard.writeText(url);
                  alert("URL copied to clipboard!");
                }
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Portfolio
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
