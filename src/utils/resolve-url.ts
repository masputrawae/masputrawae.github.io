// PATH: ./src/utils/resolve-url.ts

import path from "path"
const { SITE, BASE_URL } = import.meta.env

/**
 * Resolves a path to a relative URL, accounting for Astro's `base` configuration.
 * Useful for links within the site to ensure they work in sub-path deployments.
 *
 * @example relURL('about') -> '/about/' (if base is '/')
 * @example relURL('about') -> '/blog/about/' (if base is '/blog')
 */

export function relURL(raw?: string): string {
  if (!raw) return BASE_URL

  if (/^(?:[a-z]+:|\/\/|#)/i.test(raw)) return raw

  const n = path.posix.join(BASE_URL, raw.replace(/^\/+/, ""))
  return n
}

/**
 * Resolves a path to an absolute URL, accounting for Astro's `site` and `base` configuration.
 * Useful for SEO tags, RSS feeds, and sitemaps.
 *
 * @example absURL('rss.xml') -> 'https://example.com/rss.xml'
 */
export function absURL(raw?: string | URL): string {
  if (!raw) return SITE

  const n = raw.toString()

  // If the path is already an absolute URL, return it
  if (n.startsWith("http://") || n.startsWith("https://") || n.startsWith("//")) {
    return n
  }

  try {
    // Combine site with the base-aware relative URL
    // relURL(path) ensures the path starts with BASE_URL (e.g., / or /blog/)
    return new URL(relURL(n), SITE).toString()
  } catch (error) {
    // Fallback if URL construction fails
    return n
  }
}
