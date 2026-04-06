import { menuHandler } from "./menu"

function main() {
  document.addEventListener('astro:page-load', () => {
    menuHandler()
  })
}

main()
