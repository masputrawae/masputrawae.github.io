// src/lib/content.ts
import { getCollection, type CollectionEntry } from 'astro:content'

const isDev = import.meta.env.DEV

// caches
let cachedContents: CollectionEntry<'content'>[] | null = null
let cachedPages: CollectionEntry<'content'>[] | null = null
let cachedSections: CollectionEntry<'content'>[] | null = null
let cachedSectionsWithPages: Map<string, CollectionEntry<'content'>[]> | null = null

// check index file
function isIndexFile(filePath?: string): boolean {
  if (!filePath) return false
  return filePath.endsWith('_index.md') || filePath.endsWith('_index.mdx')
}

// get all markdown content
export async function getContents(): Promise<CollectionEntry<'content'>[]> {
  if (!isDev && cachedContents) return cachedContents
  try {
    const entries = await getCollection('content')
    const now = Date.now()

    const result = entries
      .filter(
        (e) =>
          !e.data.draft &&
          e.data.pubDate.getTime() <= now &&
          e.id !== '/'
      )
      .sort((a, b) => {
        const pinnedDiff = Number(b.data.pinned) - Number(a.data.pinned);
        if (pinnedDiff) return pinnedDiff;

        // 2. weight check dulu (tanpa arithmetic dulu)
        const aHasWeight = a.data.weight !== 0;
        const bHasWeight = b.data.weight !== 0;

        if (aHasWeight !== bHasWeight) {
          return aHasWeight ? -1 : 1;
        }

        // 3. kalau dua-duanya punya weight → baru bandingkan
        if (aHasWeight && bHasWeight) {
          if (a.data.weight !== b.data.weight) {
            return a.data.weight < b.data.weight ? -1 : 1;
          }
        }


        return b.data.pubDate.getTime() - a.data.pubDate.getTime()
      })

    if (!isDev) cachedContents = result

    return result
  } catch (error) {
    console.error('Error fetching content:', error)
    return []
  }
}

// get sections only (_index)
export function getSections(entries: CollectionEntry<'content'>[]): CollectionEntry<'content'>[] {
  if (!isDev && cachedSections) return cachedSections
  const items = entries.filter(({ filePath }) => isIndexFile(filePath))
  if (!isDev) cachedSections = items
  return items
}

// get pages only (!_index)
export function getPages(entries: CollectionEntry<'content'>[]): CollectionEntry<'content'>[] {
  if (!isDev && cachedPages) return cachedPages
  const items = entries.filter(({ filePath }) => !isIndexFile(filePath))
  if (!isDev) cachedPages = items
  return items
}

// get sections with pages
export function getSectionsWithPages(sections: CollectionEntry<'content'>[], contents: CollectionEntry<'content'>[]): Map<string, CollectionEntry<'content'>[]> {
  if (!isDev && cachedSectionsWithPages) return cachedSectionsWithPages

  let sectionWithPages = new Map<string, CollectionEntry<'content'>[]>()

  // 1. Inisialisasi semua section
  for (const s of sections) {
    sectionWithPages.set(s.id, [])
  }

  // 2. Loop semua pages sekali
  for (const c of contents) {
    const entryPath = c.id

    // ambil parent path
    const parts = entryPath.split('/').filter(Boolean)

    // kalau cuma 1 level, berarti dia tidak punya parent section
    if (parts.length < 2) continue

    const sectionPath = parts.slice(0, -1).join('/')

    // ⚠️ ini penting: hanya ambil direct child
    const remainder = parts.slice(sectionPath.split('/').length)

    if (remainder.length > 1) continue

    // masukkan ke section kalau ada
    if (sectionWithPages.has(sectionPath)) {
      sectionWithPages.get(sectionPath)!.push(c)
    }
  }
  cachedSectionsWithPages = sectionWithPages
  return sectionWithPages
}

// clear all cached
export function clearContentCache() {
  cachedContents = null
  cachedPages = null
  cachedSections = null
}

