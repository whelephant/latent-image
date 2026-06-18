// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Domain is not finalized yet — placeholder used for RSS/canonical/sitemap URLs.
// Swap this when the real domain is known. (see plan: "Open item to confirm")
const SITE = 'https://latent-image.example';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [mdx(), sitemap()],
  // View transitions via <ClientRouter /> in the base layout (astro:transitions).
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  image: {
    // sharp is the default service; AVIF/WebP + responsive widths handled per-<Image>.
    responsiveStyles: true,
  },
});
