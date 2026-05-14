import { z } from 'astro/zod';

const currentYear = new Date().getFullYear();

const LinkSchema = z.object({
  href: z.string(),
  name: z.string(),
  isExternal: z.boolean().optional(),
});

const configSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  logo: z.string(),

  keywords: z.array(z.string()).optional(),

  copyright: z.string().default(`Copyright &copy; ${currentYear} Putra Jaya. All Rights Reserved.`),
  languageCode: z.string().default('en'),
  locale: z.string().default('en-US'),

  menus: z
    .object({
      header: z.array(LinkSchema).min(1),
      footer: z.array(LinkSchema).min(1),
    })
    .default({
      header: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Explore', href: '/explore' },
      ],
      footer: [{ name: 'Github', href: 'https://github.com/masputrawae', isExternal: true }],
    }),
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
});

type ConfigInput = z.input<typeof configSchema>;
type ConfigOutput = z.output<typeof configSchema>;

export function createConfig(cfg: ConfigInput): ConfigOutput {
  return configSchema.parse(cfg);
}
