import { defineCollection, z } from 'astro:content'
import { glob, file } from 'astro/loaders'

const vault = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/Vault' }),
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()),
		date: z.coerce.date(),
    
		topic: z.array(z.string()).optional(),
    description: z.string().optional(),
    update: z.coerce.date().optional(),
    thumbnail: z.string().optional(),
    featured: z.boolean().optional(),
    type: z.enum(["Projects"]).optional(),
	})
})

const topic = defineCollection({
	loader: file('src/content/Data/topic.json'),
	schema: z.object({
		title: z.string(),
		thumbnail: z.string(),
		description: z.string()
	})
})


export const collections = { vault, topic }