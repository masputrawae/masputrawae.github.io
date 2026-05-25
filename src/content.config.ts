import { z } from "astro/zod"
import { glob } from "astro/loaders"
import { defineCollection } from "astro:content"
import { generateId } from "@utils/generate-id"

export const collections = {
  content: defineCollection({
    loader: glob({
      base: "vault/content",
      pattern: "**/*.{md,mdx}",
      generateId: ({ entry }) => generateId(entry),
    }),
    schema: z.object({
      title: z.string(),
      description: z.string(),

      categories: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
      aliases: z.array(z.string()).optional(),

      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),

      pinned: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
  }),
}
