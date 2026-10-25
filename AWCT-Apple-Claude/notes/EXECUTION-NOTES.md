# Execution notes

Written while packaging, from the same Claude Code session that built the clone. This is a
summary, not a transcript; the full tool-call log is not exported.

- Agent: Claude Code (desktop app, Code tab), model Claude Opus 5.5. Single session, no subagents.
- Date: 2026-10-25. OS: Windows 11. Node v26.8.2 (repo requires ≥24), Next.js 16.3.5.
- Starting point: the "ai-website-clone-template" repo (commit `ee3f5a2`), template homepage untouched.

## Steps taken

1. Read the repo skill `.agents/skills/clone-website/SKILL.md` and its inspection guide.
2. Inspected https://www.apple.com/iphone-18-pro/ in the built-in Browser at 1440×900 and 375×812
   (the 375 preset emulates an Android user agent): scrolled the whole page, opened the global nav
   flyout, the local-nav "Explore" panel, the highlights carousel, the product viewer, the mobile menu.
   Measured computed styles via in-page JavaScript.
3. Downloaded evidence with curl/Python: page HTML, CSS, Apple's nav flyout JSON, search quick links,
   footer markup (stored in `docs/research/apple-iphone-18-pro/raw/`). Apple's runtime JS bundles were
   downloaded to locate video and price endpoints, then deleted because the repo linter scanned them.
4. Prices come from Apple's `/us/shop/mcm/product-price` response observed in the Browser network log.
5. Assets: `scripts/download-apple-iphone-18-pro.py` fetched `_large_2x` and `_small_2x` renditions of
   124 images + 10 local-nav PNGs and 13 videos (large/small). Small renditions with the same crop as
   large were deleted; 404s were icons with no small rendition. Fonts: SF Pro Display/Text/Icons and
   SF Pro AR Display/Text (the latter is what Apple's Arabic RTL storefront loads).
6. `scripts/extract-apple-iphone-18-pro-data.py` produced `data/global-nav.en.json` and `data/footer.en.json`.
7. Built the page as React components + CSS Modules under `src/components/sites/apple-iphone-18-pro/`,
   with two root layouts (route groups `(en)` LTR and `(fa)` RTL). English copy from the source;
   Persian copy written by the agent (Apple has no Persian storefront).
8. Compared clone vs source at the same viewport and section offsets; fixed: hero crop, divider and
   spacing in "Most wanted", sticky gallery controls, camera section rebuilt as a pinned video scene,
   `overflow: hidden` → `clip` so sticky works, gallery headline gutter, performance headline width,
   card control colours, iPhone index background, upgrader/compare spacing, and a mobile-menu bug
   (menu inside a `backdrop-filter` nav was contained; moved outside and pinned the nav).
9. `npm run check` (eslint + tsc + next build) passed in the original workspace.

## Template files changed by the clone

- Deleted: `src/app/layout.tsx`, `src/app/page.tsx` (replaced by `src/app/(en)/` and `src/app/(fa)/` root layouts).
- Added: `.claude/launch.json` (dev-server preview config for the desktop app).
- Unchanged: `globals.css` (imported by both new layouts), package.json, lockfile, configs.
- Nothing was committed to git.
