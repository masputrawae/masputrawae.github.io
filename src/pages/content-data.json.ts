import type { APIContext } from 'astro'

import { relUrl } from '../utils/urls'
import { getCollection } from 'astro:content'

export async function GET({}: APIContext) {
	const content = await getCollection('vault')
	const indexData = Object.values(content).map((post) => ({
		title: post.data.title,
		slug: relUrl(post.id)
	}))

	return new Response(JSON.stringify(indexData), {
		headers: {
			'Content-Type': 'application/json'
		}
	})
}
