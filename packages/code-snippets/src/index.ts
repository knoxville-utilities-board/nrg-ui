export const virtualModule = 'virtual:code-snippets';

import codeSnippetsPlugin from './plugin.js';

export default codeSnippetsPlugin;

export { codeSnippetsPlugin };

export type {
  CodeSnippetsPluginOptions,
  SnippetEntry,
  SnippetLocation,
  SnippetSource,
} from './types.js';
