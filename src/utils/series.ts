/*
  series.ts — resolves photo filenames (from series frontmatter) to optimisable
  ImageMetadata + an LQIP, using a single eager glob over the assets dir. Keeping
  this in one place means the series page, photography index, and home all share
  the same resolution and the CDN swap (brief §6) is a one-file change later.
*/
import type { ImageMetadata } from 'astro';
import { lqip } from './lqip';

const metas = import.meta.glob<ImageMetadata>(
  '/src/assets/series/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
  { eager: true, import: 'default' }
);

function keyFor(seriesId: string, file: string): string {
  return `/src/assets/series/${seriesId}/${file}`;
}

export function getImageMeta(seriesId: string, file: string): ImageMetadata {
  const key = keyFor(seriesId, file);
  const meta = metas[key];
  if (!meta) {
    throw new Error(
      `Photo not found: ${key}. Available: ${Object.keys(metas).join(', ')}`
    );
  }
  return meta;
}

export interface ResolvedPhoto {
  image: ImageMetadata;
  alt: string;
  caption?: string;
  exif?: Record<string, string | undefined>;
  lqip: string;
}

interface PhotoInput {
  file: string;
  alt: string;
  caption?: string;
  exif?: Record<string, string | undefined>;
}

export async function resolvePhotos(
  seriesId: string,
  photos: PhotoInput[]
): Promise<ResolvedPhoto[]> {
  return Promise.all(
    photos.map(async (p) => {
      const key = keyFor(seriesId, p.file);
      return {
        image: getImageMeta(seriesId, p.file),
        alt: p.alt,
        caption: p.caption,
        exif: p.exif,
        lqip: await lqip(key),
      };
    })
  );
}

export async function resolveCover(
  seriesId: string,
  file: string,
  alt: string
): Promise<ResolvedPhoto> {
  const key = keyFor(seriesId, file);
  return {
    image: getImageMeta(seriesId, file),
    alt,
    lqip: await lqip(key),
  };
}
