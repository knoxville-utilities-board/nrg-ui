import { SnippetEntry } from '../src/types.ts';

declare module 'virtual:code-snippets' {
  const snippets: Record<string, SnippetEntry>;
  export default snippets;
}
