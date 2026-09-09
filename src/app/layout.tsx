import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";

const description = "Aditya Shah is a DevOps Engineer, Linux SysAdmin, and AI Engineer who leads hosting support at WPMU DEV and works across WordPress infrastructure, automation, security, and production operations.";

export const metadata: Metadata = {
  metadataBase: new URL("https://theadityashah.com"),
  title: "Aditya Shah — DevOps Engineer, SysAdmin & AI Engineer",
  description,
  applicationName: "Aditya Shah Portfolio",
  alternates: { canonical: "/" },
  authors: [{ name: "Aditya Shah", url: "https://theadityashah.com" }],
  keywords: ["Aditya Shah", "Aditya Shah DevOps", "Aditya Shah Engineer", "DevOps Engineer", "Linux SysAdmin", "AI Engineer", "Technical Support Manager", "Support Engineering Manager", "WordPress Infrastructure", "WordPress Security", "Hosting Operations", "Technical Customer Experience"],
  openGraph: { type: "profile", url: "/", title: "Aditya Shah — DevOps Engineer, SysAdmin & AI Engineer", description, siteName: "Aditya Shah", images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Aditya Shah — DevOps Engineer, SysAdmin, and AI Engineer" }] },
  twitter: { card: "summary_large_image", title: "Aditya Shah — DevOps Engineer, SysAdmin & AI Engineer", description, images: ["/og-image.svg"] },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#080f1c" }, { media: "(prefers-color-scheme: light)", color: "#f6f4ef" }] };

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "@id": "https://theadityashah.com/#person", name: "Aditya Shah", url: "https://theadityashah.com/", jobTitle: ["Hosting Support Manager", "DevOps Engineer", "Linux Systems Administrator", "AI Engineer"], worksFor: { "@type": "Organization", name: "WPMU DEV", url: "https://wpmudev.com/" }, sameAs: ["https://profiles.wordpress.org/ethicaladitya/", "https://github.com/ethicaladitya", "https://linkedin.com/in/ethicaladitya", "https://adityashah.blog/"], knowsAbout: ["DevOps engineering", "AI engineering", "Technical support leadership", "Technical customer experience", "WordPress infrastructure", "Linux system administration", "Incident response", "WordPress security", "Ansible automation", "Hosting operations"] },
    { "@type": "ProfilePage", "@id": "https://theadityashah.com/#profile", url: "https://theadityashah.com/", name: "Aditya Shah — DevOps Engineer, SysAdmin & AI Engineer", mainEntity: { "@id": "https://theadityashah.com/#person" } }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body></html>;
}
