/**
 * config on astro.config.mjs
 * {
 *  site: "...",
 *  base: "..."
 * }
 * 
*/
const { BASE_URL, SITE } = import.meta.env

/**
 * Convert relative path to site-relative URL
 */
export function relURL(raw: string): string {
  if (!raw) return BASE_URL
  const base = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/'
  const normalized = raw.replace(/^\/+/, '')
  return base + normalized
}

/**
 * Convert relative path to absolute URL
 */
export function absURL(raw?: string): string {
  if (!raw) return SITE
  try {
    return new URL(raw, SITE).toString()
  } catch {
    return SITE
  }
}
