// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import { SITE } from './src/consts.ts'

import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'

import remarkCallout from '@r4ai/remark-callout'

// wikilink plugin
import { genID } from './src/utils/gen-id.ts'
import { relURL } from './src/utils/url.ts'

import FastGlob from 'fast-glob'
import wlPlugin from '@flowershow/remark-wiki-link'
import metaTags from 'astro-meta-tags'
import pagefind from 'astro-pagefind'
const files = FastGlob.sync('**/*', { cwd: SITE.contentDir })
const permalinks = Object.fromEntries(files.map((f) => [f, relURL(genID(f))]))

// https://astro.build/config
export default defineConfig({
  site: 'http://masputrawae.github.io',
  base: '/',

  image: {
    domains: ['astro.build'],
    remotePatterns: [{ protocol: 'https' }],
    layout: 'constrained',
    responsiveStyles: true
  },

  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [mdx(), sitemap(), icon(), metaTags(), pagefind()],

  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      }
    },
    remarkPlugins: [remarkCallout, [wlPlugin, { files, permalinks }]]
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-sans',
      weights: [400, 500, 600, 700]
    },
    {
      provider: fontProviders.google(),
      name: 'Noto Serif',
      cssVariable: '--font-serif',
      weights: [400, 700]
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: [400, 700]
    }
  ]
})
