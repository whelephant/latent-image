/*
  series.ts — resolves photo filenames (from series frontmatter) to optimisable
  ImageMetadata via one eager glob over the co-located images.
*/
import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';

const metas = import.meta.glob<ImageMetadata>(
  '/src/content/series/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
  { eager: true, import: 'default' }
);

function keyFor(seriesId: string, file: string): string {
  return `/src/content/series/${seriesId}/${file}`;
}

export function getImageMeta(seriesId: string, file: string): ImageMetadata {
  const meta = metas[keyFor(seriesId, file)];
  if (!meta) {
    throw new Error(
      `Photo not found: ${keyFor(seriesId, file)}. Available: ${Object.keys(metas).join(', ')}`
    );
  }
  return meta;
}

export interface ResolvedPhoto {
  image: ImageMetadata;
  alt: string;
  caption?: string;
  /** link target (series page) — used by the overview grid */
  series?: string;
}

interface PhotoInput {
  file: string;
  alt: string;
  caption?: string;
}

export function resolvePhotos(seriesId: string, photos: PhotoInput[]): ResolvedPhoto[] {
  return photos.map((p) => ({
    image: getImageMeta(seriesId, p.file),
    alt: p.alt,
    caption: p.caption,
  }));
}

export function resolveCover(seriesId: string, file: string, alt: string): ResolvedPhoto {
  return { image: getImageMeta(seriesId, file), alt };
}

/** Every photograph across all non-draft series, newest series first. */
export async function getAllPhotos(): Promise<ResolvedPhoto[]> {
  const all = (await getCollection('series', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  return all.flatMap((s) =>
    resolvePhotos(s.id, s.data.photos).map((p) => ({ ...p, series: s.id }))
  );
}
