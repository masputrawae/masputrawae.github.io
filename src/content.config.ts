import { glob, file } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const vault = defineCollection({
	loader: glob({ pattern: '**/*.md', base: 'src/content/vault' }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		created: z.coerce.date(),
		updated: z.coerce.date(),
		tags: z.array(z.string()),
    description: z.string().optional(),
		image: z.string().optional(),
	})
})

export const collections = { vault }
