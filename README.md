# Latent Image

A personal site that reads like a literary journal and shows photographs like a
monograph — long-form **writing** and photographic **series** under one quiet,
darkroom-neutral interface. Built to last: content is files in git, fonts are
self-hosted, output is static.

Built per [`design_brief.md`](./design_brief.md).

## Develop

Requires **Node 22+** (an `.nvmrc` pins it — run `nvm use`).

```sh
nvm use            # Node 22
npm install
npm run dev        # http://localhost:4321/latent-image/
npm run cms        # local visual admin at /latent-image/keystatic
npm run build      # static output -> dist/
npm run preview    # serve the build
npx astro check    # type-check
```

## Managing content (Keystatic)

`npm run cms` opens a visual admin (Keystatic) at
`http://localhost:4321/latent-image/keystatic`. Add/edit **photo series** and
**notes** there — upload photos, write captions/EXIF, reorder, set the cover —
and it writes the Markdown + images straight into the repo. Then commit and push;
the GitHub Action redeploys.

The admin is **local only**: it needs a server, and GitHub Pages is static, so it
is never part of the deployed build (gated behind the `KEYSTATIC` flag in
`astro.config.mjs`). To edit from any browser later, point the same repo at
**Keystatic Cloud** or host the admin on a small SSR deploy (Vercel/Netlify) in
Keystatic's GitHub storage mode — no content changes needed.

> Essays (`src/content/posts`) use custom `<Sidenote>`/`<PullQuote>` components
> and are edited in code for now (Keystatic component-blocks can be added later).

## Writing

- **Essays** — `src/content/posts/*.mdx`. Frontmatter: `title`, `description`,
  `pubDate`, optional `dropcap`, `toc`, `tags`, `hero`/`heroAlt`.
  In the prose you can use `<Sidenote>…</Sidenote>` (margin note → mobile footnote)
  and `<PullQuote>…</PullQuote>`.
- **Notes** (shortform) — `src/content/notes/*.md`. Rendered on the writing index.

## Photography

Easiest: use the CMS (`npm run cms`). By hand, a series is one folder:

1. Create `src/content/series/<series-id>/` and put photographs in it.
2. Add `src/content/series/<series-id>/index.mdx` (the folder name **is** the id).
   List `cover`, `coverAlt`, and `photos[]` (each: `file`, `alt`, optional
   `caption`, `exif`) — `file`/`cover` are just filenames within the folder. The
   body MDX is the series intro.

Images are processed at build into AVIF + WebP with responsive `srcset` and a
blurred LQIP (the "latent" state photographs develop out of). Alt text is
required; dimensions are always set (no layout shift). Export **sRGB**.

> The demo series uses generated tonal **placeholders**
> (`scripts/gen-placeholder-photos.mjs`). Replace the images in
> `src/content/series/*/` with real photographs and clear `placeholderNote` from
> the series (the CMS has a checkbox for it).

## Structure

- `src/styles/tokens.css` — palette + type scale, the single source of truth.
- `src/styles/fonts.css` + `src/fonts/*.woff2` — self-hosted Newsreader + JetBrains Mono.
- `src/layouts/` — `Base` (head, theme, view transitions), `Post` (reading machine).
- `src/components/` — `Figure`, `Gallery`, `Lightbox`, `Sidenote`, `TableOfContents`,
  `ReadingProgress`, `Wordmark`, `ThemeToggle`, `Nav`, `Footer`.
- `src/utils/series.ts` — resolves photos → image + LQIP (the one file to change
  if photos ever move to a CDN).

## Before deploy

Set the real domain in [`astro.config.mjs`](./astro.config.mjs) (`SITE`) — it
drives canonical URLs, the sitemap, and `/rss.xml`. Deploy `dist/` as static
(Cloudflare Pages / Netlify / Vercel).
