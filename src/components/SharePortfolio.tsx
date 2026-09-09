"use client";

import { useEffect, useRef, useState } from "react";
export default function SharePortfolio() {
  const dialog = useRef<HTMLDialogElement>(null); const canvas = useRef<HTMLCanvasElement>(null); const [copied, setCopied] = useState(false); const [open, setOpen] = useState(false);
  useEffect(() => { if (!open || !canvas.current) return; import("qrcode").then((QRCode) => QRCode.toCanvas(canvas.current, "https://theadityashah.com/", { width: 208, margin: 1, color: { dark: "#08110f", light: "#eef8f2" } })); }, [open]);
  function show() { setOpen(true); dialog.current?.showModal(); } function close() { setOpen(false); dialog.current?.close(); }
  async function copy() { await navigator.clipboard.writeText("https://theadityashah.com/"); setCopied(true); window.setTimeout(() => setCopied(false), 2000); }
  return <><button className="share-button" type="button" onClick={show}>Share portfolio <span aria-hidden="true">⌁</span></button><dialog className="share-dialog" ref={dialog} onClose={() => setOpen(false)} onClick={(event) => { if (event.target === dialog.current) close(); }}><button className="dialog-close" type="button" onClick={close} aria-label="Close share dialog">×</button><p className="eyebrow">Quick share</p><h2>Take the portfolio with you.</h2><p>Scan the code or copy the direct link.</p><div className="qr-wrap"><canvas ref={canvas} aria-label="QR code for theadityashah.com" /></div><button className="button button-primary" type="button" onClick={copy}>{copied ? "Link copied" : "Copy portfolio link"}</button></dialog></>;
}
