import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aditya Shah — Hosting Support Manager & DevOps Engineer",
  description:
    "Personal portfolio of Aditya Shah — 10+ years scaling WordPress infrastructure, securing production systems, and leading world-class support teams at WPMU DEV.",
  keywords: [
    "Aditya Shah",
    "WordPress engineer",
    "DevOps",
    "Hosting",
    "WPMU DEV",
    "WordPress security",
    "portfolio",
  ],
  authors: [{ name: "Aditya Shah", url: "https://theadityashah.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adityashah30.github.io/portfolio",
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
  },
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
      </head>
      <body>{children}</body>
    </html>
  );
}
