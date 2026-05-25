import type { APIContext } from "astro"

import rss from "@astrojs/rss"
import { getAll, getPages } from "@utils/content"
import { CFG } from "@config"
import { relURL } from "@utils/resolve-url"

export async function GET(context: APIContext) {
  const pages = getPages(await getAll())

  return rss({
    title: CFG.title,
    description: CFG.description,
    site: context.site || "",
    items: pages.map((post) => ({
      ...post.data,
      link: relURL(post.id),
      categories: post.data.categories || post.data.tags,
      author: CFG.author,
    })),
    customData: `<language>${CFG.locale}</language>`,
  })
}
