// @ts-check
import { defineConfig } from 'astro/config'
import { SITE_PARAMS } from './site.config'

import icon from 'astro-icon'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
	site: SITE_PARAMS.site,
	base: SITE_PARAMS.base,
	integrations: [icon()],
	vite: {
		plugins: [tailwindcss()]
	}
})
