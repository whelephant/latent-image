import { config, fields, collection } from '@keystatic/core';

/*
  Keystatic — a local visual admin for managing the portfolio (run `npm run cms`,
  open /keystatic). It writes Markdown/MDX + images straight into the repo, so
  the files-in-git model is preserved; you then commit + push and the GitHub
  Action redeploys.

  Scope for now: photo SERIES (the portfolio) and NOTES. Essays live in
  src/content/posts and use custom <Sidenote>/<PullQuote> components, which need
  Keystatic component-blocks to edit safely — added as a follow-up, so they stay
  code-edited for the moment.

  Field names + the folder layout mirror src/content.config.ts exactly so
  Keystatic round-trips the existing files.
*/

const exifField = fields.object(
  {
    camera: fields.text({ label: 'Camera' }),
    lens: fields.text({ label: 'Lens' }),
    focal: fields.text({ label: 'Focal length' }),
    shutter: fields.text({ label: 'Shutter' }),
    aperture: fields.text({ label: 'Aperture' }),
    iso: fields.text({ label: 'ISO' }),
  },
  { label: 'EXIF (camera data — set in mono)' }
);

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Latent Image' },
    navigation: {
      Portfolio: ['series'],
      Writing: ['notes'],
    },
  },
  collections: {
    series: collection({
      label: 'Photo series',
      slugField: 'title',
      // Folder-per-series; uploaded images are stored entry-relative (next to
      // index.mdx), so each photo value is just its filename.
      path: 'src/content/series/*/',
      format: { contentField: 'intro' },
      entryLayout: 'content',
      columns: ['title', 'date'],
      schema: {
        title: fields.slug({
          name: { label: 'Title', validation: { isRequired: true } },
        }),
        description: fields.text({
          label: 'Short description',
          multiline: true,
          validation: { isRequired: true },
        }),
        date: fields.date({ label: 'Date', validation: { isRequired: true } }),
        place: fields.text({ label: 'Place' }),
        featured: fields.checkbox({
          label: 'Feature on home page',
          defaultValue: false,
        }),
        placeholderNote: fields.checkbox({
          label: 'Show "these are placeholders" note',
          defaultValue: false,
        }),
        draft: fields.checkbox({ label: 'Draft (hide from site)', defaultValue: false }),
        cover: fields.image({
          label: 'Cover photograph',
          validation: { isRequired: true },
        }),
        coverAlt: fields.text({
          label: 'Cover alt text',
          validation: { isRequired: true },
        }),
        photos: fields.array(
          fields.object({
            file: fields.image({
              label: 'Photograph',
              validation: { isRequired: true },
            }),
            alt: fields.text({
              label: 'Alt text (required)',
              validation: { isRequired: true },
            }),
            caption: fields.text({ label: 'Caption' }),
            exif: exifField,
          }),
          {
            label: 'Photographs',
            itemLabel: (p) => p.fields.alt.value || 'Photograph',
          }
        ),
        intro: fields.mdx({ label: 'Series intro' }),
      },
    }),

    notes: collection({
      label: 'Notes',
      slugField: 'title',
      path: 'src/content/notes/*',
      format: { contentField: 'content' },
      columns: ['title', 'pubDate'],
      schema: {
        title: fields.slug({
          name: { label: 'Title', validation: { isRequired: true } },
        }),
        pubDate: fields.date({ label: 'Published', validation: { isRequired: true } }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (p) => p.value,
        }),
        content: fields.mdx({ label: 'Note' }),
      },
    }),
  },
});
