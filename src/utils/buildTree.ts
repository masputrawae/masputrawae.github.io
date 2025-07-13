// utils/buildNavTreeFromSlugs.ts

export type TreeNode = {
  name: string
  url?: string
  children?: TreeNode[]
}

export function buildNavTreeFromSlugs(slugs: string[]): TreeNode[] {
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
          ...(isLeaf ? { url: `${slug}` } : { children: [] })
        }
        currentLevel.push(existing)
      }

      if (!isLeaf) {
        currentLevel = existing.children!
      }
    }
  }

  return root
}
