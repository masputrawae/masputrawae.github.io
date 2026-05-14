import { generateId } from '../utils/generate-id';
import { globShorted } from '../utils/glob-shorted';
import { relURL } from '../utils/resolve-url';
import { IMAGE_EXTS } from './constants';

const { DEV } = import.meta.env;

export interface GetFileEntriesOptions {
  contentDir: string;
  assetsDir: string;
  publicDir: string;
  assetsAlias: string;
  baseURL: string;
}

export type FileEntries = Map<string, string>;

let cachedEntries: FileEntries | null = null;

export function getFileEntries(opt: GetFileEntriesOptions): FileEntries {
  if (!DEV && cachedEntries) return cachedEntries;

  const map: FileEntries = new Map();

  /**
   * 1. Files: (MD/MDX)
   */
  const contentEntries = globShorted('**/*.{md,mdx}', { cwd: opt.contentDir });
  for (const entry of contentEntries) {
    const fileName = entry.split('/').pop() || '';
    const url = relURL(generateId(entry));

    const fullId = generateId(entry);
    const shortId = generateId(fileName);

    // Multiple ways to resolve a link
    if (!map.has(fullId)) map.set(fullId, url);
    if (!map.has(shortId)) map.set(shortId, url);
  }

  /**
   * 2. Assets Files: (Image)
   */
  const assetsEntries = globShorted('**/*', { cwd: opt.assetsDir });
  for (const entry of assetsEntries) {
    const ext = entry.includes('.') ? entry.slice(entry.lastIndexOf('.')).toLowerCase() : '';
    const fileName = entry.split('/').pop() || '';

    if (IMAGE_EXTS.has(ext)) {
      const alias = opt.assetsAlias.endsWith('/') ? opt.assetsAlias : opt.assetsAlias + '/';
      const pathAlias = alias + entry;

      if (!map.has(fileName)) map.set(fileName, pathAlias);
      if (!map.has(entry)) map.set(entry, pathAlias);
    } else {
      const url = relURL(entry);
      if (!map.has(fileName)) map.set(fileName, url);
      if (!map.has(entry)) map.set(entry, url);
    }
  }

  /**
   * 3. Public Files (pdf, audio, video, .etc)
   */
  const publicEntries = globShorted('**/*', { cwd: opt.publicDir });
  for (const entry of publicEntries) {
    const fileName = entry.split('/').pop() || '';
    const url = relURL(entry);
    if (!map.has(fileName)) map.set(fileName, url);
    if (!map.has(entry)) map.set(entry, url);
  }

  if (!DEV) cachedEntries = map;
  return map;
}
