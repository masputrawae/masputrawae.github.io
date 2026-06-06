import type { APIContext } from "astro"

import rss from "@astrojs/rss"
import { relURL } from "@utils/resolve-url"
import { getCollection } from "astro:content"
import { AUTHOR, SITE } from "@site.config"

export async function GET(context: APIContext) {
  const pageEntries = await getCollection("page")
  const sectionEntries = await getCollection("section")
  const entries = [...pageEntries, ...sectionEntries]

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site || import.meta.env.SITE,
    items: entries.map((entry) => ({
      ...entry.data,
      link: relURL(entry.id),
      categories: entry.data.categories || entry.data.tags,
      author: AUTHOR.name,
    })),
    customData: `<language>${SITE.locale}</language>`,
  })
}
