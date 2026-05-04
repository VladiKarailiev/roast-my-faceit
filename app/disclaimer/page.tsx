import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Roast My FACEIT is a comedy fan project. We're not affiliated with FACEIT or Valve.",
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-[100dvh] px-6 py-16">
      <article className="mx-auto max-w-2xl space-y-3 leading-relaxed">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
          Legal-ish
        </p>
        <h1 className="fluid-title mt-2">Disclaimer</h1>
        <p className="text-white/80">
          Last updated: 2026-05-04
        </p>

        <h2 className="mt-10 text-xl font-bold">Comedy, not coaching</h2>
        <p className="text-white/80">
          Roast My FACEIT is a parody/comedy fan project. The text on every
          slide is a joke based on automatically classified statistics. None
          of it is advice, judgement of you as a person, or a real
          assessment of your skill.
        </p>

        <h2 className="mt-8 text-xl font-bold">Not affiliated with FACEIT</h2>
        <p className="text-white/80">
          Roast My FACEIT is not affiliated with, endorsed by, sponsored by,
          or connected to FACEIT Limited or its products. &quot;FACEIT&quot;
          is a trademark of its respective owner. &quot;Counter-Strike&quot;
          and &quot;CS2&quot; are trademarks of Valve Corporation. We use
          public stats exposed via the official FACEIT Data API and accept
          their terms.
        </p>

        <h2 className="mt-8 text-xl font-bold">Public data only</h2>
        <p className="text-white/80">
          We only display data the FACEIT API exposes for any logged-in user
          looking up that nickname: skill level, ELO, lifetime aggregate
          stats, and per-map aggregate stats. We do not access private match
          history, friend graphs, chat, or anything behind authentication.
        </p>

        <h2 className="mt-8 text-xl font-bold">Don&apos;t be a jerk</h2>
        <p className="text-white/80">
          The roasts target stats, not identity. Don&apos;t use this tool to
          harass, bully, or target someone with the result. Doing so
          violates the spirit of this project and likely the terms of
          wherever you&apos;re posting it.
        </p>

        <h2 className="mt-8 text-xl font-bold">No warranty</h2>
        <p className="text-white/80">
          Stats are pulled live from FACEIT. They can be wrong, stale,
          delayed, or missing. The site is provided &quot;as is&quot;
          without warranties of any kind. If your feelings get hurt: skill
          issue, but not really, you&apos;re fine, log off and stretch.
        </p>

        <h2 className="mt-8 text-xl font-bold">Removal requests</h2>
        <p className="text-white/80">
          If you&apos;re a FACEIT player and want your nickname blocked from
          this site, contact us through the link on the home page. We honor
          those requests.
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
