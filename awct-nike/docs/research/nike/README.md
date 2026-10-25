# Nike men's shoes — local recreation

Built using the repository's official `.agents/skills/clone-website/SKILL.md`. No publication or deployment was performed.

## Preview and route ownership

The Nike clone is an independent Next.js app in `apps/nike/`. The existing Pouramin portfolio, its root route, assets, and styles are preserved.

| Source | Local destination | Owner |
| --- | --- | --- |
| `https://www.nike.com/w/mens-shoes-nik1zy7ok` | `http://127.0.0.1:3001/w/mens-shoes-nik1zy7ok` | `apps/nike/src/app/w/mens-shoes-nik1zy7ok/page.tsx` |
| Local convenience entry | `http://127.0.0.1:3001/` | `apps/nike/src/app/page.tsx` |

The local preview uses port 3001. `scripts/nike.ps1 -Task dev` starts development, `-Task check` runs validation, and `-Task start` serves an existing production build. These commands use the project-local Node 24.22.1 runtime and project-local cache/temp directories. They were executed internally; no terminal work is required from the user.

## Editable implementation

- `apps/nike/src/components/sites/nike/Catalog.tsx`: catalog state, sorting, filtering, responsive filter dialog, pickup handoff, location/language dialog.
- `Header.tsx` and `menus.json`: desktop mega-menus, Help menu, mobile drawer and Sport submenu, search overlay, promotion controls.
- `ProductCard.tsx`: real product cards and interactive color variants.
- `Filters.tsx`: filter disclosures and choices.
- `Footer.tsx`: story carousel, responsive footer, location/language entry.
- `data.ts` and `catalog.json`: captured product content, source destinations, translations, and asset references.
- `nike.css`: local Nike font faces and responsive layout.
- `apps/nike/public/sites/nike/`: downloaded media, fonts, and extracted SVGs.
- `scripts/download-nike.mjs`: reproducible download of the observed image/font inventory. Supplemental desktop campaign/SVG assets were extracted separately.

The implementation uses React, semantic HTML, CSS, and local media. Screenshots and production bundles are not used as the page implementation.

## Source observations

The built-in Browser was used for source inspection and local verification. Source location and cookie notices were dismissed to inspect the US English catalog. Cookie preferences were declined individually, then confirmed. Both desktop and mobile pages were scrolled to the lower content and footer to load media.

Observed structures and states include desktop navigation, mobile navigation, the mobile Sport submenu, sort options, filter hiding/showing, filter disclosures, the mobile filter sheet, search suggestions, product color variants, footer sections, and the location selector. Source evidence is stored in the `source-*.png`, `source-dom.json`, `catalog-extracted.json`, and `source-ncss.css` files.

| Rule | Observed and implemented |
| --- | --- |
| Desktop header | 36px utility bar, 60px primary navigation, 60px promotional strip |
| Desktop page gutter | 48px |
| Desktop grid | Three fluid columns, sidebar, 16px image gaps |
| Desktop heading | 24px / 31.2px, Helvetica Now Text Medium |
| Desktop product type | 16px / 24px, Helvetica Now Text and Medium |
| Desktop first image at 1440px | x=308px, y=238px, width≈342.925px |
| Mobile | Two columns, 6px gap, horizontal categories, pickup row, filter chips |
| Mobile heading | 20px / 26px |
| Mobile product type | 14px / 20px, 16px price |
| Mobile first image | Source y≈394.6px; local y=395px |
| Campaign | Distinct source assets for desktop and mobile |

Real Helvetica Now Text, Helvetica Now Text Medium, and Nike Futura font files are stored locally. The asset map records original URLs. All downloaded JPG-named files were decoded and checked for usable dimensions with Sharp; none failed. File extensions do not determine the actual source encoding.

## Successfully reproduced

- Main desktop/mobile catalog geometry, typography, product photography, colors, and visible product copy.
- 48 unique captured products, their available captured color variants, prices, labels, campaign, and ten related stories. The source extraction contained 72 cards because lazy loading temporarily duplicated 24 cards; rendering deduplicates by product URL.
- All captured desktop primary navigation menu content and destinations, responsive mobile drawer, Sport submenu with Back action, search suggestions and Nike search submission, account/favorites/bag outbound links.
- Sort choices: Featured, Newest, Price High–Low, Price Low–High. Price sorting uses the captured current price, with the original price struck through when present.
- Desktop filter visibility and disclosure groups; mobile filter sheet with draft selections, Clear and Apply.
- Local filtering by captured color descriptions, price, sale pricing, product name/brand, collection name, and broad sport descriptions. These operate on the finite snapshot.
- Product color thumbnails update the displayed product image.
- Related-story navigation, footer links, mobile footer disclosures, and location/language controls.
- English LTR and an added Persian RTL interface, with language persistence after reload. Product names retain their original English text and bidi direction. The Persian interface is an extension requested for this clone; Nike did not expose Persian in the inspected location selector.

## Browser verification

Compared source and clone at configured CSS viewports 390×844, 1440×900, and 1920×1080. Comparison images use equal-size source/local screenshot bitmaps; the built-in Browser's scrollbar and capture scaling can make bitmap dimensions differ from the configured CSS viewport.

- Ascending price order verified across the 48-card snapshot, starting at $75 and ending at $305.
- Mobile descending price order verified, beginning $305, $270, $220.
- Black color filtering produced 36 captured products; Clear restored the snapshot.
- Desktop sidebar toggle, mega-menu, backdrop dismissal, search open/cancel, and product color selection exercised.
- Mobile menu, Sport submenu, Back, close, filter sheet, sorting, Apply, pickup handoff dialog, and footer Help disclosure exercised.
- Persian `lang=fa`, `dir=rtl`, persistence after reload, and switching back to English verified.
- No document horizontal overflow at the tested widths.
- No console errors in the final fresh mobile verification session after duplicate cards were removed.
- Image file integrity and dimensions checked across downloaded media.

Representative evidence:

- `comparison-desktop.png`: original and clone, 1440×900 configured viewport.
- `comparison-mobile.png`: original and clone, 390×844 configured viewport.
- `comparison-wide.png`: original and clone, 1920×1080 configured viewport.
- `clone-mobile-fa-390x844.png`: Persian RTL state.
- `source-mobile-sport.png` and `clone-mobile-sport.png`: inspected/reproduced Sport submenu.
- `clone-mobile-filters.png`, `clone-desktop-menu.png`, and `clone-desktop-stories.png`: interaction and lower-page evidence.

## Manual corrections made during comparison

1. Resolved SVG namespaces so extracted Nike/Jordan/Converse icons decode correctly.
2. Replaced the initial campaign crop with Nike's distinct desktop asset.
3. Matched card offsets, font metrics, status color, thumbnail fading, and product spacing.
4. Corrected wide-screen navigation centering.
5. Corrected category destinations so they point to men's categories rather than similarly named links elsewhere in the source navigation.
6. Removed duplicated lazy-loaded cards that caused React key errors and unstable sorting.
7. Fixed menu backdrop dismissal so pointer movement cannot accidentally open a product beneath it.
8. Added scroll locking for the mobile drawer/search, and corrected desktop footer disclosures so all columns are visible.
9. Configured Next.js's documented loopback development origin and separated development from final production build verification.

## Limits and remaining differences

This is a close visual recreation of the inspected catalog snapshot, not a complete Nike commerce implementation or a claim of pixel-perfect equivalence.

- Nike's live count changed from 790 to 791 during inspection. The default heading retains the original 790 snapshot count; 48 unique products are stored locally. The remaining live inventory and infinite catalog pagination are not reproduced. The page provides a real Nike destination for the full catalog.
- Live stock, store lookup, authentication, favorites storage, bag, checkout, and NikeAI remain on Nike. The pickup dialog offers a Nike store-finder handoff; it does not return invented availability.
- Size, shoe height, closure, and width metadata were not available in the captured cards. Their choices are shown disabled with a working Nike availability/options link. Other filters use the captured descriptive text and are less precise than Nike's backend facets.
- Newest groups products marked “Just In”; no unpublished release timestamps are invented.
- Search displays captured popular terms and submits to Nike. It does not implement live Nike suggestions or NikeAI locally.
- Location country lists are abbreviated. English/Persian switching is local; other regions lead to Nike's location selector. Persian translation covers the core interface, while product names, some secondary labels, and editorial copy remain English.
- Initial geolocation/cookie consent dialogs and Nike's consent backend are not recreated; comparison uses the source after those notices were dismissed.
- Promotion Previous/Next controls work. The source's automatic rotation timing is not reproduced.
- Some auxiliary icons, menu dismissal timing, regional overlays, and lower-page spacing/crops remain approximate.
- Out-of-scope navigation deliberately leaves the local app for the original Nike destination. No purchase or account action was performed.

## Validation

**Result: both final check suites passed with exit code 0.** The Nike app passed lint with no warnings, TypeScript, and production build. The repository passed with 12 advisory image warnings and no errors.

Final check logs are saved as `validation-nike.txt` and `validation-repository.txt`.

Both app and repository checks run ESLint, TypeScript, and a production build. The root app is checked separately from the isolated Nike app. Root lint reports advisory `no-img-element` warnings for Nike's intentionally direct local asset rendering; the Nike app's own ESLint configuration explicitly permits that rendering strategy.

No manual correction is required from the user to view the current preview. Extending the finite catalog or connecting genuine commerce services would require separately scoped work.

Final production preview health: HTTP 200, 48 unique product cards, 10 related stories, zero document horizontal overflow, and no errors in the fresh preview console. `final-preview.png` records the delivered local page.
