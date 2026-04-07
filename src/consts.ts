import type { HTMLAttributes } from 'astro/types'

import Logo from '/src/assets/images/logo.png'

export interface SiteType {
  title: string
  languageCode: string
  description: string
  contentDir: string
  copyright: string
  logo: {
    source: string
    image: ImageMetadata
  }

  author: {
    name: string
    bio: string
    twitterX: string
  }

  menus: {
    main: HTMLAttributes<'a'>[]
    social: HTMLAttributes<'a'>[]
  }

  favicons: HTMLAttributes<'link'>[]
}

export const SITE: SiteType = {
  title: 'Masputrawae',
  languageCode: 'id-ID',
  description: 'Tempat berbagi ide, pengalaman, dan keluh kesah kehidupan',
  copyright: 'Copyright 2026 Putra Jaya. License Under CC BY-NC-SA',

  contentDir: './vault/content',

  logo: {
    source: './src/assets/images/logo.png',
    image: Logo
  },

  author: {
    name: 'Putra Jaya',
    bio: 'Apa aja yang penting senang',
    twitterX: '@masputrawae'
  },

  menus: {
    main: [
      { name: '[bi:house] Home', href: '/' },
      { name: '[bi:pencil-square] Blog', href: '/blog' },
      { name: '[bi:journal-text] Notes', href: '/notes' },
      { name: '[bi:person-circle] About', href: '/about' },
      { name: '[bi:search] Search', href: '/search' }
    ],
    social: [
      {
        name: '[bi:twitter-x] Twitter (X)',
        href: 'https://x.com/masputrawae',
        target: '_blank'
      },
      {
        name: '[bi:instagram] Instagram',
        href: 'https://www.instagram.com/masputrawae?igsh=NWQ5YW5vNHRhM3hu',
        target: '_blank'
      },
      {
        name: '[bi:discord] Discord',
        href: 'https://discord.gg/nM4EP8DJFZ',
        target: '_blank'
      },
      {
        name: '[bi:envelope-at] Email',
        href: 'mailto:masputrawae.official@gmail.com',
        target: '_blank'
      },
      {
        name: '[bi:github] Github',
        href: 'https://github.com/masputrawae',
        target: '_blank'
      }
    ]
  },

  favicons: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }
  ]
}
