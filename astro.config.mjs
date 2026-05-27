// @ts-check
import { CFG } from "./site.config.ts"
import { defineConfig } from "astro/config"

import tailwindcss from "@tailwindcss/vite"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import path from "path"
import pagefind from "astro-pagefind"

// plugins
import remarkCallout from "@r4ai/remark-callout"
import remarkWikiLink from "./src/plugins/remark-wiki-link"
import remarkReadingTime from "./src/plugins/remark-reading-time"
import remarkRelativePath from "./src/plugins/remark-relative-path.ts"

const { baseURL, assetDir, contentDir } = CFG

// https://astro.build/config
export default defineConfig({
  site: baseURL.origin,
  base: baseURL.pathname,
  integrations: [mdx(), sitemap(), pagefind()],
  vite: {
    plugins: [tailwindcss()],
    publicDir: path.resolve(assetDir),
    resolve: {
      alias: {
        "@components": path.resolve("./src/components"),
        "@layouts": path.resolve("./src/layouts"),
        "@utils": path.resolve("./src/utils"),
        "@styles": path.resolve("./src/styles"),
        "@config": path.resolve("./site.config.ts"),
        "@assets": path.resolve(assetDir),
      },
    },
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light-high-contrast",
        dark: "github-dark",
      },
    },
    remarkPlugins: [
      remarkRelativePath,
      [remarkWikiLink, { contentDir, assetDir }],
      remarkReadingTime,
      remarkCallout,
    ],
  },

  // Turned off (because of annoyance)
  devToolbar: {
    enabled: false,
  },
})
