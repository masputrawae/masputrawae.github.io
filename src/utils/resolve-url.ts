// PATH: ./src/utils/resolve-url.ts

import { CFG } from "../../site.config.ts"
import path from "path"

/**
 * Resolves a path to a relative URL, accounting for Astro's `base` configuration.
 * Useful for links within the site to ensure they work in sub-path deployments.
 *
 * @example relURL('about') -> '/about' (if base is '/')
 * @example relURL('about') -> '/blog/about' (if base is '/blog')
 */

export function relURL(raw?: string): string {
  if (!raw) return CFG.baseURL.pathname

  if (/^(?:[a-z]+:|\/\/|#)/i.test(raw)) return raw

  return path.posix.join(CFG.baseURL.pathname, raw.replace(/^\/+/, ""))
}

/**
 * Resolves a path to an absolute URL, accounting for Astro's `site` and `base` configuration.
 * Useful for SEO tags, RSS feeds, and sitemaps.
 *
 * @example absURL('rss.xml') -> 'https://example.com/rss.xml'
 */
export function absURL(raw?: string | URL): string {
  if (!raw) return CFG.baseURL.toString()

  const rawStr = raw.toString()

  // If the path is already an absolute URL, return it
  if (
    rawStr.startsWith("http://") ||
    rawStr.startsWith("https://") ||
    rawStr.startsWith("//")
  ) {
    return rawStr
  }

  try {
    // Combine site with the base-aware relative URL
    // relURL(path) ensures the path starts with BASE_URL (e.g., / or /blog/)
    return new URL(relURL(rawStr), CFG.baseURL).toString()
  } catch (error) {
    // Fallback if URL construction fails
    return rawStr
  }
}

/**
 * Resolves an ID to a dynamic Open Graph image path.
 *
 * @example ogURL('/') -> 'og-images/default.png'
 * @example ogURL('blog/post') -> 'og-images/blog/post.png'
 */
export function ogURL(id: string): string {
  const normalizedId =
    id === "/" ? "default" : id.replace(/^\/+/, "").replace(/\/+$/, "")
  return `og-images/${normalizedId}.png`
}
