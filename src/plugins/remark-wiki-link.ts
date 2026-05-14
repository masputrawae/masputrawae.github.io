import type { Root, Text } from 'mdast';
import type { Plugin } from 'unified';

import { visit } from 'unist-util-visit';
import { getFileEntries } from './get-file-entries';
import { generateId, slugger } from '../utils/generate-id';

import { AUDIO_EXTS, IMAGE_EXTS, VIDEO_EXTS, RE_WIKI } from './constants';

export interface RemarkOptions {
  baseURL?: string;
  assetsAlias?: string;
  contentDir?: string;
  assetsDir?: string;
  publicDir?: string;
}

const remarkWikiLink: Plugin<[RemarkOptions?], Root> = (options = {}) => {
  const { assetsAlias = '@assets', baseURL = '/' } = options;

  const files = getFileEntries({
    contentDir: 'registry/content',
    assetsDir: 'registry/assets',
    publicDir: 'registry/public',
    baseURL,
    assetsAlias,
  });

  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent: any) => {
      if (!parent || index === undefined) return;

      const matches = Array.from(node.value.matchAll(RE_WIKI));
      if (matches.length === 0) return;

      const nodes: any[] = [];
      let lastIndex = 0;

      for (const match of matches) {
        const [fullMatch, isEmbed, targetRaw, anchor, alias] = match;
        const target = targetRaw?.trim() || '';
        const matchStart = match.index!;
        const matchEnd = matchStart + fullMatch.length;

        if (matchStart > lastIndex) {
          nodes.push({ type: 'text', value: node.value.slice(lastIndex, matchStart) });
        }

        const targetId = generateId(target);
        const sluggedTarget = slugger(target);
        const resolvedPath = files.get(target) || files.get(targetId) || files.get(sluggedTarget);

        if (isEmbed) {
          // --- EMBED LOGIC ---
          const ext = target.includes('.')
            ? target.slice(target.lastIndexOf('.')).toLowerCase()
            : '';
          const url = resolvedPath || target;

          if (IMAGE_EXTS.has(ext)) {
            const isSize = alias && /^\d+(x\d+)?$/.test(alias);
            const [width, height] = isSize ? alias.split('x') : [undefined, undefined];
            nodes.push({
              type: 'image',
              url: url,
              title: alias || target,
              alt: alias || target,
              data: {
                hProperties: {
                  width: width || undefined,
                  height: height || undefined,
                  className: 'wiki-embed-image',
                },
              },
            });
          } else if (AUDIO_EXTS.has(ext)) {
            nodes.push({
              type: 'html',
              value: `<audio src="${url}" controls class="wiki-embed-audio"></audio>`,
            });
          } else if (VIDEO_EXTS.has(ext)) {
            nodes.push({
              type: 'html',
              value: `<video src="${url}" controls class="wiki-embed-video"></video>`,
            });
          } else if (ext === '.pdf') {
            nodes.push({
              type: 'html',
              value: `<iframe src="${url}" class="wiki-embed-pdf" width="100%" height="500px"></iframe>`,
            });
          } else {
            // Transclusion (Page Embed)
            const isBroken = !resolvedPath;
            if (isBroken) console.warn('- ⚠️ Internal embed not found: ', target);

            nodes.push({
              type: 'link',
              url: resolvedPath || '#',
              data: {
                hName: 'div',
                hProperties: {
                  className: isBroken ? 'wiki-embed-page broken' : 'wiki-embed-page',
                  'data-embed-target': resolvedPath || '#',
                  'data-embed-heading': anchor || undefined,
                },
              },
              children: [{ type: 'text', value: `Embed: ${alias || target}` }],
            });
          }
        } else {
          // --- LINK LOGIC ---
          let url = resolvedPath || '';
          if (anchor) url += `#${generateId(anchor)}`;
          if (!target && anchor) url = `#${generateId(anchor)}`;

          const displayValue =
            alias || (target && anchor ? `${target} > ${anchor}` : target || anchor || '');
          const isBroken = target && !resolvedPath;
          if (isBroken) console.warn('- ⚠️ Internal link not found: ', target);

          nodes.push({
            type: 'link',
            url: url || '#',
            title: resolvedPath || target || undefined,
            data: {
              hName: isBroken ? 'span' : 'a',
              hProperties: {
                className: isBroken ? 'broken-link' : 'internal-link',
              },
            },
            children: [{ type: 'text', value: displayValue }],
          });
        }

        lastIndex = matchEnd;
      }

      if (lastIndex < node.value.length) {
        nodes.push({ type: 'text', value: node.value.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...nodes);
    });
  };
};

export default remarkWikiLink;
