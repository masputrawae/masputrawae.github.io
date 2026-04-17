import { createConfig } from './src/lib/create-config'

export const SITE = createConfig({
  title: 'Cah Bagus',
  subtitle: 'Hanya Manusia Biasa',
  author: {
    name: 'Putra Jaya',
    twitterX: '@masputrawae'
  },
  menus: [
    { icon: 'bi:house-fill', name: 'Home', href: '/' },
    { icon: 'bi:globe', name: 'Blog', href: '/blog' },
    { icon: 'bi:pencil-square', name: 'Notes', href: '/notes' },
    { icon: 'bi:tags-fill', name: 'Tags', href: '/tags' },
    { icon: 'bi:person-circle', name: 'About', href: '/about' }
  ],
  social: [
    {
      icon: 'bi:twitter-x',
      name: 'Twitter (X)',
      href: 'https://x.com/masputrawae'
    },
    {
      icon: 'bi:instagram',
      name: 'Instagram',
      href: 'https://www.instagram.com/masputrawae?igsh=NWQ5YW5vNHRhM3hu'
    },
    {
      icon: 'bi:discord',
      name: 'Discord',
      href: 'https://discord.gg/nM4EP8DJFZ'
    },
    {
      icon: 'bi:envelope-at',
      name: 'Email',
      href: 'mailto:masputrawae.official@gmail.com'
    },
    {
      icon: 'bi:github',
      name: 'Github',
      href: 'https://github.com/masputrawae'
    }
  ]
})
