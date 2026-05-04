import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://roastmyfaceit.example";

const SITE_NAME = "Roast My FACEIT";
const DESCRIPTION =
  "Type a FACEIT nickname. We pull your public CS2 stats and serve a Spotify Wrapped-style roast. Pure comedy, zero coaching tips.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — A Wrapped-style stat roast`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  category: "entertainment",
  keywords: [
    "FACEIT",
    "FACEIT roast",
    "FACEIT stats",
    "CS2",
    "CS2 stats",
    "Counter-Strike 2",
    "stats roast",
    "Wrapped",
    "Spotify Wrapped CS2",
    "FACEIT level",
    "FACEIT ELO",
    "FACEIT K/D",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: SITE_NAME,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DESCRIPTION,
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
  // Optional: set GOOGLE_SITE_VERIFICATION (and friends) in env to add the
  // verification meta tag automatically. Empty values are stripped.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.YANDEX_VERIFICATION || undefined,
    other: process.env.BING_VERIFICATION
      ? { "msvalidate.01": process.env.BING_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#07070b",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  applicationCategory: "EntertainmentApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  isAccessibleForFree: true,
  inLanguage: "en",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <footer
          id="site-footer"
          className="fixed bottom-0 inset-x-0 z-40 pointer-events-none"
        >
          <div className="mx-auto max-w-md px-4 pb-3 pt-2 flex items-center justify-center gap-4 text-[11px] uppercase tracking-widest text-white/40 pointer-events-auto">
            <Link href="/" className="hover:text-white/70 transition-colors">
              Home
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/disclaimer"
              className="hover:text-white/70 transition-colors"
            >
              Disclaimer
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/privacy"
              className="hover:text-white/70 transition-colors"
            >
              Privacy
            </Link>
          </div>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
