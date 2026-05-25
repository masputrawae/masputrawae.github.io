import { getCollection, type CollectionEntry } from "astro:content"

// caches
let cachedContents: CollectionEntry<"content">[] | null = null
let cachedPages: CollectionEntry<"content">[] | null = null
let cachedSections: CollectionEntry<"content">[] | null = null
let cachedSectionsWithPages: Map<string, CollectionEntry<"content">[]> | null =
  null

const { DEV } = import.meta.env

function isIndexFile(filePath?: string): boolean {
  if (!filePath) return false
  return (
    /[\\/](_?index)\.(md|mdx)$/.test(filePath) ||
    /^(_?index)\.(md|mdx)$/.test(filePath)
  )
}

export async function getAll(): Promise<CollectionEntry<"content">[]> {
  if (!DEV && cachedContents) return cachedContents

  const entries = await getCollection("content")
  const result = entries.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  )

  if (!DEV) cachedContents = result
  return result
}

// find sections only (_index or index)
export function getSections(
  entries: CollectionEntry<"content">[]
): CollectionEntry<"content">[] {
  if (!DEV && cachedSections) return cachedSections
  const items = entries.filter(({ filePath }) => isIndexFile(filePath))
  if (!DEV) cachedSections = items
  return items
}

// find pages only (!_index or !index)
export function getPages(
  entries: CollectionEntry<"content">[]
): CollectionEntry<"content">[] {
  if (!DEV && cachedPages) return cachedPages
  const items = entries.filter(({ filePath }) => !isIndexFile(filePath))
  if (!DEV) cachedPages = items
  return items
}

export function getSectionsWithPages(
  sections: CollectionEntry<"content">[],
  contents: CollectionEntry<"content">[]
): Map<string, CollectionEntry<"content">[]> {
  if (!DEV && cachedSectionsWithPages) return cachedSectionsWithPages

  const results = new Map<string, CollectionEntry<"content">[]>()

  for (const s of sections) {
    results.set(s.id, [])
  }

  for (const c of contents) {
    if (isIndexFile(c.filePath)) continue

    const parts = c.id.split("/").filter(Boolean)
    if (parts.length < 2) continue

    const sectionPath = parts.slice(0, -1).join("/")

    if (results.has(sectionPath)) {
      results.get(sectionPath)!.push(c)
    }
  }

  if (!DEV) cachedSectionsWithPages = results
  return results
}

// clear all cached
export function clearContentCache() {
  cachedContents = null
  cachedPages = null
  cachedSections = null
  cachedSectionsWithPages = null
}
