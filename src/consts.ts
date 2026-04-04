import type { HTMLAttributes } from "astro/types"

export interface SiteType {
  title: string
  languageCode: string
  description: string
  contentDir: string
  copyright: string
  author: {
    name: string
    bio: string
    location: string
  }
  menus: HTMLAttributes<'a'>[]
  socials: HTMLAttributes<'a'>[]
  favicons: HTMLAttributes<'link'>[]
}

export const SITE: SiteType = {
  title: "Masputrawae",
  languageCode: "id-ID",
  description: "Tempat berbagi ide, pengalaman, dan keluh kesah kehidupan",
  contentDir: "./vault/content",
  copyright: 'Copyright 2026 Putra Jaya. License Under CC BY-NC-SA',

  author: {
    name: 'Putra Jaya',
    bio: 'Apa aja yang penting senang',
    location: 'Jawa Timur | Indonesia',
  },

  menus: [
    { name: "[bi:house] Home", href: '/' },
    { name: "[bi:pencil-square] Blog", href: '/blog' },
    { name: "[bi:journal-text] Notes", href: '/notes' },
    { name: "[bi:tags] Tags", href: '/tags' },
    { name: "[bi:search] Search", href: '/search' },
  ],

  socials: [
    { name: '[bi:twitter-x] Twitter (X)', href: 'https://x.com' },
    { name: '[bi:instagram] Instagram', href: 'https://instagram.com' },
    { name: '[bi:facebook] Facebook', href: 'https://facebook.com' },
    { name: '[bi:discord] Discord', href: 'https://discord.com' },
    { name: '[bi:github] Github', href: 'https://github.com' }
  ],

  favicons: [
    { rel: "apple-touch-icon", sizes: "180x180", href: "apple-touch-icon.png" },
    { rel: "icon", type: "image/x-icon", href: "favicon.ico" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "favicon-16x16.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "favicon-32x32.png" },
  ]
}

