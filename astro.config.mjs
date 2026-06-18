// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Deployed to GitHub Pages as a project site: https://whelephant.github.io/latent-image/
// When a custom domain is ready, set SITE to it and BASE to '/' (then add a
// public/CNAME file) — the base-aware href() helper handles both cases.
const SITE = 'https://whelephant.github.io';
const BASE = '/latent-image';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  integrations: [mdx(), sitemap()],
  // View transitions via <ClientRouter /> in the base layout (astro:transitions).
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  image: {
    // sharp is the default service; AVIF/WebP + responsive widths handled per-<Image>.
    responsiveStyles: true,
  },
});
