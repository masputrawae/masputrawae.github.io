import { z } from "astro/zod"

// config schema
const configSchema = z.object({
  baseURL: z.instanceof(URL),

  title: z.string(),
  description: z.string(),
  author: z.string(),
  logo: z.string(),

  languageCode: z.string().default("id"),
  locale: z.string().default("id-ID"),

  twitterX: z.string().optional(),
  keywords: z.array(z.string()).optional(),

  contentDir: z.string(),
  assetDir: z.string(),

  // Theme Customization
  menu: z
    .array(
      z.object({
        label: z.string(),
        href: z.string(),
        external: z.boolean().optional(),
      })
    )
    .default([]),

  socials: z
    .object({
      github: z.string().optional(),
      twitter: z.string().optional(),
      email: z.string().optional(),
    })
    .optional(),

  footer: z
    .object({
      authorName: z.string().optional(),
      authorLink: z.string().optional(),
      license: z.string().optional(),
      licenseLink: z.string().optional(),
    })
    .optional(),
})

type InputCfg = z.input<typeof configSchema>
type OutputCfg = z.output<typeof configSchema>

export function createConfig(user: InputCfg): OutputCfg {
  return configSchema.parse(user)
}
