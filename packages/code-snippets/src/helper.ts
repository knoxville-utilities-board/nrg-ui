import snippets from '@nrg-ui/code-snippets/virtual';
import assert from 'assert';

import type { SnippetEntry } from './types.js';

export function getSnippet(name: string): SnippetEntry {
  const snippet = snippets[name];

  assert(snippet, `No code snippet found with the name "${name}".`);

  return snippet;
}

export default { getSnippet };
