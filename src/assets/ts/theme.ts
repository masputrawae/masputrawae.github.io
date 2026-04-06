interface ThemeSwitchType {
  html: HTMLElement
  mq: MediaQueryList
}

function themeSwitch({ html, mq }: ThemeSwitchType) {
  const theme = mq.matches ? 'dark' : 'light'
  html.setAttribute('data-theme', theme)
}

export function themeHandler() {
  const html = document.documentElement
  const mq = window.matchMedia('(prefers-color-scheme: dark)')

  mq.addEventListener('change', () => {
    themeSwitch({ html, mq })
  })

  themeSwitch({ html, mq })
}
