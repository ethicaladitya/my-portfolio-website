import type { Metadata } from "next";
import Noise from "@/components/Noise";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://theadityashah.com"),
  title: {
    default: "Aditya Shah — Hosting Support Manager & DevOps Engineer",
    template: "%s | Aditya Shah"
  },
  description:
    "Personal portfolio of Aditya Shah — 10+ years scaling WordPress infrastructure, securing production systems, and leading world-class support teams at WPMU DEV.",
  keywords: [
    "Aditya Shah",
    "WordPress engineer Aditya Shah",
    "Aditya Shah DevOps",
    "Hosting Support Manager",
    "WPMU DEV Aditya Shah",
    "WordPress security expert",
    "Aditya Shah portfolio",
  ],
  authors: [{ name: "Aditya Shah", url: "https://theadityashah.com" }],
  alternates: {
    canonical: "https://theadityashah.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theadityashah.com",
    title: "Aditya Shah — Hosting Support Manager & DevOps Engineer",
    description:
      "10+ years scaling WordPress infrastructure, securing production systems, and leading high-performance teams.",
    siteName: "Aditya Shah Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Shah — Hosting Support Manager & DevOps Engineer",
    description:
      "10+ years scaling WordPress infrastructure, securing production systems, and leading high-performance teams.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Aditya Shah",
  "url": "https://theadityashah.com",
  "jobTitle": "Hosting Support Manager & DevOps Engineer",
  "worksFor": {
    "@type": "Organization",
    "name": "WPMU DEV"
  },
  "sameAs": [
    "https://github.com/ethicaladitya",
    "https://linkedin.com/in/ethicaladitya",
    "https://adityashah.blog"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Noise />
        {children}
      </body>
    </html>
  );
}
