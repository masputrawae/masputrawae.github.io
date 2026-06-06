// @ts-check
import { defineConfig, fontProviders } from "astro/config"

import tailwindcss from "@tailwindcss/vite"
import pagefind from "astro-pagefind"
import sitemap from "@astrojs/sitemap";
import path from "path"

import { unified } from "@astrojs/markdown-remark"

import remarkFrontmatter from "./src/plugins/remark-frontmatter"
import remarkRelativePath from "./src/plugins/remark-relative-path"
import remarkWikiLink from "./src/plugins/remark-wiki-link"
import remarkCallout from "@r4ai/remark-callout"

// https://astro.build/config
export default defineConfig({
  site: "http://masputrawae.github.io",
  base: "/",

  publicDir: path.resolve("registry/assets"),
  integrations: [sitemap(), pagefind()],
  vite: {
    plugins: [tailwindcss()],
  },

  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true
  },

  redirects: {
    "/tag": {
      status: 301,
      destination: "/explore/"
    },
    "/category": {
      status: 301,
      destination: "/explore/"
    },
    "/tags": {
      status: 301,
      destination: "/explore/"
    },
    "/categories": {
      status: 301,
      destination: "/explore/"
    }
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light-high-contrast",
        dark: "github-dark",
      },
    },

    processor: unified({
      remarkPlugins: [remarkFrontmatter, remarkRelativePath, remarkWikiLink, remarkCallout],
    }),
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Public Sans",
      cssVariable: "--font-sans",
      weights: [400, 600, 700],
      formats: ["woff2"],
      fallbacks: [
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji"
      ]
    }
  ]
})
