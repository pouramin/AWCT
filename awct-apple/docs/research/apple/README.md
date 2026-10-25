# Apple iPhone 18 Pro clone

Source: https://www.apple.com/iphone-18-pro/ — inspected in the built-in Browser on 24 October 2026.

## Routes and ownership

| Source | Local preview | Implementation |
| --- | --- | --- |
| `/iphone-18-pro/` | http://127.0.0.1:3002/iphone-18-pro/ | `apps/apple/src/app/iphone-18-pro/page.tsx` |
| Convenience entry | http://127.0.0.1:3002/ | `apps/apple/src/app/page.tsx` |

The independent Apple application preserves the existing portfolio at the repository root and the separate Nike app. Components, content, translations and CSS live in `apps/apple/src/components/sites/apple/`. Original media is stored in `apps/apple/public/sites/apple/`. No screenshots, iframes, Apple JavaScript bundles, checkout services or account backends are used to implement the page.

## Source brief

- Black hero, dark gray highlights/design/family sections, light shopping/comparison/environment/footer sections. Actual SF Pro Text and SF Pro Display fonts are bundled locally.
- Desktop global navigation is 44px tall; mobile is 48px. The ribbon uses 14px type with 20px line height and −0.224px tracking.
- At 1440×900, the document content is 1424.8px wide after the scrollbar. Hero starts at y=96 and ends at y=900. Primary gutters are 6.25%. Hero heading is 80px with 84px line height.
- At 390×844, hero starts at y=140 and ends at y=844. The product artwork changes to the source's portrait composition. Pricing sits inside the bottom of the hero.
- Mobile section labels are 21px; principal section headlines are 40px/44px. Highlights cards are approximately 307×480px and show neighboring cards.
- Section order: hero; highlights; ultimate upgrade; design; camera system and aperture gallery; camera controls; pro video; battery/charging; performance/vapor chamber; upgrade comparison; shared features; Siri AI; iOS/Apple Intelligence; connectivity; accessories; Apple shopping benefits; product comparison; environment; values; iPhone index; legal/footer.
- Observed triggers: hover/click global menus; click Explore overlay and anchors; time/tab/swipe highlights; click color and design controls; click aperture tabs; horizontal gallery arrows; model selects; media play/pause; scroll-driven camera and battery media; mobile footer disclosures.

## Reproduced and verified

- Actual source English text and locally downloaded original imagery: 219 image assets, 26 responsive animation videos, 11 original font files, plus the Apple SVG.
- Responsive hero and navigation; sticky product bar with dark/light appearance; Explore product rail and section links; global navigation menus; search and bag panels.
- Highlights support autoplay, tabs, horizontal scrolling and pause. Product viewer changes feature imagery and all four color selections. Aperture changes the actual photos and captions.
- Both comparison selectors update the correct source metrics. Example verified against the source: iPhone 17 Pro Max → 6 more video-playback hours, 20% faster CPU, 40% faster GPU.
- Camera/Siri/iOS/connectivity galleries, specification rows, shopping/environment dialogs, footer accordions and external destinations.
- Original full product film plays through HLS.js. Camera zoom and time-lapse controls use local original media.
- Requested Persian UI mode changes `lang=fa` and `dir=rtl`, mirrors layout, preserves English text direction, and persists the language preference. Switching back restores English LTR. Apple does not supply a Persian version at the requested URL; translations are a local addition. Technical descriptions, many gallery descriptions and legal copy remain English.

## Corrections made during comparison

1. Recovered the real SF fonts through Browser asset bundling after direct URLs returned 404.
2. Isolated development output in `.next-dev` so development and production checks do not contend for the same files on Windows.
3. Corrected mobile hero height, pricing placement, ribbon tracking and portrait media.
4. Rebuilt highlights as a real swipeable carousel, with measured mobile card dimensions.
5. Reduced oversized mobile headlines and media scenes; placed camera imagery before its introduction and the family image before its mobile description.
6. Corrected product comparison destinations and added the actual detailed specification rows.
7. Fixed gallery arrows to scroll only their horizontal track, preserving page scroll position.
8. Added the source's light sticky navigation and responsive footer disclosure behavior.
9. Recovered 20 distinct images across eight reused-basename groups and preserved their source folder names. Camera, battery, performance and video posters now have independent paths. All 219 mapped image URLs resolve to distinct existing local files.

## Validation and visual evidence

Built-in Browser source/local comparisons were made at 1440×900 and 390×844. Local layout was additionally checked at 1920×1080. Source and clone were scrolled through their mobile marketing sections; reference captures and section geometry are retained here. No horizontal overflow or broken loaded images was found at the checked desktop/mobile widths.

- `comparison-desktop.png`: source left, local right at 1440×900.
- `comparison-mobile.png`: source left, local right at 390×844.
- `local-mobile-390x844-fa.png`: Persian RTL view.
- `source-mobile-full.png`, `local-mobile-full.png`, `mobile-sweep/`: full-page/sweep evidence. Some animation frames differ by capture time.
- `desktop-geometry.json`, `mobile-geometry.json`: measurement evidence. The section overview montage records an intermediate comparison that exposed mobile differences subsequently corrected.
- `asset-map.json`, `font-map.json`, `media-map.json`: source provenance. Font failures in the direct-download log were recovered through Browser; no font files remain missing.

Commands executed with the repository-local Node.js 24.22.1 runtime:

- `npm --prefix apps/apple run check`: ESLint, strict TypeScript and production build.
- `npm run check`: repository ESLint, TypeScript and production build. Root ESLint reports image-optimization warnings in the existing Nike app and the Apple logo; no lint errors.

The preview is already running on port 3002. For later sessions, `scripts/apple.ps1 dev` starts it with the required process-local Windows environment; `scripts/apple.ps1 check` runs the Apple checks. Nothing was published or deployed.

## Remaining differences and unavailable scope

- The source's interactive 3D/AR renderer is represented by its original product images and working feature/color controls; free 3D rotation and AR placement are not implemented.
- Scroll scrubbing, pin durations, gallery timing and transitions approximate the source. Lower-page spacing and detailed shopping modal presentation are not pixel-identical.
- Persian mode is a partial UI translation, not an official/full Persian Apple page. Product media and English legal/specification content retain their original content.
- The temporary Italian geographic suggestion banner is omitted. The regional destination goes to Apple's actual country/region page; the requested local English/Persian switch is implemented separately.
- Tech specs, Android switching, purchases, trade-in, accounts, global search results and other product pages remain genuine outbound Apple destinations. No backend functionality was invented.
- The full film streams from Apple and needs network access; the other bundled product images, fonts and animation clips are local.

This is an editable, tested reference clone, not a claim of pixel-perfect parity across every animation frame or source service.
