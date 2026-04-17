const KEY_THEME = "theme"

export interface ThemeChangeOptions {
  theme: "dark" | "light"
  html: HTMLElement
  iconLight: HTMLElement | null | undefined
  iconDark: HTMLElement | null | undefined
}

export function themeChange({ theme, html, iconLight, iconDark }: ThemeChangeOptions) {
  const isDark = theme === "dark"

  html.setAttribute('data-theme', theme)
  iconLight?.classList.toggle('hidden', !isDark)
  iconDark?.classList.toggle('hidden', isDark)

  sessionStorage.setItem(KEY_THEME, theme)
}

export function themeToggle() {
  const html = document.documentElement
  const btn = document.getElementById('theme-btn')
  const iconLight = document.getElementById('theme-btn-icon-light')
  const iconDark = document.getElementById('theme-btn-icon-dark')

  // init
  const init = sessionStorage.getItem(KEY_THEME) === "dark" ? "dark" : "light"
  themeChange({ theme: init, html, iconDark, iconLight })

  // toggle
  btn?.addEventListener('click', () => {
    const theme = sessionStorage.getItem(KEY_THEME) === "dark" ? "light" : "dark"
    themeChange({ theme, html, iconDark, iconLight })
  })
}

