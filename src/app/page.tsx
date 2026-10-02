import BlogFeed from "@/components/BlogFeed";
import CapabilityMap from "@/components/CapabilityMap";
import SharePortfolio from "@/components/SharePortfolio";
import SiteHeader from "@/components/SiteHeader";
import { data } from "@/lib/content";

const Arrow = () => <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to main content</a><SiteHeader />
    <main id="main">
      <section className="hero section-shell" id="home" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> Hosting Support Manager / DevOps Engineer</p><h1 id="hero-title">Technical leadership.<br /><span>Production depth.</span></h1><p className="hero-lede">I lead the people and solve the systems behind reliable WordPress hosting.</p><p className="hero-summary">At WPMU DEV, I manage a distributed support team while staying hands-on with infrastructure, incidents, security investigations, automation, and the customer experience.</p><div className="hero-actions"><a className="button button-primary" href="#impact">See selected impact <Arrow /></a><a className="text-link" href="/recruiter/">Why hire Aditya <Arrow /></a><SharePortfolio /></div></div>
        <CapabilityMap />
        <div className="hero-foot"><p>Based in Bhopal, India <span>·</span> Working with distributed teams</p><a href="#capabilities">Scroll to explore <span aria-hidden="true">↓</span></a></div>
      </section>

      <section className="proof-strip" aria-label="Career proof points"><div className="section-shell proof-grid">{data.stats.map((stat) => <article key={stat.label}><strong>{stat.value.toLocaleString("en-IN")}{stat.suffix}</strong><h2>{stat.label}</h2><p>{stat.detail}</p></article>)}</div></section>

      <section className="section section-shell" id="capabilities">
        <header className="section-intro split-intro"><div><p className="eyebrow">Where I operate</p><h2>Customers. Infrastructure.<br />Everything between.</h2></div><p>My work starts where a customer-visible problem meets a production system—and often continues into the team, process, or tool that prevents it happening again.</p></header>
        <div className="capability-list">{data.whatIDo.map((item, index) => <article key={item.title} className="capability-row"><p className="row-index">0{index + 1}</p><div><h3>{item.title}</h3><p>{item.description}</p></div><ul>{item.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></article>)}</div>
      </section>

      <section className="section impact-section" id="impact"><div className="section-shell">
        <header className="section-intro split-intro"><div><p className="eyebrow">Selected impact</p><h2>Work made visible.</h2></div><p>Public examples of how I investigate, automate, document, and share operational work. Employer systems and confidential details stay private.</p></header>
        <div className="impact-grid">{data.tools.map((tool) => <a className={`impact-card impact-${tool.visual}`} href={tool.url} target="_blank" rel="me noopener noreferrer" key={tool.name}><div className="impact-visual" aria-hidden="true"><span className="visual-label">{tool.shortName}</span>{tool.visual === "logs" && <pre>200  GET  /wp-json/   184ms<br />404  GET  /asset.js    12ms<br /><b>500  POST /admin    932ms</b></pre>}{tool.visual === "security" && <div className="file-scan"><i /><i /><i /><i /></div>}{tool.visual === "automation" && <div className="flow"><i>01</i><span /><i>AI</i><span /><i>OK</i></div>}</div><div className="impact-copy"><p className="eyebrow">{tool.category}</p><h3>{tool.name}</h3><p>{tool.description}</p><ul>{tool.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><span className="card-link">{tool.label} <Arrow /></span></div></a>)}</div>
      </div></section>

      <section className="section section-shell" id="experience">
        <header className="section-intro split-intro"><div><p className="eyebrow">Experience</p><h2>Leadership without<br />leaving the terminal.</h2></div><p>My current scope joins team leadership, technical customer experience, and production operations. Earlier roles built the WordPress and WooCommerce foundation underneath it.</p></header>
        <div className="experience-list">{data.experience.map((experience, index) => <article key={`${experience.company}-${experience.period}`} className="experience-row"><div className="experience-meta"><p>0{index + 1}</p><span>{experience.period}</span></div><div className="experience-title"><h3>{experience.role}</h3><p>{experience.company} · {experience.remote ? "Remote" : experience.type}</p></div><ul>{experience.highlights.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <section className="section community-section" id="community"><div className="section-shell community-layout"><header className="section-intro"><p className="eyebrow">Community & open source</p><h2>Technical work grows when it is shared.</h2><p>WordPress has been part of my career since 2014. Organizing, speaking, teaching, and contributing keep me connected to the people behind the platform.</p><a className="text-link" href="https://profiles.wordpress.org/ethicaladitya/" target="_blank" rel="me noopener noreferrer">View WordPress.org profile <Arrow /></a></header><div className="community-grid">{data.community.map((item) => <article key={item.event}><p className="eyebrow">{item.years}</p><h3>{item.event}</h3><strong>{item.role}</strong><p>{item.description}</p></article>)}<article className="community-open-source"><p className="eyebrow">Open source</p><h3>WP-CLI & WordPress.org</h3><strong>Contributor history</strong><p>Contributions across WP-CLI and the wider WordPress ecosystem.</p></article></div></div></section>

      <BlogFeed fallback={data.blog} />

      <section className="contact-section" id="contact"><div className="section-shell contact-layout"><p className="eyebrow">Let’s talk</p><h2>Need someone who can lead the room and read the logs?</h2><p>I’m open to conversations about technical support leadership, customer engineering, DevOps, WordPress infrastructure, platform operations, and technical community roles.</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${data.meta.email}`}>Email Aditya <Arrow /></a><a className="text-link" href={data.meta.linkedin} target="_blank" rel="me noopener noreferrer">Connect on LinkedIn <Arrow /></a></div></div></section>
    </main>
    <footer className="site-footer"><div className="section-shell"><a className="footer-mark" href="#home">AS<span>.</span></a><p>Customers · Infrastructure · WordPress · Operations</p><nav aria-label="Social links"><a href={data.meta.github} rel="me">GitHub</a><a href={data.meta.linkedin} rel="me">LinkedIn</a><a href="https://adityashah.blog/" rel="me">Blog</a></nav><p>© {new Date().getFullYear()} Aditya Shah</p></div></footer>
  </>;
}
