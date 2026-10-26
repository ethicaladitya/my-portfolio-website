import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";

const description = "Aditya Shah is a DevOps Engineer and hosting support leader at WPMU DEV, a community manager who has run WordPress Bhopal since 2015, and a WordCamp speaker on WordPress security, WP-CLI, performance, and AI agents.";

export const metadata: Metadata = {
  metadataBase: new URL("https://theadityashah.com"),
  title: "Aditya Shah — DevOps Engineer, Community Manager & Public Speaker",
  description,
  applicationName: "Aditya Shah Portfolio",
  alternates: { canonical: "/" },
  authors: [{ name: "Aditya Shah", url: "https://theadityashah.com" }],
  keywords: ["Aditya Shah", "Aditya Shah DevOps", "Aditya Shah Engineer", "DevOps Engineer", "Linux SysAdmin", "AI Engineer", "Public Speaker", "WordCamp Speaker", "WordPress Speaker India", "Tech Speaker Bhopal", "Community Manager", "WordPress Community Organizer", "Technical Support Manager", "Support Engineering Manager", "WordPress Infrastructure", "WordPress Security", "Hosting Operations", "Technical Customer Experience"],
  openGraph: { type: "profile", url: "/", title: "Aditya Shah — DevOps Engineer, Community Manager & Public Speaker", description, siteName: "Aditya Shah", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Aditya Shah — DevOps Engineer, Community Manager & Public Speaker" }] },
  twitter: { card: "summary_large_image", title: "Aditya Shah — DevOps Engineer, Community Manager & Public Speaker", description, images: ["/og-image.png"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#080f1c" }, { media: "(prefers-color-scheme: light)", color: "#f6f4ef" }] };

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "@id": "https://theadityashah.com/#person", name: "Aditya Shah", url: "https://theadityashah.com/", jobTitle: ["Hosting Support Manager", "DevOps Engineer", "Linux Systems Administrator", "AI Engineer", "Community Manager", "Public Speaker"], worksFor: { "@type": "Organization", name: "WPMU DEV", url: "https://wpmudev.com/" }, homeLocation: { "@type": "Place", name: "Bhopal, Madhya Pradesh, India" }, image: "https://theadityashah.com/og-image.png", description, sameAs: ["https://profiles.wordpress.org/ethicaladitya/", "https://github.com/ethicaladitya", "https://linkedin.com/in/ethicaladitya", "https://adityashah.blog/", "https://wordpress.tv/speakers/aditya-shah/"], knowsAbout: ["Public speaking", "Linux", "DNS", "Community management", "WordPress community building", "WP-CLI", "DevOps engineering", "AI engineering", "Technical support leadership", "Technical customer experience", "WordPress infrastructure", "Linux system administration", "Incident response", "WordPress security", "Ansible automation", "Hosting operations"] }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="light" suppressHydrationWarning><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body></html>;
}
