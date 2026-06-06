import type { HTMLAttributes } from "astro/types"
import { absURL } from "./resolve-url"
import { slugToTitle } from "./slug-to-title"

export function generateBreadcrumbs(pathname: string): HTMLAttributes<"a">[] {
  const parts = pathname.split("/").filter(Boolean)
  const breadcrumbs: HTMLAttributes<"a">[] = [
    {
      name: "Home",
      href: absURL("/"),
    },
  ]

  let currentPath = ""
  for (const part of parts) {
    currentPath += `/${part}`
    breadcrumbs.push({
      name: slugToTitle(part),
      href: absURL(currentPath),
    })
  }

  return breadcrumbs
}
