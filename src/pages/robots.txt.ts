import type { APIRoute } from "astro"

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL("sitemap-index.xml", site).toString()
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
