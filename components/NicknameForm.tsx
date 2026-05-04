"use client";

import { useEffect, useRef, useState } from "react";
import { isValidNickname } from "@/lib/validate";

interface Props {
  onSubmit: (nickname: string) => void;
  errorMessage?: string;
}

export default function NicknameForm({ onSubmit, errorMessage }: Props) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const trimmed = value.trim();
  const valid = trimmed.length >= 3 && isValidNickname(trimmed);
  const showInputError = touched && trimmed.length > 0 && !valid;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onSubmit(trimmed);
  };

  return (
    <main className="flex flex-col">
      <div
        data-theme="intro"
        className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-24 pt-10"
      >
        <div className="scanlines" aria-hidden />
        <div className="relative w-full max-w-md flex flex-col gap-8 text-center">
          <header className="flex flex-col items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-faceit)]" />
              Unofficial · for laughs
            </span>
            <h1 className="fluid-display text-balance">
              Roast
              <br />
              My{" "}
              <span className="text-[var(--color-faceit)]">FACEIT</span>
            </h1>
            <p className="fluid-body text-white/80 text-balance max-w-sm">
              Type a CS2 nickname. We pull the public stats and serve a
              Wrapped-style roast. Pure comedy. Zero coaching.
            </p>
          </header>

          <form onSubmit={submit} className="flex flex-col gap-3 text-left">
            <label
              htmlFor="nickname"
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60"
            >
              FACEIT nickname
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                id="nickname"
                name="nickname"
                type="text"
                inputMode="text"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder="e.g. s1mple"
                value={value}
                maxLength={24}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => setTouched(true)}
                className="w-full rounded-2xl border border-white/15 bg-black/40 px-5 py-4 text-lg font-semibold text-white placeholder:text-white/30 outline-none transition focus:border-white/40 focus:bg-black/60"
              />
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-xs uppercase tracking-widest text-white/30">
                CS2
              </span>
            </div>
            {showInputError && (
              <p className="text-sm text-rose-300">
                Nicknames are 3–20 characters: letters, digits, and{" "}
                <code className="rounded bg-white/10 px-1">_-.|</code>
              </p>
            )}
            {errorMessage && !showInputError && (
              <p className="text-sm text-rose-300">{errorMessage}</p>
            )}
            <button
              type="submit"
              disabled={!valid}
              className="group mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-faceit)] px-6 py-4 text-base font-bold uppercase tracking-widest text-black transition active:scale-[0.98] enabled:hover:bg-[var(--color-faceit-dim)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Roast me
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
                className="transition-transform group-enabled:group-hover:translate-x-0.5"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          <p className="text-xs text-white/45 text-balance">
            Public stats only. Roast My FACEIT is not affiliated with FACEIT.
            <br />
            By continuing you accept our{" "}
            <a className="underline underline-offset-2" href="/disclaimer">
              disclaimer
            </a>
            .
          </p>

          <a
            href="#how-it-works"
            className="mt-2 inline-flex items-center gap-1 self-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/45 hover:text-white/70"
          >
            scroll for how it works
            <span aria-hidden>↓</span>
          </a>
        </div>
      </div>

      {/* ── Below-the-fold content (crawlable, scroll-only) ────────────── */}
      <section
        id="how-it-works"
        className="border-t border-white/10 bg-[var(--color-surface)] px-6 py-20"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-faceit)]">
            How it works
          </p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            FACEIT stats. Roasted.
          </h2>
          <p className="mt-4 text-lg text-white/75">
            Roast My FACEIT pulls public Counter-Strike 2 stats from the
            official FACEIT Data API and turns them into a Wrapped-style
            slideshow of jokes. No login, no download, no advice — just
            comedy. Works on phone and desktop.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Step
              n={1}
              title="Type a nickname"
              body="Any FACEIT nickname linked to CS2. We don't save it."
            />
            <Step
              n={2}
              title="We pull the public stats"
              body="Skill level, ELO, K/D, win rate, headshot %, top map, recent form."
            />
            <Step
              n={3}
              title="You read your verdict"
              body="A 12-slide auto-playing roast with a share button at the end."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-faceit)]">
            What we roast
          </p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Twelve slides of receipts
          </h2>
          <ul className="mt-6 grid gap-3 text-base text-white/80 sm:grid-cols-2">
            <Bullet label="FACEIT skill level" />
            <Bullet label="Current and recent peak ELO" />
            <Bullet label="Career matches, wins, losses" />
            <Bullet label="Lifetime kills and best single match" />
            <Bullet label="Average K/D against the 1.0 line" />
            <Bullet label="Win rate as a donut chart" />
            <Bullet label="Headshot percentage" />
            <Bullet label="Triples, quads and aces (last 30)" />
            <Bullet label="Recent W/L streak" />
            <Bullet label="Most-played map and win rate" />
            <Bullet label="Final verdict stamp" />
            <Bullet label="A share line you can paste anywhere" />
          </ul>
        </div>
      </section>

      <FaqStructuredData />

      <section
        id="faq"
        className="border-t border-white/10 bg-[var(--color-surface)] px-6 py-20"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--color-faceit)]">
            FAQ
          </p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Frequently asked, for some reason
          </h2>

          <div className="mt-8 flex flex-col gap-6">
            <Faq q="Is this affiliated with FACEIT or Valve?">
              No. Roast My FACEIT is an unofficial fan project. We use the
              public FACEIT Data API and accept their terms. &quot;FACEIT&quot; is a
              trademark of its respective owner; &quot;Counter-Strike&quot; and
              &quot;CS2&quot; are trademarks of Valve.
            </Faq>
            <Faq q="What data does it use?">
              Only what FACEIT exposes for any logged-in user looking up
              that nickname: skill level, ELO, lifetime aggregate stats,
              per-map stats, and a small window of recent match stats.
              Nothing private, nothing behind authentication.
            </Faq>
            <Faq q="Do you store my nickname?">
              No. There is no database in this version. The nickname goes
              to our server, gets used for two-to-three FACEIT API calls,
              and is forgotten when the response is sent back to your
              browser.
            </Faq>
            <Faq q="Why is the &lsquo;peak ELO&rsquo; only from the last 30 games?">
              FACEIT&apos;s public API doesn&apos;t expose all-time peak ELO. We
              compute peak from the most recent match window we&apos;re allowed
              to read, and label it as such on the slide. We&apos;d rather be
              honest than impressive.
            </Faq>
            <Faq q="Is it free?">
              Yes, and there are no ads. If that ever changes we&apos;ll mention
              it loudly.
            </Faq>
            <Faq q="Can I get my nickname removed?">
              Yes. See the{" "}
              <a className="underline underline-offset-2" href="/disclaimer">
                disclaimer
              </a>{" "}
              for the contact path.
            </Faq>
          </div>
        </div>
      </section>
    </main>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <div className="grid h-8 w-8 place-items-center rounded-full bg-[var(--color-faceit)] text-sm font-black text-black">
        {n}
      </div>
      <h3 className="mt-4 text-lg font-bold tracking-tight">{title}</h3>
      <p className="mt-1 text-sm text-white/70 leading-relaxed">{body}</p>
    </div>
  );
}

function Bullet({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-2">
      <span
        aria-hidden
        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-faceit)]"
      />
      <span>{label}</span>
    </li>
  );
}

/* FAQ Q&A in plain-text form, fed both to the visible <Faq> blocks and to
   the FAQPage JSON-LD below. Edit in one place. */
const FAQ_ITEMS: Array<{ q: string; a: string }> = [
  {
    q: "Is this affiliated with FACEIT or Valve?",
    a: "No. Roast My FACEIT is an unofficial fan project. We use the public FACEIT Data API and accept their terms. \"FACEIT\" is a trademark of its respective owner; \"Counter-Strike\" and \"CS2\" are trademarks of Valve.",
  },
  {
    q: "What data does it use?",
    a: "Only what FACEIT exposes for any logged-in user looking up that nickname: skill level, ELO, lifetime aggregate stats, per-map stats, and a small window of recent match stats. Nothing private, nothing behind authentication.",
  },
  {
    q: "Do you store my nickname?",
    a: "No. There is no database in this version. The nickname goes to our server, gets used for two-to-three FACEIT API calls, and is forgotten when the response is sent back to your browser.",
  },
  {
    q: "Why is the 'peak ELO' only from the last 30 games?",
    a: "FACEIT's public API doesn't expose all-time peak ELO. We compute peak from the most recent match window we're allowed to read, and label it as such on the slide. We'd rather be honest than impressive.",
  },
  {
    q: "Is it free?",
    a: "Yes, and there are no ads. If that ever changes we'll mention it loudly.",
  },
  {
    q: "Can I get my nickname removed?",
    a: "Yes. See the disclaimer for the contact path.",
  },
];

function FaqStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-black/30 p-5 open:bg-black/50">
      <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-bold tracking-tight text-white">
        {q}
        <span
          aria-hidden
          className="text-xl text-white/40 transition group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{children}</p>
    </details>
  );
}
