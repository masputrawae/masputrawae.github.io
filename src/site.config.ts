import type { HTMLAttributes } from "astro/types"

export const SITE = {
  name: "CahBagus",
  description: "Tempat yang sempurna bagi ku untuk mencurahkan isi hati dan pemikiran 😅. Atau mungkin cuma sebatas halaman kosong?, siapa yang tahu 🫢.",
  alternateName: "Masputrawae",
  slogan: "Hanya Seorang Manusia Biasa",
  foundingDate: new Date("2025-01-01").toISOString(),
  lang: "id",
  locale: "id-ID",
  logo: "logo.png",
  ogImage: "og-images/default.png",

  keywords: ["blog", "opini", "wawasan", "cerita", "ide", "catatan", "pemikiran"],
  knowsAbout: [
    "Computer Network",
    "Linux",
    "Ide",
    "Pengetahuan",
    "Pemikiran",
    "Wawasan",
    "Catatan",
    "Programming",
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
}

export const AUTHOR = {
  name: "Putra Jaya",
  url: "about",
  image: "logo.png",
  email: "masputrawae.official@gmail.com",
  jobTitle: "An Emotional Fisherman",
  telephone: "+6283850908390",
  twitterX: "@masputrawae",
}

export const ADDRESS = {
  streetAddress: "Jln Tulakan - Tegalombo Km.04",
  addressLocality: "Pacitan",
  addressRegion: "Jawa Timur",
  postalCode: "63571",
  addressCountry: "ID",
}

export const SOCIAL: HTMLAttributes<'a'>[] = [
  {
    name: "Github",
    href: "https://github.com/masputrawae",
    target: "_blank",
    referrerpolicy: "origin-when-cross-origin",
    rel: "external nofollow noreferrer noopener",
  },
  {
    name: "Twitter X",
    href: "https://x.com/masputrawae",
    target: "_blank",
    referrerpolicy: "origin-when-cross-origin",
    rel: "external nofollow noreferrer noopener",
  }
]

export const MENUS: HTMLAttributes<"a">[] = [
  {
    name: "Home",
    href: "/",
    referrerpolicy: "origin"
  },
  {
    name: "About",
    href: "/about/",
    rel: "author",
    referrerpolicy: "same-origin"
  },
  {
    name: "Blog",
    href: "/blog/",
    referrerpolicy: "same-origin"
  },
  {
    name: "Explore",
    href: "/explore/",
    rel: "search",
    referrerpolicy: "same-origin"
  },
  {
    name: "Github",
    href: "https://github.com/johndoe",
    target: "_blank",
    referrerpolicy: "origin-when-cross-origin",
    rel: "external nofollow noreferrer noopener",
  },
]

export const FAVICONS: HTMLAttributes<"link">[] = [
  { rel: "icon", type: "image/svg+xml", href: "/favicon.ico" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
]
