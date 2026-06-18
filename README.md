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
npm run dev        # http://localhost:4321
npm run build      # static output -> dist/
npm run preview    # serve the build
npx astro check    # type-check
```

## Writing

- **Essays** — `src/content/posts/*.mdx`. Frontmatter: `title`, `description`,
  `pubDate`, optional `dropcap`, `toc`, `tags`, `hero`/`heroAlt`.
  In the prose you can use `<Sidenote>…</Sidenote>` (margin note → mobile footnote)
  and `<PullQuote>…</PullQuote>`.
- **Notes** (shortform) — `src/content/notes/*.md`. Rendered on the writing index.

## Photography

A series is a content file plus a folder of images:

1. Put photographs in `src/assets/series/<series-id>/`.
2. Create `src/content/series/<series-id>.mdx` (the filename **is** the id).
   List `cover`, `coverAlt`, and `photos[]` (each: `file`, `alt`, optional
   `caption`, `exif`). The body MDX is the series intro.

Images are processed at build into AVIF + WebP with responsive `srcset` and a
blurred LQIP (the "latent" state photographs develop out of). Alt text is
required; dimensions are always set (no layout shift). Export **sRGB**.

> The demo series uses generated tonal **placeholders**
> (`scripts/gen-placeholder-photos.mjs`). Replace `src/assets/series/*` with real
> photographs and delete `placeholderNote: true` from the series frontmatter.

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
