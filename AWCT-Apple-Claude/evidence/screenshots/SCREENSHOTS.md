# Screenshots

Raw captures from the Browser tool during the session, copied unedited. Filenames are prefixed with
their capture order (`001_` … `127_`). Most are downscaled (0.35–0.6×) previews.

- `1-source-inspection/` (59 files): apple.com/iphone-18-pro only — desktop 1440×900 scroll-through,
  global-nav flyout, local-nav Explore panel, highlights carousel, product viewer, mobile 375×812
  views including the mobile menu.
- `2-comparison-and-testing/` (68 files): taken after the local preview started. Mostly pairs in the
  order clone (localhost:3000) then source (apple.com) at the same viewport and section offset, plus
  clone-only interaction tests (flyout, Explore panel, product viewer, Persian RTL pages, mobile menu).
  The tool did not record which tab each image came from in the filename; the pairing is by order.

Note: a few RTL screenshots in the comparison folder look horizontally shifted. That came from
scripted `scrollIntoView` in the emulated viewport; layout measurements at the time showed no
overflow, and wheel-scrolled captures of the same pages render correctly.
