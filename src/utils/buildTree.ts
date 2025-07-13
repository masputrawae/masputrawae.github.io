import { relUrl } from "./urls";

export type TreeNode = {
  name: string
  url?: string
  children?: TreeNode[]
}

function sortTree(nodes: TreeNode[]): TreeNode[] {
  return nodes
    .sort((a, b) => {
      const aIsFolder = !!a.children
      const bIsFolder = !!b.children

      if (aIsFolder && !bIsFolder) return -1 // folder dulu
      if (!aIsFolder && bIsFolder) return 1
      return a.name.localeCompare(b.name) // lalu urut alfabetis
    })
    .map((node) => ({
      ...node,
      children: node.children ? sortTree(node.children) : undefined
    }))
}

export function buildTree(slugs: string[]): TreeNode[] {
  const root: TreeNode[] = []

  for (const slug of slugs) {
    const parts = slug.split('/')
    let currentLevel = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isLeaf = i === parts.length - 1

      let existing = currentLevel.find((n) => n.name === part)
      if (!existing) {
        existing = {
          name: part,
          ...(isLeaf ? { url: relUrl(slug) } : { children: [] })
        }
        currentLevel.push(existing)
      }

      if (!isLeaf) {
        currentLevel = existing.children!
      }
    }
  }

  return sortTree(root)
}
