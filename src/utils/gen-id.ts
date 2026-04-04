import GithubSlugger from 'github-slugger'

export function genID(raw: string): string {
  if (!raw || !raw.trim()) return ''

  const slugger = new GithubSlugger()

  let normalized = raw.trim()

  normalized = normalized.replace(/\/+$/, '')
  normalized = normalized.replace(/\.(md|mdx)$/i, '')
  normalized = normalized.replace(/([_]?index)$/i, '')

  const parts = normalized
    .split('/')
    .filter(Boolean)
    .map((p) => slugger.slug(p))

  return normalized != '' ? parts.join('/') : '/'
}
