// src/utils/tagCloud.js
import { getCollection } from 'astro:content'

export async function tagCloud() {
  const allPosts = await getCollection('vault')
  const allTags = allPosts.flatMap(item => item.data.tags || [])

  const tagMap = new Map()

  for (const tag of allTags) {
    tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
  }

  const tagArray = Array.from(tagMap, ([tag, count]) => ({ tag, count }))
  return tagArray.sort((a, b) => b.count - a.count)
}
