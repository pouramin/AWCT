# AWCT-Apple-Claude — Apple iPhone 18 Pro clone (Claude Code)

Private research archive for the TunnelLab AWCT comparison (Claude Code vs OpenAI Codex).
**Contains copyrighted Apple images, videos, fonts and copy. Do not publish or redistribute.**

- Original URL: https://www.apple.com/iphone-18-pro/ (inspected 2026-10-25, en-US storefront)
- Agent: Claude Code, model Claude Opus 5.5 — see `notes/` for prompts and execution notes.
- Local routes: `/iphone-18-pro` (English, LTR), `/fa/iphone-18-pro` (Persian, RTL); `/` redirects to the English page.

## Archive layout

```
AWCT-Apple-Claude/
├── README.md                    this file
├── MANIFEST.sha256              checksums of every file in the archive
├── notes/
│   ├── PROMPTS.md               the two user prompts, verbatim
│   ├── EXECUTION-NOTES.md       what the agent did, files changed vs the template
│   └── VALIDATION.md            packaging checks and the clean install/build log summary
├── evidence/screenshots/        raw Browser captures (source inspection; clone vs source comparison)
└── project/                     the full repository working tree (no node_modules, .next, .git)
    ├── src/app/(en)/            English root layout (lang=en-US, dir=ltr) + pages
    ├── src/app/(fa)/            Persian root layout (lang=fa, dir=rtl) + page
    ├── src/app/globals.css      template Tailwind/shadcn base (unchanged)
    ├── src/components/sites/apple-iphone-18-pro/
    │   ├── IphonePage.tsx       assembles the page from sections; takes a locale content object
    │   ├── content/en.ts        all English copy (defines the PageContent type)
    │   ├── content/fa.ts        Persian copy; content/fa-labels.ts = nav/footer label translations
    │   ├── data/*.en.json       global-nav flyouts and footer (extracted from apple.com)
    │   ├── media.ts             image/video paths + intrinsic sizes
    │   ├── sections/*.tsx       one component (+ CSS Module) per page section
    │   ├── GlobalNav, LocalNav, LocaleBanner, Ribbon, Footer, Gallery, Modal, InlineVideo, …
    │   └── site.css             @font-face, tokens, shared typography, RTL rules
    ├── public/sites/apple-iphone-18-pro/{images,videos,fonts}   local assets (~53 MB)
    ├── docs/research/apple-iphone-18-pro/
    │   ├── page-brief.md        section map, measurements, interactions, known gaps
    │   ├── asset-map.json       source URL → local path, bytes, dimensions
    │   └── raw/                 downloaded page HTML/CSS, nav/footer JSON, outlines
    ├── scripts/download-apple-iphone-18-pro.py       asset downloader
    ├── scripts/extract-apple-iphone-18-pro-data.py   builds data/*.json from raw evidence
    └── package.json, package-lock.json, next.config.ts, tsconfig.json, eslint/postcss configs, …
```

## Requirements

- Node.js ≥ 24 (`.nvmrc`), npm (lockfile is `package-lock.json`)
- Network access to the npm registry for `npm ci`. The page itself loads no remote code or fonts.
- Python 3 + `beautifulsoup4` only if you want to re-run the research scripts (not needed to run the clone).

## Run locally

```bash
cd project
npm ci
npm run dev          # http://localhost:3000/iphone-18-pro  and  /fa/iphone-18-pro
```

Production: `npm run build && npm start`. Full validation: `npm run check` (eslint + tsc + next build).

## Implemented interactions

- Language/region bar (Apple's "choose your country or region" bar) switches English ⇄ Persian; dismissible (remembered in localStorage); footer region link reopens it.
- Global nav: hover flyouts (desktop), search panel (submits to apple.com search), full-screen mobile menu with sliding submenus and back button.
- Floating local nav: appears after the hero, turns light over light sections, "Explore" panel with product strip + paddles, section tabs (current section highlighted), Esc/backdrop close.
- Hero, camera, video, battery, performance clips: muted inline videos that play once when scrolled into view; camera clip pinned (sticky) under its headline.
- Highlights carousel: auto-advancing videos, progress dots, play/pause/replay, click and swipe.
- "Most wanted" and "Worth the upgrade?" compare dropdowns update stats/tiles (12 models).
- Design product viewer: feature pills expand into cards and swap imagery; colour swatches; up/down and close.
- Aperture tabs (ƒ/1.48–ƒ/4.0) with image cross-fade and caption.
- Horizontal galleries with snap scrolling and prev/next paddles (camera, video, Siri AI, Apple Intelligence, connectivity, incentives, environment, values).
- Modals for incentive and environment cards (Esc, backdrop, close button, focus return).
- Footer: legal footnotes linked from in-copy superscripts; directory accordions on mobile.
- Android user agents get Apple's "switch from Android" variants of several sections (as apple.com does).
- RTL: mirrored layout via logical CSS properties, mirrored chevrons, SF Pro AR fonts, letter-spacing disabled for Arabic script.

## Known limitations

- Apple's scroll-scrubbed videos play once on view rather than being scrubbed frame-by-frame.
- "Watch the film" opens Apple's HLS (.m3u8) URL in a new tab instead of an in-page player; AR (USDZ) and 3D viewer not reproduced.
- Battery hero phone sits ~150 px lower than the source at 1440 px; other sections within roughly ±20 px.
- Prices are static copy captured from Apple's price API on 2026-10-25; trade-in amounts use static wording.
- Persian text is the agent's own translation (no Apple Persian storefront exists); legal footnotes stay English.
- Outbound links (Buy, Store, Support, footer, etc.) point to apple.com; no backend was implemented.
- 23 downloaded start-frame images in `public/sites/…` are not referenced by the code (harmless extras).

## External dependencies

- Runtime: none beyond the npm packages in `package.json` (Next.js 16.3.5, React 19.2.4, Tailwind v4, clsx, tailwind-merge, …). All assets and fonts are served from `public/`.
- Links only (not loaded): apple.com, support.apple.com, apps.apple.com, contactretail.apple.com and Apple's video URL for the film.
- Template leftovers not used by the clone: GitHub workflow `.github/workflows/token-badge.yml` (checks out a public repo; contains no secrets), Dockerfiles, `.agents/` skill files.
