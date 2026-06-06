import path from "node:path"
import type { CollectionEntry } from "astro:content"

export type ContentEntry = CollectionEntry<"page" | "section">

export function generateSectionPage(
  sections: CollectionEntry<"section">[],
  contents: ContentEntry[]
): Map<string, ContentEntry[]> {
  const results = new Map<string, ContentEntry[]>()

  // Initialize the map with all available index sections
  for (const section of sections) {
    results.set(section.id, [])
  }

  // Group content entries under their parent sections
  for (const entry of contents) {
    const parts = entry.id.split("/").filter(Boolean)
    const sectionPath = path.join(parts.slice(0, -1).join("/"))
    if (results.has(sectionPath)) {
      results.get(sectionPath)!.push(entry)
    }
  }

  // Group sub-sections under their parent sections (for nested navigation)
  for (const section of sections) {
    const parts = section.id.split("/").filter(Boolean)
    const sectionPath = parts.slice(0, -1).join("/")

    if (results.has(sectionPath)) {
      results.get(sectionPath)!.push(section)
    }
  }

  return results
}
