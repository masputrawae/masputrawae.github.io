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

	tags: ['Tags', 'Tugs'],
  defaultThemes: 'dark'
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
				href: '/',
				icon: 'icon-name',
				order: 1
			},
			{
				name: 'About',
				href: '/about/',
				icon: 'icon-name',
				order: 2
			},
			{
				name: 'Random Page',
				href: 'src/content/docs/random-page.md',
				icon: 'icon-name',
				order: 2
			}
		]
	}
]
