import Link from "next/link";

export default function NotFound() {
  return (
    <main
      data-theme="tilt"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
    >
      <div className="scanlines" aria-hidden />
      <div className="relative flex max-w-md flex-col items-center gap-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
          404
        </p>
        <h1 className="fluid-display">Whiff.</h1>
        <p className="fluid-body text-white/80 text-balance">
          That page doesn&apos;t exist. Skill issue, possibly ours.
        </p>
        <Link
          href="/"
          className="mt-4 rounded-2xl bg-[var(--color-faceit)] px-5 py-3 text-sm font-bold uppercase tracking-widest text-black transition hover:bg-[var(--color-faceit-dim)]"
        >
          Back to base
        </Link>
      </div>
    </main>
  );
}
