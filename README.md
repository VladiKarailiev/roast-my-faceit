<<<<<<< HEAD
# Roast My FACEIT

Type a FACEIT nickname → get a Wrapped-style roast of your CS2 stats. Comedy only.

- **Stack**: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4
- **Source of stats**: official FACEIT Data API v4
- **No DB, no auth, no AI** — V1 is intentionally tiny.
- **Two FACEIT calls per generation**, cached on Vercel for 5 minutes.

## Quick start

```bash
# 1) install
npm install

# 2) get a server key from https://developers.faceit.com
cp .env.example .env.local
# then edit .env.local and paste your key into FACEIT_API_KEY=...

# 3) run
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to **vercel.com → Add New → Project → Import** that repo.
3. In **Environment Variables**, add **`FACEIT_API_KEY`** (and optionally
   `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`).
4. Click **Deploy**. That's the whole list.

> ⚠️ **Never** prefix the FACEIT key with `NEXT_PUBLIC_`. That would ship it
> to every browser. Keep it as `FACEIT_API_KEY`.

## Editing the roasts

All comedy lines live in [`lib/templates.ts`](lib/templates.ts). The file is
heavily commented and grouped by stat. Each tier (e.g. `kd.abysmal`,
`winrate.smurfing`) is just an array of strings. Add, remove, or rewrite —
the report generator picks one at random.

Variables are written `{{like_this}}`. Available variables are listed
above each block. Examples:

- `{{nickname}}`
- `{{kd}}`, `{{winRate}}`, `{{hs}}`
- `{{matches}}`, `{{wins}}`, `{{losses}}`, `{{hours}}`
- `{{currentWinStreak}}`, `{{longestWinStreak}}`, `{{recentLossStreak}}`
- `{{mapName}}`, `{{mapMatches}}`, `{{mapWinRate}}`

To shift where one tier ends and the next begins (e.g. what counts as
"elite" K/D), edit [`lib/tiers.ts`](lib/tiers.ts).

## Project layout

```
app/
  layout.tsx           ← root <html> + metadata + footer
  page.tsx             ← entry, renders <HomeClient/>
  globals.css          ← Tailwind + theme + slide gradients
  not-found.tsx        ← 404
  sitemap.ts           ← auto sitemap.xml
  privacy/page.tsx
  disclaimer/page.tsx
  api/report/route.ts  ← GET /api/report?nickname=…
components/
  HomeClient.tsx       ← form ↔ loader ↔ report state machine
  NicknameForm.tsx     ← landing + input
  Loader.tsx           ← rotating phases while we fetch
  ReportView.tsx       ← Stories-style auto-advancing slideshow
  Slide.tsx            ← one slide
lib/
  faceit.ts            ← FACEIT client (server only)
  normalize.ts         ← tolerant stat parser
  tiers.ts             ← number → tier label
  templates.ts         ← *** EDIT THIS for jokes ***
  roast.ts             ← assembles final Report
types/
  report.ts            ← shared types
public/
  favicon.svg
  robots.txt
```

## Endpoints

- `GET /api/report?nickname=:nick` → `{ ok: true, report: Report }`
  - 400 invalid nickname
  - 404 player not found / no CS2 linked
  - 429 rate-limited by FACEIT
  - 502 FACEIT auth or upstream error
  - 500 anything else

## Roadmap (intentionally not in V1)

- Optional AI-rewriter pass (gated by env var)
- Share image generation (`@vercel/og`)
- Match-history slide (longest game, biggest comeback)
- Per-region leaderboard of "most-roasted nicknames"
- Database for tracking unique lookups

## License

MIT. Roasts are mine. Pain is yours.
=======
# roast-my-faceit
>>>>>>> 32ef92d63dce1f50b1634ed7cf22e97310d9e1ed
