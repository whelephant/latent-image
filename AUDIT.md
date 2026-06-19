# Audit & hardening pass — 2026-06-19

A multi-agent review (10 subsystem reviewers + adversarial double-verification +
a completeness critic) raised 62 findings; 51 survived verification (9 false
positives filtered, plus heavy de-duplication). All High and Medium issues and
the meaningful Low/nit issues were fixed. Summary below.

## High (all fixed)

1. **Theme flashed wrong on every in-site navigation.** `<ClientRouter />` wipes
   `<html>` attributes on swap and inline head scripts don't re-run, so
   `data-theme` was lost after each navigation → dark users reverted to light.
   Fixed with an `astro:before-swap` handler that copies the theme onto the
   incoming document. `src/layouts/Base.astro`
2. **ReadingProgress leaked scroll/resize listeners** across navigations (and
   double-bound on first load). Now uses an `AbortController` torn down on each
   re-wire; bound only via `astro:page-load`. `src/components/ReadingProgress.astro`
3. **Full-bleed figures (`100vw`) caused horizontal scroll** when a vertical
   scrollbar was present. Added `overflow-x: clip` on `body`. `src/styles/global.css`
4. **`breakout` figures shipped a too-small `sizes` hint** (blurry). Added a
   breakout `sizes` case. `src/components/Figure.astro`
5. **Multiple galleries collided** — per-gallery `data-index` restarted at 0, so
   the lightbox could open the wrong photo. Lightbox now identifies photos by DOM
   order across all gallery buttons. `src/components/Lightbox.astro`
6. **No keyboard path to zoom** in the lightbox. The image is now a focusable
   `role=button` with Enter/Space zoom (centre origin). `src/components/Lightbox.astro`
7. **RSS channel `<link>` omitted the base path.** Now built from the deployment
   base URL. `src/pages/rss.xml.js`
8. **Gallery nested `<figure>` inside `<button>`** (invalid HTML + double
   screen-reader announcement). Added a `bare` mode to `Figure` (renders a
   `<div>`, no `<figcaption>`); removed the redundant button `aria-label` so the
   image alt is the accessible name. `src/components/Gallery.astro`, `Figure.astro`

## Medium (all fixed)

- **TOC observer leaked** across navigations and **never highlighted the last
  heading** (narrow IO band). Replaced with rAF scroll tracking + AbortController.
- **Notes were unreachable** — listed as title-only text with no page/body. Now
  rendered inline in full on the writing index. `src/pages/writing/index.astro`
- **Latent reveal developed on load, not on viewport entry** (brief §3d). Now
  IntersectionObserver-driven. `src/components/Figure.astro`
- **Lightbox dialog had a static label**; caption/count weren't announced. Dialog
  label is now per-photo and the meta is an `aria-live` region.
- **Placeholder note pointed at the wrong directory** (`src/assets/series`). Fixed.
- **PullQuote applied an undefined `breakout` class.** Removed.

## Low / nit (fixed)

EXIF rendered in the brief's fixed order (camera→lens→focal→shutter→aperture→ISO);
lightbox body-scroll-lock now saves/restores prior value; swipe resets on
`pointercancel`/`pointerleave`; LQIP backdrop cleared after develop (no bleed
through transparency); `theme-color` meta tracks the chosen theme; **added a
styled `404` page**; progress bar moved under the nav (z-index); single-image
galleries hide the prev/next arrows; stale `src/assets/series` comments corrected;
`og:image` resolves with the base; dead `href()` fallback removed.

## Deliberately deferred (low value / needs a real asset)

- Default `og:image` for link previews — needs a real share image (or generated
  OG cards); noted as an enhancement.
- Hero LCP `<link rel=preload>` — marginal; image is already `fetchpriority=high`.
- Keystatic renames uploaded files to the field key — cosmetic; gallery order is
  driven by the `photos[]` array, not filenames, so ordering is unaffected.
- Sidenote toggle's generic `aria-label` and flow-vs-block YAML reformatting on
  first Keystatic edit — cosmetic.

## Verification

`npm run build` (7 pages, static) and `npx astro check` (0 errors) both clean;
preview-server curls confirm all routes 200, RSS channel link carries the base,
gallery renders valid `<div>` wrappers, and notes bodies render on the index.
