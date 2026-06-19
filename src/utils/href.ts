// Base-aware internal links. Astro rewrites asset URLs for `base`, but NOT href
// strings in markup — so all internal links go through here. Works at root
// (base '/') and under a project-pages subpath (base '/latent-image/').
const BASE = import.meta.env.BASE_URL;

export function href(path = '/'): string {
  // Leave anchors, external URLs, mailto, etc. untouched.
  if (!path.startsWith('/')) return path;
  // BASE is '/' (root) or '/latent-image/' (project site); strip trailing slash
  // then prefix. path always starts with '/', so the result is always valid.
  const base = BASE.replace(/\/$/, '');
  return base + path;
}
