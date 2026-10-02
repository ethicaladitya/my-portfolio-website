import type { Metadata } from "next";
import { data } from "@/lib/content";

export const metadata: Metadata = { title: "Why hire Aditya Shah", description: "A concise, printable overview of Aditya Shah's technical leadership, WordPress infrastructure, DevOps, incident response, automation, and community experience.", alternates: { canonical: "/recruiter/" }, robots: { index: true, follow: true } };

export default function RecruiterPage() {
  return <main className="recruiter-page">
    <nav className="recruiter-toolbar no-print" aria-label="Recruiter view controls"><a href="/">← Back to portfolio</a><button type="button" data-print-control>Print / save PDF</button></nav>
    <article className="resume-sheet">
      <header className="resume-header"><div><p className="eyebrow">Why hire Aditya</p><h1>{data.meta.name}</h1><p className="resume-title">{data.meta.title}</p></div><address><a href={`mailto:${data.meta.email}`}>{data.meta.email}</a><a href={data.meta.linkedin}>linkedin.com/in/ethicaladitya</a><a href={data.meta.github}>github.com/ethicaladitya</a><span>{data.meta.location}</span></address></header>
      <section className="resume-summary"><h2>Technical leadership with production depth</h2><p>{data.summary}</p></section>
      <section className="resume-section"><h2>Strongest role fit</h2><ul className="role-fit">{data.roleFit.map((role) => <li key={role}>{role}</li>)}</ul></section>
      <div className="resume-columns"><section className="resume-section"><h2>Experience</h2>{data.experience.map((experience) => <article className="resume-job" key={experience.company + experience.period}><header><div><h3>{experience.role}</h3><p>{experience.company}</p></div><span>{experience.period}</span></header><ul>{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></article>)}</section>
      <aside><section className="resume-section"><h2>Core strengths</h2>{data.skills.map((group) => <div className="resume-skills" key={group.category}><h3>{group.category}</h3><p>{group.items.join(" · ")}</p></div>)}</section><section className="resume-section"><h2>Proof points</h2><ul className="resume-proof">{data.stats.map((stat) => <li key={stat.label}><strong>{stat.value.toLocaleString("en-IN")}{stat.suffix}</strong><span>{stat.label}</span></li>)}</ul></section></aside></div>
      <section className="resume-section resume-impact"><h2>Selected impact</h2><div>{data.tools.map((tool) => <article key={tool.name}><h3><a href={tool.url}>{tool.shortName} ↗</a></h3><p>{tool.description}</p></article>)}</div></section>
      <section className="resume-section resume-community"><h2>Community & open source</h2><p>WordPress Bhopal organizer since 2015 · 100+ community events · WordCamp speaker and organizer · WordCamp Bhopal 2025 · WordCamp Asia 2026 operations · WP Build Tour reached 1,500+ students · WP-CLI and WordPress.org contributor history · GDG / GDG Cloud Bhopal involvement.</p></section>
    </article>
    <script dangerouslySetInnerHTML={{ __html: `document.querySelector('[data-print-control]').addEventListener('click',function(){window.print()})` }} />
  </main>;
}
