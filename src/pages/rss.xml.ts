import rss from '@astrojs/rss';
import { relURL } from '../lib/resolve-url';
import { SITE } from '../../site.config';
import { getContents } from '../lib/content';
import { getEntry, type CollectionEntry } from 'astro:content';

export async function GET(context: any) {
  const posts = await getContents();
  const index = await getEntry('content', '/') as CollectionEntry<'content'>

  return rss({
    title: SITE.title,
    description: index.data.description,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: relURL(post.id),
      author: SITE.author.name,
    })),
  });
}
