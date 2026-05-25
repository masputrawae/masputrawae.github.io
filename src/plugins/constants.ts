export const RE_WIKI = /(!)?\[\[(.*?)(?:#(.*?))?(?:\|(.*?))?\]\]/g

export const IMAGE_EXTS = new Set([
  ".avif",
  ".bmp",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
])

export const AUDIO_EXTS = new Set([
  ".flac",
  ".m4a",
  ".mp3",
  ".ogg",
  ".wav",
  ".webm",
  ".3gp",
])
export const VIDEO_EXTS = new Set([".mkv", ".mov", ".mp4", ".ogv", ".webm"])
