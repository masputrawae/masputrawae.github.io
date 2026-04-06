import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../consts.ts';
import { absURL } from '../utils/url';

export async function GET(context: any) {
  const pages = await getCollection('page');
  const sections = await getCollection('section');
  const all = [...pages, ...sections]
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: all.map((p) => ({
      ...p.data,
      link: absURL(p.id),
    })),
  });
}
