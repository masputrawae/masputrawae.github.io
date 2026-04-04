import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, type ImageFunction } from "astro:content";

import { SITE } from "./consts";
import { genID } from "./utils/gen-id";

// ----- Schema -----
const schema = ({ image }: { image: ImageFunction }) => z.object({
  title: z.string(),
  description: z.string(),

  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  heroImage: z.optional(image()),

  pubDate: z.coerce.date().optional(),
  updatedDate: z.coerce.date().optional(),

  draft: z.boolean().optional().default(false)
})

// ----- Page -----
const page = defineCollection({
  loader: glob({
    pattern: ["**/*{md,mdx}", "!**/*_index.{md,mdx}"],
    base: SITE.contentDir,
    generateId: ({ entry }) => genID(entry)
  }),
  schema: schema
})

// ----- Section -----
const section = defineCollection({
  loader: glob({
    pattern: ["**/*_index.{md,mdx}"],
    base: SITE.contentDir,
    generateId: ({ entry }) => genID(entry)
  }),
  schema: schema
})

export const collections = { page, section }
