"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  whoami     → Who is Aditya Shah",
    "  skills     → Core technical skills",
    "  stack      → Tech stack breakdown",
    "  contact    → How to reach me",
    "  clear      → Clear terminal",
  ],
  whoami: [
    "Aditya Shah",
    "Role    : Hosting Support Manager & DevOps Engineer",
    "Company : WPMU DEV (Incsub LLC)",
    "Location: India 🇮🇳",
    "Focus   : WordPress infrastructure at scale",
    "          Production debugging & incident response",
    "          Security hardening & malware cleanup",
    "          Team leadership & automation",
  ],
  skills: [
    "Core Skills:",
    "  [★★★★★] WordPress Infrastructure & Hosting",
    "  [★★★★★] Linux Server Administration",
    "  [★★★★★] Security Hardening & Malware Cleanup",
    "  [★★★★☆] Ansible & DevOps Automation",
    "  [★★★★☆] MySQL Performance Tuning",
    "  [★★★★☆] Nginx / Apache Configuration",
    "  [★★★★☆] Team Leadership & Mentoring",
    "  [★★★☆☆] Docker & Container Ops",
  ],
  stack: [
    "Tech Stack:",
    "  OS       → Linux (Ubuntu, CentOS, Debian)",
    "  Web      → Nginx, Apache, PHP-FPM",
    "  DB       → MySQL, MariaDB",
    "  CMS      → WordPress (core contributor level)",
    "  Infra    → Ansible, Bash, Docker",
    "  Security → ModSecurity, fail2ban, WPScan",
    "  Git      → GitHub, GitLab",
    "  Monitor  → Grafana, custom dashboards",
  ],
  contact: [
    "Get in touch:",
    "  Email   → hello@theadityashah.com",
    "  GitHub  → github.com/adityashah30",
    "  LinkedIn→ linkedin.com/in/adityashah30",
    "  Web     → theadityashah.com",
    "",
    "Response time: Usually within 24h ⚡",
  ],
};

interface HistoryLine {
  type: "input" | "output" | "error";
  text: string;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryLine[]>([
    { type: "output", text: "Welcome to Aditya's terminal. Type 'help' to get started." },
    { type: "output", text: "" },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory: HistoryLine[] = [
      ...history,
      { type: "input", text: `$ ${cmd}` },
    ];

    if (trimmed === "clear") {
      setHistory([{ type: "output", text: "Terminal cleared. Type 'help' for commands." }]);
      setInput("");
      return;
    }

    const response = COMMANDS[trimmed];
    if (response) {
      response.forEach((line) => {
        newHistory.push({ type: "output", text: line });
      });
    } else if (trimmed === "") {
      // do nothing
    } else {
      newHistory.push({ type: "error", text: `Command not found: ${trimmed}. Try 'help'.` });
    }

    setHistory(newHistory);
    setCmdHistory((prev) => [trimmed, ...prev].slice(0, 20));
    setCmdIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      runCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdIndex + 1, cmdHistory.length - 1);
      setCmdIndex(next);
      setInput(cmdHistory[next] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const prev = Math.max(cmdIndex - 1, -1);
      setCmdIndex(prev);
      setInput(prev === -1 ? "" : cmdHistory[prev] || "");
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-950 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-10" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-emerald-600 tracking-widest uppercase mb-3 block">
            Easter Egg
          </span>
          <h2 className="section-heading">
            <span className="gradient-text">Interactive</span> Terminal
          </h2>
          <p className="section-subheading dark:text-gray-400 mx-auto mt-4">
            For the engineers who prefer a CLI. Type <code className="text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded text-sm">help</code> to begin.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Terminal window */}
          <div
            className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800 cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Title bar */}
            <div className="bg-gray-900 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-3 text-gray-400 text-xs font-mono">
                aditya@portfolio ~ %
              </span>
            </div>

            {/* Terminal body */}
            <div className="bg-gray-950 p-5 h-72 overflow-y-auto font-mono text-sm">
              {history.map((line, i) => (
                <div
                  key={i}
                  className={`leading-relaxed whitespace-pre-wrap ${
                    line.type === "input"
                      ? "text-green-400"
                      : line.type === "error"
                      ? "text-red-400"
                      : "text-gray-300"
                  }`}
                >
                  {line.text}
                </div>
              ))}

              {/* Input line */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-green-400">$</span>
                <input
                  ref={inputRef}
                  id="terminal-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-green-300 outline-none caret-green-400 text-sm font-mono"
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
                <span className="w-2 h-4 bg-green-400 animate-pulse" />
              </div>
              <div ref={bottomRef} />
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4 font-mono">
            Try: whoami · skills · stack · contact · clear
          </p>
        </motion.div>
      </div>
    </section>
  );
}
