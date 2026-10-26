import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import { data } from "@/lib/content";

const s = data.speaking;
const title = "Aditya Shah — Speaker on WordPress, DevOps, Security & AI Agents";
const description = "Invite Aditya Shah to speak at your WordCamp, DevFest, college or tech event. WordCamp speaker on WordPress, security, WP-CLI, DevOps, Linux and AI agents.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/speaking/" },
  openGraph: { type: "profile", url: "/speaking/", title, description, siteName: "Aditya Shah", images: [{ url: "/og-speaking.png", width: 1200, height: 630, alt: "Invite Aditya Shah to speak" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-speaking.png"] },
};

const inviteBody = ["Hi Aditya,", "", "We'd like to invite you to speak at:", "", "Event:", "Date(s):", "City / online:", "Audience and expected size:", "Talk or topic you're interested in:", "Format and length:", "Travel / accommodation support:", "", "Thanks,"].join("\n");
const invite = `mailto:${data.meta.email}?subject=${encodeURIComponent("Speaking invitation: [event name]")}&body=${encodeURIComponent(inviteBody)}`;

const faqs = [
  { q: "What does Aditya Shah speak about?", a: `WordPress security and malware cleanup, WP-CLI, performance, hosting and DevOps, Linux, DNS and web fundamentals, AI agents for real operations, and community building.` },
  { q: "Where has Aditya Shah spoken?", a: `WordCamp Asia 2023, WordCamp Nepal 2022, WordCamp Pokhara 2025, WordCamp Kochi 2019, WordCamp Mumbai, Build with AI by Google & Hack2Skill, and many college and campus events, reaching 50,000+ people over 11 years. Four WordCamp talks are recorded on WordPress.tv.` },
  { q: "Which formats work?", a: `Conference talks and keynotes, hands-on workshops, panels and fireside chats, campus sessions, and meetup talks, in person or online.` },
  { q: "How do I invite Aditya Shah to speak?", a: `Email ${data.meta.email} with the event, date, city or online, audience, and the talk or topic you have in mind, or message him on LinkedIn.` },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://theadityashah.com/speaking/#page",
  url: "https://theadityashah.com/speaking/",
  name: title,
  description,
  mainEntity: { "@id": "https://theadityashah.com/#person" },
  breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Aditya Shah", item: "https://theadityashah.com/" }, { "@type": "ListItem", position: 2, name: "Speaking", item: "https://theadityashah.com/speaking/" }] },
  hasPart: s.past.map((talk) => ({ "@type": "VideoObject", name: `${talk.title} (${talk.event})`, url: talk.url, uploadDate: talk.date, description: `Talk by Aditya Shah at ${talk.event}.`, creator: { "@id": "https://theadityashah.com/#person" } })),
};

const Arrow = () => <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;

export default function Speaking() {
  return <>
    <a className="skip-link" href="#main">Skip to main content</a><SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }) }} />
    <main id="main">
      <section className="hero section-shell speaker-hero" aria-labelledby="speaking-title">
        <div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> Available for WordCamps, DevFests, meetups & conferences</p><h1 id="speaking-title">Invite Aditya Shah<br /><span>to speak.</span></h1><p className="hero-lede">{s.summary}</p><p className="hero-summary">11 years of speaking · 50,000+ people reached · WordCamp speaker since 2019 · Build with AI by Google & Hack2Skill · College and campus sessions · Community organizer since 2015 · Based in Bhopal, India; in person or online.</p><div className="hero-actions"><a className="button button-primary" href={invite}>Send a speaking invitation <Arrow /></a><a className="text-link" href="#talks">See talks I can bring <Arrow /></a></div></div>
      </section>

      <section className="proof-strip" aria-label="Speaking and community proof points"><div className="section-shell proof-grid">
        <article><strong>{s.past.length}</strong><h2>recorded WordCamp talks</h2><p>On WordPress.tv, 2019 – 2025</p></article>
        <article><strong>{s.reach.value}</strong><h2>{s.reach.label}</h2><p>{s.reach.detail}</p></article>
        <article><strong>100+</strong><h2>community events</h2><p>Meetups, workshops & gatherings</p></article>
        <article><strong>1,500+</strong><h2>students reached</h2><p>Through WP Build Tour</p></article>
      </div></section>

      <section className="section writing-section" id="past-talks"><div className="section-shell">
        <header className="section-intro split-intro"><div><p className="eyebrow">Past talks</p><h2>Watch before<br />you invite.</h2></div><p>Full recordings on WordPress.tv, so you can judge the delivery, not just the abstract.</p></header>
        <div className="article-list">{s.past.map((talk, index) => <article key={talk.url}><p className="article-number">0{index + 1}</p><div><p className="eyebrow">{talk.event}</p><h3><a href={talk.url} target="_blank" rel="noopener noreferrer">{talk.title}</a></h3><p>Recording on WordPress.tv</p></div><a className="article-arrow" href={talk.url} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${talk.title}`}><Arrow /></a></article>)}</div>
      </div></section>

      <section className="section section-shell" id="also-spoken">
        <header className="section-intro split-intro"><div><p className="eyebrow">Also spoken at</p><h2>Campuses, meetups,<br />AI events.</h2></div><p>Beyond WordCamps, I speak to students and new developers about WordPress, Linux, DNS, and how websites actually work.</p></header>
        <div className="capability-list">{s.also.map((item, index) => <article key={item.event} className="capability-row"><p className="row-index">0{index + 1}</p><div><h3>{item.event}</h3><p>{item.detail}</p></div></article>)}</div>
      </section>

      <section className="section section-shell" id="talks">
        <header className="section-intro split-intro"><div><p className="eyebrow">Talks I can bring</p><h2>Pick a talk.<br />Or a topic.</h2></div><p>Each one can be tuned to your audience and slot. Not seeing the right fit? Suggest a topic from my areas: {s.topics.join(", ")}.</p></header>
        <div className="capability-list">{s.talks.map((talk, index) => <article key={talk.title} className="capability-row"><p className="row-index">0{index + 1}</p><div><h3>{talk.title}</h3><p>{talk.abstract}</p></div><ul><li>{talk.length}</li><li>{talk.fit}</li></ul></article>)}</div>
      </section>

      <section className="section community-section" id="community"><div className="section-shell community-layout">
        <header className="section-intro"><p className="eyebrow">Community manager</p><h2>I build the rooms, too.</h2><p>Organizing since 2015 means I know what an organizer needs from a speaker: a clear abstract on time, a talk that fits the slot, and someone who stays for the hallway track.</p></header>
        <div className="community-grid">{data.community.map((item) => <article key={item.event}><p className="eyebrow">{item.years}</p><h3>{item.event}</h3><strong>{item.role}</strong><p>{item.description}</p></article>)}<article className="community-speaking"><p className="eyebrow">Formats</p><h3>Talks, workshops, panels.</h3><ul className="speaking-events" aria-label="Formats">{s.formats.map((format) => <li key={format}>{format}</li>)}</ul></article></div>
      </div></section>

      <section className="section section-shell" id="bio">
        <header className="section-intro split-intro"><div><p className="eyebrow">Speaker kit</p><h2>Bio, ready<br />to paste.</h2></div><p>Use either version on your event site, schedule, or social posts. For a headshot or slide format, just ask in the invitation.</p></header>
        <div className="speaker-bios"><article><p className="eyebrow">Short bio · {s.bio.short.split(" ").length} words</p><p>{s.bio.short}</p></article><article><p className="eyebrow">Long bio · {s.bio.long.split(" ").length} words</p><p>{s.bio.long}</p></article></div>
      </section>

      <section className="section section-shell" id="faq">
        <header className="section-intro"><p className="eyebrow">For organizers</p><h2>Quick answers.</h2></header>
        <div className="capability-list">{faqs.map((item) => <article key={item.q} className="capability-row faq-row"><div><h3>{item.q}</h3><p>{item.a}</p></div></article>)}</div>
      </section>

      <section className="contact-section" id="contact"><div className="section-shell contact-layout"><p className="eyebrow">Speaking invitations</p><h2>Have a stage that needs production stories?</h2><p>Send the event, date, audience, and the talk or topic you have in mind.</p><div className="contact-actions"><a className="button button-primary" href={invite}>Send a speaking invitation <Arrow /></a><a className="text-link" href={data.meta.linkedin} target="_blank" rel="me noopener noreferrer">Message on LinkedIn <Arrow /></a></div></div></section>
    </main>
    <footer className="site-footer"><div className="section-shell"><a className="footer-mark" href="/">AS<span>.</span></a><p>Speaker · Community manager · DevOps engineer</p><nav aria-label="Social links"><a href={data.meta.github} rel="me">GitHub</a><a href={data.meta.linkedin} rel="me">LinkedIn</a><a href="https://adityashah.blog/" rel="me">Blog</a></nav><p>© {new Date().getFullYear()} Aditya Shah</p></div></footer>
  </>;
}
