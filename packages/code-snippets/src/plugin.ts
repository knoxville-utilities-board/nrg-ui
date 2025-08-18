import { createFilter } from '@rollup/pluginutils';

import { collectAllSnippets } from './collector.js';
import { virtualModule } from './index.js';
import { extractSnippetsFromCode } from './parser.js';

import type {
  CodeSnippetsPluginOptions,
  DeepRequired,
  SnippetEntry,
} from './types.ts';
import type { Plugin } from 'vite';

const defaultOptions: DeepRequired<CodeSnippetsPluginOptions> = {
  include: ['**/*.{js,ts}'],
  exclude: [],
  markers: {
    start: /\bBEGIN-SNIPPET\s+(\S+)\b/,
    end: /\bEND-SNIPPET\b/,
  },
};

export default function codeSnippetsPlugin(
  options: CodeSnippetsPluginOptions = {},
): Plugin {
  const finalOptions: DeepRequired<CodeSnippetsPluginOptions> = {
    ...defaultOptions,
    ...options,
    markers: {
      ...defaultOptions.markers,
      ...options.markers,
    },
  };

  let snippets = new Map<string, SnippetEntry>();
  const resolvedVirtualModuleId = '\0' + virtualModule;

  const filter = createFilter(finalOptions.include, finalOptions.exclude);

  return {
    name: 'vite-plugin-code-snippets',
    enforce: 'pre',

    buildStart() {
      snippets = collectAllSnippets(finalOptions);
    },

    resolveId: (id: string) => {
      if (id === virtualModule) {
        return resolvedVirtualModuleId;
      }
    },

    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return `export default ${JSON.stringify(Array.from(snippets.values()), null, 2)};`;
      }
    },

    async handleHotUpdate(ctx) {
      if (!filter(ctx.file)) {
        return;
      }

      const code = await ctx.read();

      for (const [name, entry] of snippets.entries()) {
        entry.sources = entry.sources.filter(
          (s) => s.location.file !== ctx.file,
        );
        entry.code = entry.sources.map((s) => s.code).join('\n');

        if (entry.sources.length === 0) {
          snippets.delete(name);
        }
      }

      const updated = extractSnippetsFromCode(
        ctx.file,
        code,
        finalOptions.markers.start!,
        finalOptions.markers.end!,
      );
      for (const entry of updated) {
        snippets.set(entry.name, entry);
      }

      ctx.server.moduleGraph.invalidateModule(
        ctx.server.moduleGraph.getModuleById(resolvedVirtualModuleId)!,
      );

      return [ctx.server.moduleGraph.getModuleById(resolvedVirtualModuleId)!];
    },
  };
}
