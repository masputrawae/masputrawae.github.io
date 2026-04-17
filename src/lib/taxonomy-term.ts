// src/lib/taxonomy-term.ts

import { type CollectionEntry } from 'astro:content'

export interface Term {
  id: string
  count: number
}

export interface TaxonomyIndex {
  tags: Term[]
  categories: Term[]
  pagesByTag: Map<string, CollectionEntry<'content'>[]>
  pagesByCategory: Map<string, CollectionEntry<'content'>[]>
}

const isDev = import.meta.env.DEV

let cachedIndex: TaxonomyIndex | null = null

export function buildTaxonomyIndex(pages: CollectionEntry<'content'>[]): TaxonomyIndex {
  if (!isDev && cachedIndex) return cachedIndex

  const tagCount: Record<string, number> = {}
  const categoryCount: Record<string, number> = {}
  const pagesByTag = new Map<string, CollectionEntry<'content'>[]>()
  const pagesByCategory = new Map<string, CollectionEntry<'content'>[]>()

  const expandHierarchicalTerms = (terms: string[]) => {
    const expanded = new Set<string>()
    for (const term of terms) {
      const parts = term.split('/').filter(Boolean)

      for (let i = 0; i < parts.length; i++) {
        const result = parts.slice(0, i + 1).join('/')
        expanded.add(result)
      }
    }
    return expanded
  }

  for (const page of pages) {
    // ===== TAGS (hierarchical + dedupe per page) =====
    const rawTags = page.data.tags ?? []
    const rawCategories = page.data.categories ?? []

    const expandedTags = expandHierarchicalTerms(rawTags)
    for (const tag of expandedTags) {
      // count
      tagCount[tag] = (tagCount[tag] || 0) + 1

      // pages map
      if (!pagesByTag.has(tag)) pagesByTag.set(tag, [])
      pagesByTag.get(tag)!.push(page)
    }

    // ===== CATEGORIES =====
    const expandedCategories = expandHierarchicalTerms(rawCategories)
    for (const category of expandedCategories) {
      categoryCount[category] = (categoryCount[category] || 0) + 1

      // pages map
      if (!pagesByCategory.has(category)) pagesByCategory.set(category, [])
      pagesByCategory.get(category)!.push(page)
    }
  }

  const tags: Term[] = Object.entries(tagCount)
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count)

  const categories: Term[] = Object.entries(categoryCount)
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count)

  const result: TaxonomyIndex = {
    tags,
    categories,
    pagesByTag,
    pagesByCategory
  }

  if (!isDev) cachedIndex = result
  return result
}

// ===== GET PAGE BY TERM =====
export function clearTaxonomyCache() {
  cachedIndex = null
}
