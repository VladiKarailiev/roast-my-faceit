"use client";

import type { Slide as SlideT } from "@/types/report";

interface Props {
  slide: SlideT;
  index: number;
  total: number;
  isFirst: boolean;
  isLast: boolean;
  avatar?: string | null;
}

export default function Slide({
  slide,
  index,
  total,
  isFirst,
  avatar,
}: Props) {
  return (
    <section
      key={slide.id + index}
      data-theme={slide.theme}
      className="slide-enter relative flex min-h-[100dvh] flex-col px-6 pt-24 pb-32"
    >
      <div className="scanlines" aria-hidden />

      <div className="relative flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
          {slide.eyebrow}
          <span className="ml-auto opacity-60">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="relative mt-auto flex flex-col gap-6">
        {isFirst && avatar && (
          <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-white/30 bg-black/40 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar}
              alt=""
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {slide.bigStat && (
          <div className="flex flex-col items-start gap-1">
            <p className="fluid-display text-balance">{slide.bigStat}</p>
            {slide.subStat && (
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                {slide.subStat}
              </p>
            )}
          </div>
        )}

        {!slide.bigStat && (
          <div className="flex flex-col items-start gap-2">
            <h2 className="fluid-display text-balance">{slide.title}</h2>
            {slide.subStat && (
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                {slide.subStat}
              </p>
            )}
          </div>
        )}

        <p className="fluid-body text-white/95 text-balance max-w-prose">
          {slide.body}
        </p>
      </div>
    </section>
  );
}
