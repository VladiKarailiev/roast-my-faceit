"use client";

import { useEffect, useState } from "react";

const PHASES = [
  "Pinging FACEIT…",
  "Pulling lifetime stats…",
  "Counting losses…",
  "Sharpening jokes…",
  "Loading your verdict…",
];

export default function Loader({ nickname }: { nickname: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % PHASES.length), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <main
      data-theme="intro"
      className="relative min-h-[100dvh] flex items-center justify-center px-6"
    >
      <div className="scanlines" aria-hidden />
      <div className="relative flex flex-col items-center gap-6 text-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-white/15" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--color-faceit)] animate-spin" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
            Roasting
          </p>
          <p className="fluid-title">{nickname}</p>
          <p
            key={i}
            className="text-sm text-white/70"
            style={{ animation: "slide-up 360ms ease both" }}
          >
            {PHASES[i]}
          </p>
        </div>
      </div>
    </main>
  );
}
