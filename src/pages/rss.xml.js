import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts';

// Valid feed covering the two page types with real URLs: essays and series
// (brief §4). Notes render within the writing index rather than as pages, so
// they are not given feed entries that would 404.
export async function GET(context) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const series = await getCollection('series', ({ data }) => !data.draft);

  const items = [
    ...posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/writing/${p.id}/`,
      categories: p.data.tags,
    })),
    ...series.map((s) => ({
      title: `${s.data.title} — photographs`,
      description: s.data.description,
      pubDate: s.data.date,
      link: `/photography/${s.id}/`,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items,
    customData: `<language>${SITE.locale}</language>`,
  });
}
