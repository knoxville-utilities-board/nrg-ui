export const virtualModule = '@nrg-ui/code-snippets/virtual';

export { getSnippet } from './helper.js';
export { default as codeSnippetsPlugin } from './plugin.js';

export type {
  CodeSnippetsPluginOptions,
  SnippetEntry,
  SnippetLocation,
  SnippetSource,
} from './types.ts';
