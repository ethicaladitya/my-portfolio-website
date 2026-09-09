"use client";

import { useEffect, useState } from "react";

const links = [["Capabilities", "#capabilities"], ["Impact", "#impact"], ["Experience", "#experience"], ["Community", "#community"], ["Writing", "#writing"]];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-theme");
    const nextDark = stored ? stored === "dark" : true;
    setDark(nextDark); document.documentElement.dataset.theme = nextDark ? "dark" : "light";
  }, []);
  function toggleTheme() { const next = !dark; setDark(next); document.documentElement.dataset.theme = next ? "dark" : "light"; window.localStorage.setItem("portfolio-theme", next ? "dark" : "light"); }
  return <header className="site-header"><div className="section-shell nav-shell">
    <a className="brand" href="#home" aria-label="Aditya Shah, home">AS<span>.</span></a>
    <nav id="main-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="recruiter-link" href="/recruiter/">Recruiter view <span aria-hidden="true">↗</span></a></nav>
    <div className="nav-actions"><button className="icon-button" type="button" onClick={toggleTheme} aria-label={`Use ${dark ? "light" : "dark"} theme`}><span aria-hidden="true">{dark ? "◐" : "◑"}</span></button><button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button></div>
  </div></header>;
}
