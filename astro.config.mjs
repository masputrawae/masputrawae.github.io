// @ts-check
import { defineConfig } from "astro/config"

import tailwindcss from "@tailwindcss/vite"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import path from "path"
import pagefind from "astro-pagefind"

// plugins
import remarkWikiLink from "./src/plugins/remark-wiki-link"
import remarkReadingTime from "./src/plugins/remark-reading-time"
import remarkCallout from "@r4ai/remark-callout"

const root = process.cwd()

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.PROD
    ? "https://masputrawae.github.io"
    : "http://localhost:4321",
  base: "/",

  integrations: [mdx(), sitemap(), pagefind()],
  vite: {
    plugins: [tailwindcss()],
    publicDir: path.resolve(root, "./vault/assets"),
    resolve: {
      alias: {
        "@components": path.resolve(root, "./src/components"),
        "@layouts": path.resolve(root, "./src/layouts"),
        "@utils": path.resolve(root, "./src/utils"),
        "@styles": path.resolve(root, "./src/styles"),
        "@config": path.resolve(root, "./site.config.ts"),
        "@assets": path.resolve(root, "./vault/assets"),
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
      [
        remarkWikiLink,
        {
          assetsAlias: "@assets",
          baseURL: "/",
          contentDir: "vault/content",
          assetsDir: "vault/assets",
        },
      ],
      remarkReadingTime,
      remarkCallout,
    ],
  },

  // Turned off (because of annoyance)
  devToolbar: {
    enabled: false,
  },
})
