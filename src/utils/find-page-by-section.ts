import { type CollectionEntry } from 'astro:content'

export function findPageBySection(
  id: string,
  entries: CollectionEntry<'page'>[]
): CollectionEntry<'page'>[] {
  const segments = (id || '').split('/').filter(Boolean)
  const currentPath = segments.join('/')

  if (!currentPath) {
    return entries.filter((e) => !(e.id as string).includes('/'))
  }

  return entries.filter((e) => {
    const id = e.id as string
    if (id === currentPath) return false
    if (!id.startsWith(currentPath + '/')) return false
    const remainder = id.slice(currentPath.length + 1)
    return !remainder.includes('/')
  })
}
