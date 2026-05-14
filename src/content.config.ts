import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { generateId } from '@utils/generate-id';
import { rssSchema } from '@astrojs/rss';

const content = defineCollection({
  loader: glob({
    base: 'registry/content',
    pattern: '**/*.{md,mdx}',
    generateId: ({ entry }) => generateId(entry),
  }),
  schema: rssSchema.extend({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date().default(new Date()),

    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),

    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { content };
