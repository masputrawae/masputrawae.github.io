import { z } from "astro/zod"

// config schema
const configSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  logo: z.string(),

  /*
   * languageCode:
   * @default: "id"
   */
  languageCode: z.string().default("id"),

  /*
   * locale:
   * @default: "id-ID"
   */
  locale: z.string().default("id-ID"),

  twitterX: z.string().optional(),
  keywords: z.array(z.string()).optional(),
})

type InputCfg = z.input<typeof configSchema>
type OutputCfg = z.output<typeof configSchema>

export function createConfig(user: InputCfg): OutputCfg {
  return configSchema.parse(user)
}
