"use client";

import { useCallback, useState } from "react";
import type { Report } from "@/types/report";
import NicknameForm from "./NicknameForm";
import ReportView from "./ReportView";
import Loader from "./Loader";

type View =
  | { kind: "form" }
  | { kind: "loading"; nickname: string }
  | { kind: "error"; message: string }
  | { kind: "report"; report: Report };

export default function HomeClient() {
  const [view, setView] = useState<View>({ kind: "form" });

  const generate = useCallback(async (nickname: string) => {
    setView({ kind: "loading", nickname });
    try {
      const res = await fetch(
        `/api/report?nickname=${encodeURIComponent(nickname)}`,
        { cache: "no-store" },
      );
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const msg =
          data?.error ?? "Couldn't generate a report. Try a different nickname.";
        setView({ kind: "error", message: msg });
        return;
      }
      setView({ kind: "report", report: data.report as Report });
    } catch {
      setView({
        kind: "error",
        message: "Network hiccup. Check your connection and try again.",
      });
    }
  }, []);

  const reset = useCallback(() => setView({ kind: "form" }), []);

  if (view.kind === "loading") {
    return <Loader nickname={view.nickname} />;
  }

  if (view.kind === "report") {
    return <ReportView report={view.report} onRestart={reset} />;
  }

  return (
    <NicknameForm
      onSubmit={generate}
      errorMessage={view.kind === "error" ? view.message : undefined}
    />
  );
}
