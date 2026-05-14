import { createConfig } from './src/utils/create-config.ts';

const currentYear = new Date().getFullYear();

export const SITE = createConfig({
  title: 'CahBagus',
  description:
    'Tempat yang sempurna bagi ku untuk mencurahkan isi hati dan pemikiran. Atau mungkin cuma sebatas halaman kosong?, siapa yang tahu.',
  languageCode: 'id',
  locale: 'id-ID',

  logo: './registry/public/android-chrome-512x512.png',
  author: 'Putra Jaya',
  keywords: ['blog', 'wawasan', 'pengalaman', 'pemikiran', 'ide', 'cerita', 'catatan'],
  copyright: `Copyright &copy; ${currentYear} Putra Jaya. All Rights Reserved.`,

  menus: {
    header: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Explore', href: '/explore' },
      { name: 'Github', href: 'https://github.com/masputrawae', isExternal: true },
    ],
    footer: [
      { name: 'About', href: '/about' },
      { name: 'Explore', href: '/explore' },
      { name: 'Github', href: 'https://github.com/masputrawae', isExternal: true },
    ],
  },
});
