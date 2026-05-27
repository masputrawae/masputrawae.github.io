import { createConfig } from "./src/utils/create-config"

export const CFG = createConfig({
  baseURL: new URL("http://localhost:4321/"),

  title: "CahBagus",
  description:
    "Tempat yang sempurna bagi ku untuk mencurahkan isi hati dan pemikiran. Atau mungkin cuma sebatas halaman kosong?, siapa yang tahu.",

  keywords: [
    "blog",
    "catatan",
    "ide",
    "wawasan",
    "pemikiran",
    "opini",
    "refleksi",
  ],

  author: "Putra Jaya",
  logo: "./docs/attachments/shared/android-chrome-512x512.png",
  twitterX: "@masputrawae",

  // Dirs
  assetDir: "./docs/attachments/shared",
  contentDir: "./docs/published",

  // Theme
  menu: [
    { label: "Beranda", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Tentang", href: "/about" },
    { label: "Jelajah", href: "/explore" },
  ],

  socials: {
    github: "https://github.com/masputrawae",
  },

  footer: {
    authorName: "Putra Jaya",
    authorLink: "/about",
    license: "CC BY-NC-SA 4.0",
    licenseLink: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  },
})
