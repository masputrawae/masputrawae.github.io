import type { SiteParams } from './src/types/site'
import type { SidebarMenus } from './src/types/site'

export const SITE_PARAMS: SiteParams = {
  site: 'https://masputrawae.github.io',
  base: '/',
  siteTitle: 'MasPutraWae',

  author: 'Putra Jaya',
  twitterHandle: '@Masputrawae',
  tagline: 'Manusia Biasa',
  description: 'Consequat aute minim nostrud anim.',
  logo: '/logo.webp',
  image: 'https://picsum.photos/50',

  github: 'https://github.com/masputrawae',
  repo: 'masputrawae/repo',
  branch: 'main',

  tags: ['Tags', 'Tugs']
}

export const SIDEBAR: SidebarMenus[] = [
  {
    id: 'main-menu',
    label: 'Main Menu',
    order: 1,
    defaultActive: true,
    items: [
      {
        name: 'Main Page',
        filePath: 'src/content/docs/home.md',
        icon: 'icon-name',
        order: 1,
      },
      {
        name: 'About',
        filePath: 'src/content/docs/about.md',
        icon: 'icon-name',
        order: 2,
      },
      {
        name: 'Random Page',
        filePath: 'src/content/docs/random-page.md',
        icon: 'icon-name',
        order: 2,
      },
    ],
  },
]