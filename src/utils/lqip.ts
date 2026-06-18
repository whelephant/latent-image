/*
  lqip.ts — build-time Low-Quality Image Placeholder generation (brief §6, §3d).
  Produces a tiny blurred base64 WebP per image. This is the performance
  placeholder that doubles as the "latent" state for the develop-on-scroll
  signature. Runs in Node during build/dev SSR; results are cached per path.
*/
import sharp from 'sharp';
import path from 'node:path';

const cache = new Map<string, Promise<string>>();

/** @param projectRelPath e.g. "/src/assets/series/foo/01.jpg" (glob key) */
export function lqip(projectRelPath: string): Promise<string> {
  let p = cache.get(projectRelPath);
  if (!p) {
    p = generate(projectRelPath);
    cache.set(projectRelPath, p);
  }
  return p;
}

async function generate(projectRelPath: string): Promise<string> {
  const abs = path.join(process.cwd(), projectRelPath.replace(/^\/+/, ''));
  const buf = await sharp(abs)
    .resize(28, 28, { fit: 'inside' })
    .blur(1.2)
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString('base64')}`;
}
