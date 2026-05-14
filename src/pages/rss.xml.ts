import type { APIContext } from 'astro';

import rss from '@astrojs/rss';

import { SITE } from '@config';
import { relURL } from '@utils/resolve-url';
import { getContents, getPages } from '@utils/content';

export async function GET(context: APIContext) {
  const pages = getPages(await getContents());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site || '',
    items: pages.map((post) => ({
      ...post.data,
      link: post.data.link || relURL(post.id),
      categories: post.data.categories || post.data.tags,
      author: post.data.author || SITE.author,
    })),
    customData: `<language>${SITE.locale}</language>`,
  });
}
