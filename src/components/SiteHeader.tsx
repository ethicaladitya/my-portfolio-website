"use client";
import { useEffect, useState } from "react";
const links = [["Work", "#impact"], ["Capabilities", "#capabilities"], ["Experience", "#experience"], ["Community", "#community"], ["Writing", "#writing"]];
export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => { let nextDark = false; try { nextDark = localStorage.getItem("portfolio-theme") === "dark"; } catch {} setDark(nextDark); document.documentElement.dataset.theme = nextDark ? "dark" : "light"; }, []);
  function toggleTheme() { const next = !dark; setDark(next); document.documentElement.dataset.theme = next ? "dark" : "light"; try { localStorage.setItem("portfolio-theme", next ? "dark" : "light"); } catch {} }
  return <header className="site-header"><div className="section-shell nav-shell"><a className="brand" href="/#home" aria-label="Aditya Shah, home">AS<span>.</span></a><nav id="main-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary navigation">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="recruiter-link" href="/recruiter/">Recruiter view</a></nav><div className="nav-actions"><button className="icon-button" type="button" onClick={toggleTheme} aria-label={`Use ${dark ? "light" : "dark"} theme`}><svg aria-hidden="true" viewBox="0 0 24 24">{dark ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" />}</svg></button><button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button></div></div></header>;
}
