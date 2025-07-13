// @ts-check
import { defineConfig } from 'astro/config'
import { SITE_PARAMS } from './site.config'

import icon from 'astro-icon'
import tailwindcss from '@tailwindcss/vite'
import brainDbAstro, { generateSlug } from '@braindb/astro'
import remarkCallout from '@r4ai/remark-callout'
import remarkRemoveHeading from './src/utils/remarkRemoveH1'

// https://astro.build/config
export default defineConfig({
	site: SITE_PARAMS.site,
	base: SITE_PARAMS.base,
  redirects: { '/': '/home/'},
	integrations: [
		brainDbAstro({
			root: 'src/content/vault',
      cache: true,
			source: '/',
			remarkWikiLink: true,
			git: false,
			url: (filePath, frontmatter) => {
				const slug = frontmatter.slug ? String(frontmatter.slug) : generateSlug(filePath)
				const cleanSlug = slug.replace(/^\/+/, '')
				return `${SITE_PARAMS.base}${cleanSlug}/`
			}
		}),
		icon()
	],
	vite: {
		plugins: [tailwindcss()]
	},
  markdown: {
    remarkPlugins: [remarkCallout, [remarkRemoveHeading, { depth: 1 }]]
  }
})
