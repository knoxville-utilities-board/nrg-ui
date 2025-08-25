import type { SnippetEntry } from './types';

declare module 'virtual:code-snippets' {
  const snippets: Record<string, SnippetEntry>;
  export default snippets;
}
