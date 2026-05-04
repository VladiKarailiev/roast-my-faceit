import { NextResponse } from "next/server";
import {
  FaceitError,
  getCs2LifetimeStats,
  getPlayerByNickname,
  isValidNickname,
} from "@/lib/faceit";
import { normalize } from "@/lib/normalize";
import { buildReport } from "@/lib/roast";

export const runtime = "nodejs";

interface ApiError {
  ok: false;
  code: string;
  error: string;
}

const errorResponse = (
  code: string,
  message: string,
  status: number,
): NextResponse<ApiError> =>
  NextResponse.json<ApiError>(
    { ok: false, code, error: message },
    { status },
  );

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const nickname = (searchParams.get("nickname") ?? "").trim();

  if (!nickname) {
    return errorResponse("missing_nickname", "Nickname is required.", 400);
  }
  if (!isValidNickname(nickname)) {
    return errorResponse(
      "invalid_nickname",
      "Nicknames are 3–20 characters: letters, digits, _-.|",
      400,
    );
  }

  try {
    const player = await getPlayerByNickname(nickname);
    if (!player.player_id || !player.games?.cs2) {
      return errorResponse(
        "no_cs2",
        "We found that account but it isn't linked to CS2 on FACEIT.",
        404,
      );
    }
    const stats = await getCs2LifetimeStats(player.player_id);
    const normalized = normalize(player, stats);
    const report = buildReport(normalized);
    return NextResponse.json({ ok: true, report });
  } catch (err) {
    if (err instanceof FaceitError) {
      return errorResponse(err.code, err.message, err.status);
    }
    console.error("[/api/report] unexpected error", err);
    return errorResponse("server_error", "Something broke on our side.", 500);
  }
}
