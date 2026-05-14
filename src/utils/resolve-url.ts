// PATH: ./src/utils/resolve-url.ts

const { BASE_URL, SITE } = import.meta.env;

/**
 * Resolves a path to a relative URL, accounting for Astro's `base` configuration.
 * Useful for links within the site to ensure they work in sub-path deployments.
 *
 * @example relURL('about') -> '/about' (if base is '/')
 * @example relURL('about') -> '/blog/about' (if base is '/blog')
 */
export function relURL(path: string): string {
  // Return early for empty paths or already absolute URLs/special protocols
  if (!path) return BASE_URL;

  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('//') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  // Remove leading slashes from path to avoid double slashes when joining with base
  const normalizedPath = path.replace(/^\/+/, '');

  return `${BASE_URL}${normalizedPath}`;
}

/**
 * Resolves a path to an absolute URL, accounting for Astro's `site` and `base` configuration.
 * Useful for SEO tags, RSS feeds, and sitemaps.
 *
 * @example absURL('rss.xml') -> 'https://example.com/rss.xml'
 */
export function absURL(raw: string | URL): string {
  const path = raw.toString();

  // If the path is already an absolute URL, return it
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
    return path;
  }

  // Fallback to relative URL if SITE is not configured
  if (!SITE) {
    return relURL(path);
  }

  try {
    // Combine site with the base-aware relative URL
    // relURL(path) ensures the path starts with BASE_URL (e.g., / or /blog/)
    return new URL(relURL(path), SITE).toString();
  } catch (error) {
    // Fallback if URL construction fails
    return path;
  }
}
