import snippets from '@nrg-ui/code-snippets/virtual';

import type { SnippetEntry } from './types.js';

export function getSnippet(name: string): SnippetEntry {
  const snippet = snippets[name];

  if (!snippet) {
    throw new Error(`No code snippet found with the name "${name}".`);
  }

  return snippet;
}

export default { getSnippet };
