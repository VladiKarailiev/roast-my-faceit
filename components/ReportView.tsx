"use client";

import { useCallback, useEffect, useState } from "react";
import type { Report } from "@/types/report";
import Slide from "./Slide";

const SLIDE_MS = 6000;

interface Props {
  report: Report;
  onRestart: () => void;
}

export default function ReportView({ report, onRestart }: Props) {
  const slides = report.slides;
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);
  const [tick, setTick] = useState(0); // restart progress on slide change

  // Tell the layout we're in Stories mode so the footer chrome hides.
  useEffect(() => {
    document.body.setAttribute("data-story", "true");
    return () => document.body.removeAttribute("data-story");
  }, []);

  const next = useCallback(() => {
    setIndex((i) => {
      if (i >= total - 1) {
        setDone(true);
        return i;
      }
      return i + 1;
    });
  }, [total]);

  const prev = useCallback(() => {
    setDone(false);
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  // Reset progress timer on each slide change.
  useEffect(() => {
    setTick((t) => t + 1);
  }, [index]);

  // Auto-advance when not paused / not done.
  useEffect(() => {
    if (paused || done) return;
    const t = setTimeout(next, SLIDE_MS);
    return () => clearTimeout(t);
  }, [next, paused, done, tick]);

  // Keyboard nav.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "Escape") {
        onRestart();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onRestart]);

  const slide = slides[index];

  return (
    <main className="relative min-h-[100dvh] overflow-hidden">
      {/* Progress bars */}
      <div className="fixed inset-x-0 top-0 z-50 flex gap-1 px-3 pt-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/15"
          >
            <div
              key={`${i}-${tick}`}
              className="h-full bg-white"
              style={{
                width:
                  i < index ? "100%" : i === index ? undefined : "0%",
                animation:
                  i === index && !paused && !done
                    ? `progress-fill ${SLIDE_MS}ms linear forwards`
                    : i < index
                      ? undefined
                      : undefined,
              }}
            />
          </div>
        ))}
      </div>

      {/* Top-right close */}
      <button
        type="button"
        onClick={onRestart}
        aria-label="Close"
        className="fixed right-3 top-7 z-50 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white/80 backdrop-blur transition hover:bg-black/60"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Slide */}
      <Slide
        slide={slide}
        index={index}
        total={total}
        raw={report.raw}
        player={report.player}
      />

      {/* Touch zones — Instagram-Stories style.
          Left 30% = prev, middle 30% = pause-on-hold, right 40% = next. */}
      <div
        className="fixed inset-0 z-30 grid"
        style={{ gridTemplateColumns: "30% 30% 40%" }}
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onPointerLeave={() => setPaused(false)}
        onPointerCancel={() => setPaused(false)}
      >
        <button
          aria-label="Previous"
          className="h-full w-full"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
        />
        <div aria-hidden />
        <button
          aria-label="Next"
          className="h-full w-full"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
        />
      </div>

      {/* End-of-report actions */}
      {done && index === total - 1 && (
        <ActionDock
          report={report}
          onRestart={onRestart}
        />
      )}
    </main>
  );
}

function ActionDock({
  report,
  onRestart,
}: {
  report: Report;
  onRestart: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.origin : "";
    const text = report.shareLine;
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: "Roast My FACEIT", text, url });
        return;
      } catch {
        /* user cancelled — fall through */
      }
    }
    try {
      await navigator.clipboard.writeText(`${text} — ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-10 z-40 px-6">
      <div className="mx-auto flex max-w-md flex-col gap-3">
        <button
          onClick={share}
          className="rounded-2xl border border-white/20 bg-black/50 px-5 py-4 text-base font-bold uppercase tracking-widest text-white backdrop-blur transition hover:bg-black/70"
        >
          {copied ? "Copied!" : "Share roast"}
        </button>
        <button
          onClick={onRestart}
          className="rounded-2xl bg-[var(--color-faceit)] px-5 py-4 text-base font-bold uppercase tracking-widest text-black transition hover:bg-[var(--color-faceit-dim)]"
        >
          Roast someone else
        </button>
      </div>
    </div>
  );
}
