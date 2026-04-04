// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321",
  base: "/",

  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [mdx(), sitemap(), icon()],
});
