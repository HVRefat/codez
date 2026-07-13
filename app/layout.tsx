import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  FOUNDER_NAME,
  jsonLdHtml,
  organizationJsonLd,
  SITE_NAME,
  SITE_URL,
  websiteJsonLd,
} from "@/lib/jsonld";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Code Z — Cyber Security, Technology & Crime Analysis | Bangladesh",
    template: "%s — Code Z",
  },
  description:
    "Code Z is Bangladesh's cyber security and crime analysis publication. Threat reports, cybercrime case studies, scam alerts, and technology deep-dives — decode the threat, read the evidence.",
  applicationName: SITE_NAME,
  keywords: [
    "Code Z",
    "CodeZ",
    "cyber security Bangladesh",
    "cybercrime analysis",
    "crime report analysis",
    "online scam alert Bangladesh",
    "technology news Bangladesh",
    "hacking news bangla",
    "সাইবার নিরাপত্তা",
  ],
  authors: [{ name: FOUNDER_NAME, url: "https://monmoto.com" }],
  creator: FOUNDER_NAME,
  publisher: "Code Z — a Monmoto property",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "Code Z — Cyber Security, Technology & Crime Analysis",
    description:
      "Threat reports, cybercrime case studies, scam alerts, and technology deep-dives from Bangladesh.",
    locale: "en_US",
    alternateLocale: ["bn_BD"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Z — Cyber Security, Technology & Crime Analysis",
    description:
      "Decode the threat. Read the evidence. Cyber security and crime analysis from Bangladesh.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F9FB" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdHtml(websiteJsonLd())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdHtml(organizationJsonLd())}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
