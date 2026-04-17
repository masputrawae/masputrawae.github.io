import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'
import { genId } from './lib/gen-id'
import { SITE } from '../site.config'

const content = defineCollection({
  loader: glob({
    base: `${SITE.vaultDir}/content`,
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) => genId(entry)
  }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),

    updatedDate: z.coerce.date().optional(),

    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),

    pinned: z.boolean().default(false),
    draft: z.boolean().default(false),
    weight: z.number().default(0),

    cover: image().optional()
  })
})

export const collections = { content }
