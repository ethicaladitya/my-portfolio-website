import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";

const description = "Aditya Shah is a Hosting Support Manager and DevOps Engineer working across WordPress infrastructure, technical customer experience, incident response, security, automation, and team leadership.";

export const metadata: Metadata = {
  metadataBase: new URL("https://theadityashah.com"),
  title: "Aditya Shah — Technical Support Leader & DevOps Engineer",
  description,
  applicationName: "Aditya Shah Portfolio",
  alternates: { canonical: "/" },
  authors: [{ name: "Aditya Shah", url: "https://theadityashah.com" }],
  keywords: ["Aditya Shah", "Technical Support Manager", "Support Engineering Manager", "DevOps Engineer", "WordPress Infrastructure", "WordPress Security", "Hosting Operations", "Technical Customer Experience"],
  openGraph: { type: "profile", url: "/", title: "Aditya Shah — Technical leadership. Production depth.", description, siteName: "Aditya Shah", images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Aditya Shah — Technical leadership. Production depth." }] },
  twitter: { card: "summary_large_image", title: "Aditya Shah — Technical leadership. Production depth.", description, images: ["/og-image.svg"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#08110f" }, { media: "(prefers-color-scheme: light)", color: "#f2f0e9" }] };

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "@id": "https://theadityashah.com/#person", name: "Aditya Shah", url: "https://theadityashah.com/", jobTitle: ["Hosting Support Manager", "DevOps Engineer"], worksFor: { "@type": "Organization", name: "WPMU DEV", url: "https://wpmudev.com/" }, sameAs: ["https://profiles.wordpress.org/ethicaladitya/", "https://github.com/ethicaladitya", "https://linkedin.com/in/ethicaladitya", "https://adityashah.blog/"], knowsAbout: ["Technical support leadership", "Technical customer experience", "WordPress infrastructure", "Linux system administration", "Incident response", "WordPress security", "Ansible automation", "Hosting operations"] },
    { "@type": "ProfilePage", "@id": "https://theadityashah.com/#profile", url: "https://theadityashah.com/", name: "Aditya Shah — Technical Support Leader & DevOps Engineer", mainEntity: { "@id": "https://theadityashah.com/#person" } }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body></html>;
}
