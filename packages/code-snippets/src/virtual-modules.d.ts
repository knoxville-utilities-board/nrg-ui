import type { SnippetEntry } from './types.d.ts';

declare module 'virtual:code-snippets' {
  const snippets: Record<string, SnippetEntry>;
  export default snippets;
}
