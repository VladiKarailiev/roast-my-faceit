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
    <main className="min-h-[100dvh] flex flex-col">
      <div
        data-theme="intro"
        className="relative flex-1 flex flex-col items-center justify-center px-6 pb-24 pt-10"
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
        </div>
      </div>
    </main>
  );
}
