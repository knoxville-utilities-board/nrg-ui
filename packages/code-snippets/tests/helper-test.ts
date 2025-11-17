import { describe, expect, it, vi } from 'vitest';

import { getSnippet } from '../src/helper.js';

import type { SnippetEntry } from '../src/types.js';

vi.mock('@nrg-ui/code-snippets/virtual', () => ({
  default: {
    'existing-snippet': {
      name: 'existing-snippet',
      code: 'console.log("test");',
      sources: [],
    } as SnippetEntry,
  },
}));

describe('helper', () => {
  it('getSnippet returns existing snippet', async () => {
    const snippet = getSnippet('existing-snippet');

    expect(snippet).toBeDefined();
    expect(snippet.name).toBe('existing-snippet');
    expect(snippet.code).toBe('console.log("test");');
  });

  it('getSnippet throws for non-existent snippet', async () => {
    expect(() => getSnippet('non-existent')).toThrow(
      'No code snippet found with the name "non-existent".',
    );
  });
});
