import { glob, file } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const defaultSchema = z.object({
  id: z.string(),
  title: z.string(),
  created: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).optional(),
})

const inbox = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/docs/001_inbox' }),
  schema: defaultSchema,
})

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/docs/002_notes' }),
  schema: defaultSchema,
})

const published = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/docs/003_published' }),
  schema: defaultSchema.extend({
    description: z.string().optional(),
    image: z.string().optional(),
  }),
})

export const collections = { inbox, notes, published }
