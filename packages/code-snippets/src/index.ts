export const virtualModule = 'virtual:code-snippets';

export { default as codeSnippetsPlugin } from './plugin.js';

export type {
  CodeSnippetsPluginOptions,
  SnippetEntry,
  SnippetLocation,
  SnippetSource,
} from './types.ts';
