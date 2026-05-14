// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import pagefind from 'astro-pagefind';

import remarkWikiLink from './src/plugins/remark-wiki-link';
import remarkCallout from '@r4ai/remark-callout';

// path
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.DEV ? 'http://localhost:4321' : 'https://masputrawae.github.io',
  base: '/',

  integrations: [sitemap(), mdx(), icon(), pagefind()],

  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light-high-contrast',
        dark: 'github-dark-high-contrast',
      },
    },
    remarkPlugins: [remarkWikiLink, remarkCallout],
  },

  // Turned off (because of annoyance)
  devToolbar: {
    enabled: false,
  },

  vite: {
    plugins: [tailwindcss()],
    publicDir: path.resolve(__dirname, './registry/public/'),
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@assets': path.resolve(__dirname, './registry/assets'),
        '@config': path.resolve(__dirname, './site.config.ts'),
      },
    },
  },

  fonts: [
    {
      // IBM Plex Sans (Backup): 'IBM Plex Sans'
      provider: fontProviders.google(),
      name: 'Public Sans',
      cssVariable: '--font-sans',
      weights: [400, 500, 600, 700],
      formats: ['woff2', 'otf', 'ttf'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-serif',
      weights: [400, 700],
      formats: ['woff2', 'otf', 'ttf'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      weights: [400, 700],
      formats: ['woff2', 'otf', 'ttf'],
    },
  ],
});
