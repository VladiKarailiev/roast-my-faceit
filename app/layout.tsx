import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://roastmyfaceit.example";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Roast My FACEIT — A Wrapped-style stat roast",
    template: "%s · Roast My FACEIT",
  },
  description:
    "Type your FACEIT nickname. We pull your CS2 stats and roast them, Wrapped-style. Comedy only. No coaching tips, we promise.",
  applicationName: "Roast My FACEIT",
  authors: [{ name: "Roast My FACEIT" }],
  keywords: [
    "FACEIT",
    "CS2",
    "Counter-Strike 2",
    "stats roast",
    "wrapped",
    "FACEIT stats",
  ],
  openGraph: {
    type: "website",
    title: "Roast My FACEIT",
    description:
      "Type a FACEIT nickname. Get a Wrapped-style roast of your CS2 stats.",
    url: SITE_URL,
    siteName: "Roast My FACEIT",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roast My FACEIT",
    description:
      "Type a FACEIT nickname. Get a Wrapped-style roast of your CS2 stats.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#07070b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}
