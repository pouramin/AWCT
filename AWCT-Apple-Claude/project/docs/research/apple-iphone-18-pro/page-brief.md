# apple.com/iphone-18-pro — page brief

Source: https://www.apple.com/iphone-18-pro/ (inspected 2026-10-25, 1440×900 and 375×812).
Raw evidence: `raw/page.html`, `raw/overview.built.css`, `raw/condensed.txt` (section outline),
`raw/footer.json`, `raw/nav.json`. Asset map: `asset-map.json`.

## Route map

| Source | Local | Owner |
| --- | --- | --- |
| `/iphone-18-pro/` (en-US, LTR) | `/iphone-18-pro` (and `/` redirects there) | `src/app/iphone-18-pro/page.tsx` |
| — (no Apple Persian locale exists) | `/fa/iphone-18-pro` (Persian, RTL) | `src/app/fa/iphone-18-pro/page.tsx` |

Components: `src/components/sites/apple-iphone-18-pro/`. Copy: `content/en.ts`, `content/fa.ts`
(same `PageContent` shape). Assets: `public/sites/apple-iphone-18-pro/{images,videos,fonts}`.
All other Apple links stay pointed at `https://www.apple.com…` (out of scope).

## Page-wide

- Fonts: SF Pro Display (500/600) for headlines, SF Pro Text (400/500/600) for body, SF Pro Icons.
  Persian uses SF Pro AR Display/Text (what Apple's Arabic RTL sites load) with SF Pro fallback.
- Body 17px/25px, letter-spacing -0.374px. Content width = 87.5vw capped at 1260px
  (1440 viewport → 90px gutters, 1245px content incl. scrollbar). Mobile gutter ≈ 23px.
- Dark sections `#000`, alternate dark `#1d1d1f`; light sections `#f5f5f7` with white cards.
  Text `#f5f5f7` on dark, `#1d1d1f` on light, secondary `#86868b`, links `#2997ff` (dark) / `#0066cc` (light),
  buttons `#0071e3`.
- Section padding 144px top / bottom typical on desktop.

## Chrome

1. Locale banner (geo-triggered on source, Italian copy for this visitor): copy left, region dropdown,
   Continue button, close ×. Bg `#323232`-ish, 70px tall. → Clone uses it as the **language switcher**
   (English / فارسی).
2. Global nav 44px, `rgba(22,22,23,.8)` + blur; links 12px `rgba(255,255,255,.8)`.
   Hover opens full-width flyout (`#161617`), groups: elevated 24px/600 links + 12px sublinks, 12px gray
   headers; page behind gets `rgba(0,0,0,.4)` + `blur(20px)` curtain. Mobile ≤833px: Apple logo, search,
   bag, 2-line burger → full-screen menu with 28px/600 items; item tap → submenu with back chevron.
3. Ribbon: 14px centered promo + "Learn more ›".
4. Local nav: floating pill (max 1024px, radius 32px, `rgba(18,18,18,.8)`, blur 20px, 1px `#282828` ring)
   sticky top 10px; "iPhone 18 Pro" 19px/600; "Explore" outline pill + "Buy" blue pill (12px).
   Explore expands the pill into a panel: product thumbnails strip (with paddles), title + price + Buy,
   "Overview ▾", section tabs (Highlights, Design, Cameras, Performance, Shared Features, Accessories),
   "Tech Specs ›", "Switch from Android ›". Theme flips to light over light sections.

## Sections (order, desktop height)

1. Media hero (780): full-bleed hero image/video ("PRO" letters + phone), eyebrow 32px "iPhone 18 Pro",
   headline 80px/84 "Pro further.", bottom-right price pill (dark translucent) with Buy. Mobile: text on top, centered.
2. Highlights (1080, `#1d1d1f`): "Get the highlights." 48px + "Watch the film ⊙". Horizontal card carousel
   (1245×612, radius 28, gap 20), caption 28px centered over media, auto-advancing videos; bottom
   control: dot tray (active dot 48px progress pill) + play/pause 56px circle.
3. AIO "Most wanted." (1407, black): eyebrow, big headline, paragraph with bold spans, "Compare with"
   dropdown driving 3 stats (12 iPhone options), hero image below. Android UA → "aio-alt" variant.
4. Design / product viewer (1361, `#1d1d1f` header + black viewer 760px): left column of pills
   (Colors, Two sizes, New Main camera, Redesigned Dynamic Island, Durability, Camera Control, Action button).
   Click → pill expands into card with copy (Colors has 4 swatches that change the image), image swaps,
   up/down paddles + close ×.
5. Pro camera (3947): hero, scroll video, intro, stats (48MP / 8x), spec columns, "Variable aperture" with
   ƒ tabs switching photos + captions, "Such a control freak." caption-tile gallery with paddles.
6. Pro video (2101): headline, phone video, paragraph, "Fully scene. Fully heard." gallery.
7. Battery (2128): headline, phone video/image, stat + paragraph, charge card ("There's a new Pro in charge.").
8. Performance (2680): chip image, headline, paragraph, two callouts, vapor chamber headline + image + paragraph.
9. Upgrader (1526): "Worth the upgrade? You bet." + dropdown, 6-tile grid that changes per selection, Trade In footer.
   Android UA → switch / android-values / Move to iOS variants.
10. Family intro, Siri AI gallery, iOS & Apple Intelligence gallery, Connectivity gallery (`#1d1d1f`).
11. Accessories (black): headline, paragraph, link, wide image.
12. Light zone (`#f5f5f7`): "Why Apple…" feature-card gallery (+ modal), "Keep exploring iPhone." compare
    (iPhone 18 Pro vs iPhone Duo), Environment icon cards (+ modal), Values cards, iPhone index (3 columns).
13. Footer: footnotes (12px, `rgba(0,0,0,.56)`), breadcrumbs, directory (5 columns; accordions on mobile),
    "More ways to shop", copyright + legal links + region link.

## Interactions to reproduce

Global nav flyouts (hover), mobile menu (+ submenus), locale/language banner, local nav Explore panel,
highlights carousel (dots, autoplay, pause), compare dropdowns (AIO + upgrader), product viewer, aperture tabs,
gallery paddles (scroll-snap), incentive / environment modals, footer accordions (mobile), section anchors,
video play/pause buttons, Android-UA content variant.

## Known gaps (after comparison pass, 2026-10-25)

- Scroll-scrubbed videos (hero, camera system, battery, performance) play once when scrolled into view;
  they are not scrubbed frame-by-frame to scroll position. The camera clip is pinned (sticky) like the source.
- "Watch the film" links to Apple's HLS (.m3u8) film URL in a new tab; the source opens an in-page player.
- The AR "View in your space" (USDZ) control and the 3D product viewer are not reproduced.
- Battery hero phone sits ~150px lower than the source at 1440px; minor spacing drift elsewhere (±20px).
- Search runs on apple.com (form submits there); bag links to apple.com. No backend was added.
- Prices are the values Apple's price API returned on 2026-10-25, stored as static copy.
- Persian copy is a translation written for this clone (Apple has no Persian storefront); legal
  footnotes remain in English. Persian uses Apple's SF Pro AR fonts with letter-spacing disabled.
