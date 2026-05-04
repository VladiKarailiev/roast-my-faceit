# Roast My FACEIT

Type a FACEIT nickname → get a Wrapped-style roast of your CS2 stats. Comedy only.

- **Stack**: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4
- **Source of stats**: official FACEIT Data API v4
- **No DB, no auth, no AI** — V1 is intentionally tiny.
- **2–3 FACEIT calls per generation**, cached on Vercel for 5 minutes.
- **Analytics**: `@vercel/analytics` + `@vercel/speed-insights` (free on Vercel).

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
3. In **Environment Variables**, add:
   - **`FACEIT_API_KEY`** — your server key (required).
   - **`NEXT_PUBLIC_SITE_URL`** — `https://your-domain.vercel.app` (so OG / canonical / sitemap point at the real URL).
   - Optional: `GOOGLE_SITE_VERIFICATION`, `BING_VERIFICATION`, `YANDEX_VERIFICATION`.
4. Click **Deploy**. That's the whole list.

> ⚠️ **Never** prefix the FACEIT key with `NEXT_PUBLIC_`. That would ship it to every browser. Keep it as `FACEIT_API_KEY`.

### Turn on Vercel Analytics & Speed Insights

The components are already wired in `app/layout.tsx`. To start collecting data:

1. Open your project in the Vercel dashboard.
2. Click the **Analytics** tab → **Enable**.
3. Click the **Speed Insights** tab → **Enable**.

Both are free on the Hobby plan and require no extra code.

### Get listed on Google

After your first deploy:

1. Go to **[Google Search Console](https://search.google.com/search-console)** → **Add property** → use the URL prefix `https://your-domain.vercel.app/`.
2. Choose **HTML tag** verification, copy the `content="..."` value.
3. Set `GOOGLE_SITE_VERIFICATION` in Vercel env vars to that value, redeploy.
4. Back in Search Console, click **Verify**.
5. In Search Console → **Sitemaps**, submit `https://your-domain.vercel.app/sitemap.xml`.

The site already ships:

- **`<title>`, `<meta description>`, canonical URL** for every route
- **Open Graph** image (auto-generated 1200×630 PNG via `app/opengraph-image.tsx`)
- **Twitter card** (reuses the OG image)
- **JSON-LD** structured data (`WebApplication` + `FAQPage`)
- **`robots.txt`** and **`sitemap.xml`** with absolute URLs from `NEXT_PUBLIC_SITE_URL`
- **PWA manifest** (`/manifest.webmanifest`)
- **App icons** (`icon.svg`, `apple-icon.svg`)
- **Crawlable below-the-fold content** on `/` (How it works, FAQ) for Google to index

## Editing the roasts

All comedy lines live in [`lib/templates.ts`](lib/templates.ts). The file is heavily commented and grouped by stat. Each tier (e.g. `kd.abysmal`, `winrate.smurfing`, `kills.psycho`) is just an array of strings. Add, remove, or rewrite — the report generator picks one at random.

Variables are written `{{like_this}}`. Available variables are listed above each block. Examples:

- `{{nickname}}` `{{country}}` `{{region}}` `{{level}}` `{{elo}}`
- `{{kd}}` `{{winRate}}` `{{hs}}`
- `{{matches}}` `{{wins}}` `{{losses}}` `{{hours}}`
- `{{totalKills}}` `{{totalDeaths}}` `{{perMatch}}` `{{mostKills}}`
- `{{peakElo}}` `{{currentElo}}` `{{delta}}` `{{sampleSize}}` *(peak / multikill — reference recent window)*
- `{{triples}}` `{{quads}}` `{{pentas}}`
- `{{currentWinStreak}}` `{{longestWinStreak}}` `{{recentLossStreak}}`
- `{{mapName}}` `{{mapMatches}}` `{{mapWinRate}}`

> **Honesty rule**: lines in the `peak` and `multikill` blocks describe the recent match window (last ~30), not lifetime. Don't let copy drift into "all-time". Lifetime blocks (`kills`, `matches`, `kd`, `hs`, `winrate`) can talk in career terms.

To shift where one tier ends and the next begins (e.g. what counts as "elite" K/D), edit [`lib/tiers.ts`](lib/tiers.ts).

## Project layout

```
app/
  layout.tsx           ← root <html> + metadata + analytics + JSON-LD
  page.tsx             ← entry, renders <HomeClient/>
  globals.css          ← Tailwind + theme + slide gradients + animations
  not-found.tsx        ← 404
  sitemap.ts           ← /sitemap.xml
  robots.ts            ← /robots.txt
  manifest.ts          ← /manifest.webmanifest
  icon.svg             ← favicon
  apple-icon.svg       ← apple-touch-icon
  opengraph-image.tsx  ← /opengraph-image
  twitter-image.tsx    ← /twitter-image
  privacy/page.tsx
  disclaimer/page.tsx
  api/report/route.ts  ← GET /api/report?nickname=…
components/
  HomeClient.tsx       ← form ↔ loader ↔ report state machine
  NicknameForm.tsx     ← landing + input + below-the-fold SEO content
  Loader.tsx           ← rotating phases while we fetch
  ReportView.tsx       ← Stories-style auto-advancing slideshow
  Slide.tsx            ← per-slide hero renderer + ghost backdrop
  slide-parts.tsx      ← Counter / RingProgress / BarMeter / WLPills / etc.
lib/
  faceit.ts            ← FACEIT client (server only)
  validate.ts          ← isValidNickname (safe to import in client code)
  normalize.ts         ← tolerant stat parser
  tiers.ts             ← number → tier label
  templates.ts         ← *** EDIT THIS for jokes ***
  roast.ts             ← assembles final Report
types/
  report.ts            ← shared types
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
- Per-roast share image generation
- Match-history slide (longest game, biggest comeback)
- Per-region leaderboard of "most-roasted nicknames"
- Database for tracking unique lookups

## License

MIT. Roasts are mine. Pain is yours.
