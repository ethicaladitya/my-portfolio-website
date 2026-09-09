import type { Metadata } from "next";
import { data } from "@/lib/content";

export const metadata: Metadata = { title: "Hire Aditya Shah — DevOps, SysAdmin & AI Engineer", description: "A concise, printable overview of Aditya Shah's DevOps engineering, Linux system administration, AI engineering, WordPress infrastructure, incident response, automation, leadership, and community experience.", alternates: { canonical: "/recruiter/" }, robots: { index: true, follow: true } };

export default function RecruiterPage() {
  return <main className="recruiter-page">
    <nav className="recruiter-toolbar no-print" aria-label="Recruiter view controls"><a href="/">← Back to portfolio</a><button type="button" data-print-control>Print / save PDF</button></nav>
    <article className="resume-sheet">
      <header className="resume-header"><div><p className="eyebrow">Why hire Aditya</p><h1>{data.meta.name}</h1><p className="resume-title">{data.meta.title}</p></div><address><a href={`mailto:${data.meta.email}`}>{data.meta.email}</a><a href={data.meta.linkedin}>linkedin.com/in/ethicaladitya</a><a href={data.meta.github}>github.com/ethicaladitya</a><span>{data.meta.location}</span></address></header>
      <section className="resume-summary"><h2>Technical leadership with production depth</h2><p>{data.summary}</p></section>
      <section className="resume-section"><h2>Strongest role fit</h2><ul className="role-fit">{data.roleFit.map((role) => <li key={role}>{role}</li>)}</ul></section>
      <section className="resume-section resume-advocacy"><h2>Community & developer advocacy</h2><div><article><h3>Community leadership</h3><p>Founded the WordPress Bhopal Meetup in 2015; organized 100+ meetups and community events.</p></article><article><h3>Speaking</h3><p>Spoke at {data.speaking.events.join(", ")} on performance, hosting infrastructure, and WP-CLI.</p></article><article><h3>Developer education</h3><p>Reached 1,500+ students through hands-on WP Build Tour workshops on WordPress and open source.</p></article><article><h3>Open source & events</h3><p>WP-CLI contributor, WordCamp organizer, and WordCamp Asia 2026 operations team member.</p></article></div></section>
      <div className="resume-columns"><section className="resume-section"><h2>Experience</h2>{data.experience.map((experience) => <article className="resume-job" key={experience.company + experience.period}><header><div><h3>{experience.role}</h3><p>{experience.company}</p></div><span>{experience.period}</span></header><ul>{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></article>)}</section>
      <aside><section className="resume-section"><h2>Core strengths</h2>{data.skills.map((group) => <div className="resume-skills" key={group.category}><h3>{group.category}</h3><p>{group.items.join(" · ")}</p></div>)}</section><section className="resume-section"><h2>Proof points</h2><ul className="resume-proof">{data.stats.map((stat) => <li key={stat.label}><strong>{stat.value.toLocaleString("en-IN")}{stat.suffix}</strong><span>{stat.label}</span></li>)}</ul></section></aside></div>
      <section className="resume-section resume-impact"><h2>Selected impact</h2><div>{data.tools.map((tool) => <article key={tool.name}><h3><a href={tool.url}>{tool.shortName} ↗</a></h3><p>{tool.description}</p></article>)}</div></section>
    </article>
    <script dangerouslySetInnerHTML={{ __html: `document.querySelector('[data-print-control]').addEventListener('click',function(){window.print()})` }} />
  </main>;
}
