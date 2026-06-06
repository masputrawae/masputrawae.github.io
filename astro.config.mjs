// @ts-check
import { defineConfig, fontProviders } from "astro/config"

import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321",
  base: "/",

  vite: {
    plugins: [tailwindcss()],
  },

  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Public Sans",
      cssVariable: "--font-sans",
      weights: [400, 600, 700],
      formats: ["woff2"],
      fallbacks: [
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji"
      ]
    }
  ]
})
