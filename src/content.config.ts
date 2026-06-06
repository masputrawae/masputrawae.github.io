import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"
import path from "path"
import { generateId } from "@utils/generate-id"

const contentDir = path.resolve("registry/content")
const pageType = z.enum([
  "BlogPosting",
  "Article",
  "NewsArticle",
  "Person",
  "AboutPage",
  "WebPage",
  "WebSite",
  "CollectionPage",
])

const schema = z.object({
  title: z.string(),
  description: z.string(),

  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),

  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),

  pinned: z.boolean().default(false),
  draft: z.boolean().default(false),
  pageType: pageType,
})

export const collections = {
  // Section
  section: defineCollection({
    loader: glob({
      base: contentDir,
      pattern: "**/*_index.md",
      generateId: ({ entry }) => generateId(entry)
    }),
    schema: schema.extend({
      pageType: pageType.default("CollectionPage"),
    }),
  }),

  // Page
  page: defineCollection({
    loader: glob({
      base: contentDir,
      pattern: ["**/*.md", "!**/*_index.md"],
      generateId: ({ entry }) => generateId(entry)
    }),
    schema: schema.extend({
      pageType: pageType.default("BlogPosting"),
    }),
  }),
}
