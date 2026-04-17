import { menuToggle } from "./menu"
import { themeToggle } from "./theme"

// main function
function main() {
  document.addEventListener('DOMContentLoaded', () => {
    themeToggle()
    menuToggle()
  })
}

main()

