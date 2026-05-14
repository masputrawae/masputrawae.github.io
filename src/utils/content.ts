import { getCollection, type CollectionEntry } from 'astro:content';

// caches
let cachedContents: CollectionEntry<'content'>[] | null = null;
let cachedPages: CollectionEntry<'content'>[] | null = null;
let cachedSections: CollectionEntry<'content'>[] | null = null;
let cachedSectionsWithPages: Map<string, CollectionEntry<'content'>[]> | null = null;

const { DEV } = import.meta.env;

function isIndexFile(filePath?: string): boolean {
  if (!filePath) return false;
  return (
    filePath.endsWith('_index.md') ||
    filePath.endsWith('_index.mdx') ||
    filePath.endsWith('index.md') ||
    filePath.endsWith('index.mdx')
  );
}

export async function getContents(): Promise<CollectionEntry<'content'>[]> {
  if (!DEV && cachedContents) return cachedContents;

  try {
    const entries = await getCollection('content');
    const now = Date.now();

    const result = entries
      .filter((e) => !e.data.draft && e.data.pubDate.getTime() <= now && e.id !== '/')
      .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

    if (!DEV) cachedContents = result;

    return result;
  } catch (error) {
    console.error('Error fetching content:', error);
    return [];
  }
}

// find sections only (_index or index)
export function getSections(entries: CollectionEntry<'content'>[]): CollectionEntry<'content'>[] {
  if (!DEV && cachedSections) return cachedSections;
  const items = entries.filter(({ filePath }) => isIndexFile(filePath));
  if (!DEV) cachedSections = items;
  return items;
}

// find pages only (!_index or index)
export function getPages(entries: CollectionEntry<'content'>[]): CollectionEntry<'content'>[] {
  if (!DEV && cachedPages) return cachedPages;
  const items = entries.filter(({ filePath }) => !isIndexFile(filePath));
  if (!DEV) cachedPages = items;
  return items;
}

// get sections with pages
export function getSectionsWithPages(
  sections: CollectionEntry<'content'>[],
  contents: CollectionEntry<'content'>[],
): Map<string, CollectionEntry<'content'>[]> {
  if (!DEV && cachedSectionsWithPages) return cachedSectionsWithPages;

  let sectionWithPages = new Map<string, CollectionEntry<'content'>[]>();

  // 1. Inisialisasi semua section
  for (const s of sections) {
    sectionWithPages.set(s.id, []);
  }

  // 2. Loop semua pages sekali
  for (const c of contents) {
    const entryPath = c.id;

    // ambil parent path
    const parts = entryPath.split('/').filter(Boolean);

    // kalau cuma 1 level, berarti dia tidak punya parent section
    if (parts.length < 2) continue;

    const sectionPath = parts.slice(0, -1).join('/');

    // ⚠️ ini penting: hanya ambil direct child
    const remainder = parts.slice(sectionPath.split('/').length);

    if (remainder.length > 1) continue;

    // masukkan ke section kalau ada
    if (sectionWithPages.has(sectionPath)) {
      sectionWithPages.get(sectionPath)!.push(c);
    }
  }

  cachedSectionsWithPages = sectionWithPages;
  return sectionWithPages;
}

// clear all cached
export function clearContentCache() {
  cachedContents = null;
  cachedPages = null;
  cachedSections = null;
}
