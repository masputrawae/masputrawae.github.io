// src/lib/create-config.ts

import { z } from 'astro/zod'

// ===== Link Schema for: menus, social =====
const linkSchema = z.object({
  icon: z.string(),
  name: z.string(),
  href: z.string()
})

const configSchema = z.object({
  // ===== Base Config =====
  title: z.string(),
  subtitle: z.string(),
  baseURL: z.instanceof(URL).default(new URL("http://localhost:4321/")),

  // ===== Content Dir =====
  vaultDir: z.string().default('vault'),

  // ===== Language =====
  langCode: z.string().default('id'),
  locale: z.string().default('id-ID'),

  // ===== Author =====
  author: z
    .object({
      name: z.string(),
      twitterX: z.string().optional(),
      fbAppId: z.string().optional(),
      fbAdmin: z.string().optional()
    })
    .default({
      name: 'Author'
    }),

  // ===== Copyright =====
  copyright: z
    .object({
      license: z.string(),
      url: z.string().optional(),
      year: z.number()
    })
    .default({
      license: 'All Rights Reserved.',
      year: new Date().getFullYear()
    }),

  // ===== Menu navigation =====
  menus: z
    .array(linkSchema)
    .min(1)
    .max(5)
    .default([
      { icon: 'bi:house-fill', name: 'Home', href: '/' },
      { icon: 'bi:tags-fill', name: 'Tags', href: '/tags' },
      { icon: 'bi:github', name: 'Github', href: 'https://github.com/masputrawae/write-first' }
    ]),

  // ===== Social media =====
  social: z
    .array(linkSchema)
    .min(1)
    .max(5)
    .default([
      { icon: 'bi:github', name: 'Github', href: 'https://github.com/masputrawae/write-first' }
    ]),

  // ===== Favicon =====
  favicons: z
    .array(
      z.object({
        rel: z.string(),
        href: z.string(),
        type: z.string().optional(),
        sizes: z.string().optional()
      })
    )
    .default([
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }
    ])
})

type ConfigInput = z.input<typeof configSchema>
type ConfigOutput = z.output<typeof configSchema>

export function createConfig(userConfig: ConfigInput): ConfigOutput {
  return configSchema.parse(userConfig)
}
