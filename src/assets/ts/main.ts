import { menuHandler } from './menu'
import { themeHandler } from './theme'

function main() {
  document.addEventListener('astro:page-load', () => {
    themeHandler()
    menuHandler()
  })
}

main()
