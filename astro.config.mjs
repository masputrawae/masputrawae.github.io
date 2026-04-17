// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
import metaTags from 'astro-meta-tags'
import sentry from '@sentry/astro'
import spotlightjs from '@spotlightjs/astro'
import pagefind from 'astro-pagefind'

import { SITE } from './site.config'

import FastGlob from 'fast-glob'
import remarkWikiLink from '@flowershow/remark-wiki-link'
import remarkCallout from '@r4ai/remark-callout'

import { relURL } from './src/lib/resolve-url'
import { genId } from './src/lib/gen-id'
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs'

const files = FastGlob.sync('**/*', { cwd: SITE.vaultDir })
const permalinks = Object.fromEntries(
  files.map((f) => [f, relURL(genId(f.replace('content/', '')))])
)

// https://astro.build/config
export default defineConfig({
  site: SITE.baseURL.origin,
  base: SITE.baseURL.pathname,

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx(), sitemap(), icon(), metaTags(), sentry(), spotlightjs(), pagefind()],

  image: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [{ protocol: 'https' }],
    responsiveStyles: true,
    layout: 'constrained'
  },

  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      }
    },
    remarkPlugins: [remarkReadingTime, remarkCallout, [remarkWikiLink, { files, permalinks }]]
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
