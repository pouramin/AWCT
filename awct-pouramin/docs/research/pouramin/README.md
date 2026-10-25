# pouramin.dev homepage clone

Inspected 24 October 2026 through the built-in Browser. No deployment was performed.

## Route and ownership

| Source | Local | Owner |
| --- | --- | --- |
| https://pouramin.dev/ | http://127.0.0.1:3000/ | `src/app/page.tsx`, `src/components/sites/pouramin/` |

Only the requested homepage is cloned. Projects, Lab, Builds, Now, Videos, Prompts, Build log, Uses, About, Start here, Work with me, and project case studies intentionally link to their original source URLs. GitHub, YouTube, and coffee links preserve their actual destinations.

## Page brief

- Sticky header, AP gradient mark, desktop navigation, command launcher, original inline GitHub/YouTube SVG paths, theme toggle, responsive mobile menu.
- Hero with public-building badge, violet AI + software text, three primary links, focus labels, workbench and console illustration built from HTML/CSS.
- Workspace: Now card, Persian latest-video feature, Lab links, Build log links, GitHub activity card.
- Two featured project cards, five principles, yellow coffee support strip, multi-column footer.
- Content shell: 1180px maximum. Desktop hero columns: 1.05fr/.7fr with 70px gap. Breakpoints: 1050, 760 and 480px.
- Source font declaration is Inter followed by system UI/Segoe UI. The source loads no font file or homepage raster image. The same fallback stack is preserved rather than substituting Geist.
- Colors: dark #111315, surface #181b1e, text #f1f3f1, violet #5b4cf0, coffee #ffdd00. The original light palette is available via the theme toggle.
- The current source is English with no homepage language-switch control. Its Persian video heading has `dir="auto"`; verified computed direction is RTL, while the page remains English LTR. No invented translation or switch was added.

## Interactions observed and reproduced

- Mobile menu expands below the header, scrolls when needed, locks background scrolling, and closes on its toggle or desktop resize.
- Theme toggles dark/light and persists in local storage; initial preference follows system settings when no choice is stored.
- Command palette opens via the slash button, `/`, or Ctrl/Cmd+K. Search filters commands, empty results show a message, arrows select, Enter activates, Escape and backdrop clicks dismiss. Keyboard focus is contained and returned to the opener.
- Alt shortcuts navigate to the source destinations and open the terminal easter egg. The terminal implements the source's public help/about/navigation responses and clear command; it does not execute shell commands.
- Hover treatments and scroll-entry reveals are reproduced with CSS and IntersectionObserver. Reduced-motion preferences are respected.
- Outbound calls to action remain real links.

## Assets and evidence

| Source | Local asset | Verification |
| --- | --- | --- |
| https://pouramin.dev/assets/favicon.svg | `public/sites/pouramin/favicon.svg` | SVG source saved locally |
| Header inline SVG paths | `Header.tsx` | Original path geometry, not replacement icon-library symbols |
| Brand/workbench/project marks | React sections + CSS | Text and CSS artwork, matching source |

`source.html`, `source.css`, and `source-app.js.txt` are inspection references only. No source script, analytics beacon, production JavaScript bundle, screenshot, or iframe is used to render the clone. Homepage markup has been separated into editable React sections, with interactions implemented in TypeScript.

Representative comparisons (source left, clone right):

- `comparison-desktop.png`: 1440 × 900 per page.
- `comparison-mobile.png`: 390 × 844 per page.
- Individual hero and full-page screenshots are in this directory. Full-page captures can reflect scroll reveal timing; the hero comparisons and settled DOM measurements were used for geometry verification.

## Validation and manual corrections

- Built-in Browser: whole-page desktop/mobile inspection, 1920 × 1080 shell/overflow check, original menus/theme/palette/terminal inspection.
- Compared source/local at 1440 × 900 and 390 × 844. All five section heights and document positions matched after viewport/text reflow settled. Wider shell remained 1180px on both.
- Local Browser checks: mobile menu open/close, dark/light toggle, palette empty results, search, keyboard Enter activation, terminal help and clear; no captured console warnings/errors or horizontal overflow. Persian title computed as RTL.
- Corrected missing shared section/project CSS during the initial integration, replaced homepage anchors with Next Link, restored pressed/expanded accessibility states, and hid the Next development indicator.
- The first preview was unreachable due to sandbox networking. Restarting the local server with the approved network access resolved it.
- Turbopack's production CSS worker exited before connecting, including outside the sandbox with Node 24.22.1. A production build succeeded with the supported webpack compiler. The build script now uses `next build --webpack` so the standard validation command is repeatable on this Windows setup; development retains Turbopack.
- Final validation: `npm run check` passed (exit 0): ESLint, TypeScript, and webpack production build using project-local Node 24.22.1. The homepage was successfully prerendered. `git diff --check` also passed.

## Remaining limits

- Latest video and GitHub pulse reproduce the public content observed on the inspection date. They are editable snapshots and do not refresh from YouTube/GitHub APIs.
- Other portfolio pages are external source links, not additional local clones.
- Animation timing is reproduced from the source's CSS and observed entry behavior; frame-by-frame animation parity is not claimed.

## Preview

The development preview is started for the user at http://127.0.0.1:3000/. A future session can restart it with `npm run dev` using the process-local runtime/cache environment specified in AGENTS.md; the user does not need to run technical commands for this delivery.
