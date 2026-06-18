import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
  Content collections (brief §7): files in git, durable + versioned.
    posts  — long-form essays (MDX, the reading machine)
    notes  — shortform writing
    series — photographic monographs (extended in the photography milestone)
*/

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      /* per-post controls for the reading machine */
      dropcap: z.boolean().default(false),
      toc: z.boolean().default(true),
      tags: z.array(z.string()).default([]),
      /* optional opening image */
      hero: image().optional(),
      heroAlt: z.string().optional(),
    }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const series = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/series' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      place: z.string().optional(),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      cover: image(),
      coverAlt: z.string(),
      /* ordered photographs; each carries alt (required) + optional caption/EXIF.
         EXIF is data, so it is rendered in the mono face. */
      photos: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
            exif: z
              .object({
                camera: z.string().optional(),
                lens: z.string().optional(),
                focal: z.string().optional(),
                shutter: z.string().optional(),
                aperture: z.string().optional(),
                iso: z.string().optional(),
              })
              .optional(),
          })
        )
        .default([]),
    }),
});

export const collections = { posts, notes, series };
