import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Roast My FACEIT does not collect personal data, does not set tracking cookies, and does not store the nicknames you look up.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-[100dvh] px-6 py-16">
      <article className="mx-auto max-w-2xl space-y-3 leading-relaxed">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
          Privacy
        </p>
        <h1 className="fluid-title mt-2">Privacy Policy</h1>
        <p className="text-white/80">Last updated: 2026-05-04</p>

        <h2 className="mt-10 text-xl font-bold">TL;DR</h2>
        <p className="text-white/80">
          We don&apos;t want your data. We don&apos;t collect it. We
          don&apos;t store the nicknames you look up. The site has no
          accounts, no analytics that profile you, no advertising, and no
          tracking cookies.
        </p>

        <h2 className="mt-8 text-xl font-bold">What happens when you submit a nickname</h2>
        <ol className="list-decimal pl-6 text-white/80">
          <li>
            Your nickname is sent to our server via{" "}
            <code className="rounded bg-white/10 px-1">/api/report</code>.
          </li>
          <li>
            Our server makes two requests to the official FACEIT Data API
            using a server-side API key.
          </li>
          <li>
            We classify the returned numbers into tiers and pick a comedy
            line for each. The result is sent back to your browser.
          </li>
          <li>
            We do not write the nickname or stats to a database. There is
            no database in this version.
          </li>
        </ol>

        <h2 className="mt-8 text-xl font-bold">Caching</h2>
        <p className="text-white/80">
          The platform we&apos;re hosted on (Vercel) caches FACEIT API
          responses for up to a few minutes to avoid hammering FACEIT. That
          cache is keyed by URL only and is purged automatically.
        </p>

        <h2 className="mt-8 text-xl font-bold">Logs</h2>
        <p className="text-white/80">
          Standard server logs may retain request metadata (IP, timestamp,
          path) for a short period for debugging and abuse prevention. We
          do not link logs to identities and we do not export them.
        </p>

        <h2 className="mt-8 text-xl font-bold">Cookies</h2>
        <p className="text-white/80">
          We don&apos;t set cookies. If your browser sees one, it&apos;s
          from the host platform and is strictly necessary for the site to
          run.
        </p>

        <h2 className="mt-8 text-xl font-bold">Third parties</h2>
        <ul className="list-disc pl-6 text-white/80">
          <li>FACEIT Data API — the source of the public stats.</li>
          <li>Vercel — hosts the site.</li>
        </ul>

        <h2 className="mt-8 text-xl font-bold">Children</h2>
        <p className="text-white/80">
          The site is not directed at children under 13.
        </p>

        <h2 className="mt-8 text-xl font-bold">Contact</h2>
        <p className="text-white/80">
          Questions, concerns, or removal requests: open an issue on our
          repository or reach the owner via the contact link in the footer.
        </p>

        <p className="mt-12">
          <Link href="/" className="underline underline-offset-4">
            ← Back home
          </Link>
        </p>
      </article>
    </main>
  );
}
