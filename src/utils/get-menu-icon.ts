interface ResultLink {
  icon: string | null
  name: string | null
}

export function getMenuIcon(raw: string | null | undefined): ResultLink {
  if (!raw) {
    return {
      icon: null,
      name: null
    }
  }

  const regex = /\[(.*?)\]\s*(.*)/
  const match = raw.match(regex)

  return {
    icon: match ? match[1] || null : null,
    name: match ? match[2] || null : null
  }
}
