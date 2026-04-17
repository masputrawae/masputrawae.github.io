import fs from 'fs/promises'
import type { APIRoute } from 'astro'
import { ImageResponse } from '@vercel/og'
import { SITE } from '../../site.config'
import { getCollection } from 'astro:content'

export const prerender = true

// Load font & logo
const interRegular = await fs.readFile('./src/assets/fonts/Inter-Regular.ttf')
const interBold = await fs.readFile('./src/assets/fonts/Inter-Bold.ttf')

const logoBuffer = await fs.readFile('./src/assets/images/logo.png')
const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`

export async function getStaticPaths() {
  const entries = await getCollection('content')
  return entries.map((p) => ({
    params: { og: `og-images/${p.id === '/' ? 'default' : p.id}` },
    props: {
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate
    }
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const title = props.title
  const description = props.description
  const pubDate = props.pubDate.toDateString() ?? new Date().toDateString()

  const html = {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000000 100%)',
        fontFamily: 'Inter',
        padding: 70
      },
      children: [
        // Header: logo + site title
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            },
            children: [
              {
                type: 'img',
                props: {
                  src: logoBase64,
                  style: {
                    width: 55,
                    height: 55,
                    borderRadius: 20
                  }
                }
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column' },
                  children: [
                    {
                      type: 'span',
                      props: {
                        style: { fontSize: 24, fontWeight: 700, color: '#ffffff' },
                        children: SITE.title
                      }
                    },
                    {
                      type: 'span',
                      props: {
                        style: { fontSize: 16, color: '#cccccc' },
                        children: new URL(import.meta.env.SITE).hostname
                      }
                    }
                  ]
                }
              }
            ]
          }
        },

        // Body: title + description + date
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              color: '#ffffff'
            },
            children: [
              // Title
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: 60,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    filter: 'drop-shadow(4px 4px 4px rgba(0,0,0,0.5))'
                  },
                  children: title
                }
              },
              // Description
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: 26,
                    fontWeight: 400,
                    opacity: 0.8,
                    lineHeight: 1.4,
                    maxWidth: 720
                  },
                  children: description
                }
              },
              // Date
              {
                type: 'div',
                props: {
                  style: { fontSize: 20, opacity: 0.7 },
                  children: pubDate
                }
              }
            ]
          }
        }
      ]
    }
  }

  try {
    return new ImageResponse(html, {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' }
      ]
    })
  } catch (e) {
    console.error('OG Render Error:', e)
    throw e
  }
}
