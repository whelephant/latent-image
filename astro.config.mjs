// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import node from '@astrojs/node';

// Keystatic is a LOCAL authoring tool (`npm run cms`), never part of the static
// GitHub Pages build. When this flag is off the site builds 100% static with no
// React/adapter/admin routes — exactly what gets deployed.
const KEYSTATIC = process.env.KEYSTATIC === 'true';

// Deployed to GitHub Pages as a project site: https://whelephant.github.io/latent-image/
// When a custom domain is ready, set SITE to it and BASE to '/' (then add a
// public/CNAME file) — the base-aware href() helper handles both cases.
const SITE = 'https://whelephant.github.io';
const BASE = '/latent-image';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // Keystatic doesn't support a non-root base; the CMS is local-only, so serve
  // it (and the dev preview) from root. Production keeps the project-site base.
  base: KEYSTATIC ? '/' : BASE,
  output: KEYSTATIC ? 'server' : 'static',
  adapter: KEYSTATIC ? node({ mode: 'standalone' }) : undefined,
  integrations: [mdx(), sitemap(), ...(KEYSTATIC ? [react(), keystatic()] : [])],
  // View transitions via <ClientRouter /> in the base layout (astro:transitions).
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  image: {
    // sharp is the default service; AVIF/WebP + responsive widths handled per-<Image>.
    responsiveStyles: true,
  },
});
