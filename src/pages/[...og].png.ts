import type { APIRoute } from "astro"
import { ImageResponse } from "@vercel/og"
import { getCollection } from "astro:content"
import { CFG } from "@config"

import fs from "fs/promises"
import path from "node:path"

export const prerender = true

export async function getStaticPaths() {
  const entries = await getCollection("content")

  return entries.map(({ id, data }) => ({
    params: { og: `og-images/${id === "/" ? "default" : id}` },
    props: {
      title: data.title,
      description: data.description,
      pubDate: data.pubDate,
    },
  }))
}

export const GET: APIRoute = async ({ props }) => {
  // Use absolute paths for reliability
  const rootDir = process.cwd()
  const interRegularPath = path.resolve(rootDir, "src/fonts/Inter-Regular.ttf")
  const interBoldPath = path.resolve(rootDir, "src/fonts/Inter-Bold.ttf")
  const logoPath = path.resolve(rootDir, CFG.logo)

  // Load font & logo
  const [interRegular, interBold, logoBuffer] = await Promise.all([
    fs.readFile(interRegularPath),
    fs.readFile(interBoldPath),
    fs.readFile(logoPath),
  ])

  // Determine mime type based on extension
  const ext = path.extname(logoPath).toLowerCase()
  const mimeType =
    ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png"
  const logoBase64 = `data:${mimeType};base64,${logoBuffer.toString("base64")}`

  const title = props.title
  const description = props.description
  const pubDate = props.pubDate.toDateString() ?? new Date().toDateString()

  const html = {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000000 100%)",
        fontFamily: "Inter",
        padding: 80,
      },
      children: [
        // Header: logo + site title
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "16px",
            },
            children: [
              {
                type: "img",
                props: {
                  src: logoBase64,
                  style: {
                    width: 55,
                    height: 55,
                    borderRadius: 14, // Reduced slightly, Satori handles small radius better on small images
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column" },
                  children: [
                    {
                      type: "span",
                      props: {
                        style: {
                          fontSize: 24,
                          fontWeight: 700,
                          color: "#ffffff",
                        },
                        children: CFG.title,
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: { fontSize: 16, color: "#cccccc" },
                        children: new URL(import.meta.env.SITE).hostname,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },

        // Body: title + description + date
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              color: "#ffffff",
            },
            children: [
              // Title
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 60,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    filter: "drop-shadow(4px 4px 4px rgba(0,0,0,0.5))",
                  },
                  children: title,
                },
              },
              // Description
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 26,
                    fontWeight: 400,
                    opacity: 0.8,
                    lineHeight: 1.4,
                    maxWidth: 720,
                  },
                  children: description,
                },
              },
              // Date
              {
                type: "div",
                props: {
                  style: { fontSize: 20, opacity: 0.7 },
                  children: pubDate,
                },
              },
            ],
          },
        },
      ],
    },
  }

  try {
    return new ImageResponse(html, {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
      ],
    })
  } catch (e) {
    console.error("OG Render Error:", e)
    throw e
  }
}
