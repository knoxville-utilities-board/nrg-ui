import { createFilter } from '@rollup/pluginutils';
import { readFileSync } from 'node:fs';
import { resolve } from 'path';
import { globSync } from 'tinyglobby';

import { extractSnippetsFromCode } from './parser.js';

import type { CodeSnippetsPluginOptions, SnippetEntry } from './types.js';

export function collectAllSnippets(
  options: CodeSnippetsPluginOptions = {},
): Map<string, SnippetEntry> {
  const include = options.include ?? ['src/**/*', 'app/**/*'];
  const exclude = options.exclude ?? ['node_modules/**'];
  const startMarker = options.markers?.start ?? /\bBEGIN-SNIPPET\s+(\S+)\b/;
  const endMarker = options.markers?.end ?? /\bEND-SNIPPET\b/;

  const filter = createFilter(include, exclude);

  const snippets = new Map<string, SnippetEntry>();
  const files = globSync(include, { ignore: exclude });

  for (const file of files) {
    const abs = resolve(file);

    if (!filter(abs)) {
      continue;
    }

    const code = readFileSync(abs, 'utf8');
    const entries = extractSnippetsFromCode(file, code, startMarker, endMarker);

    for (const entry of entries) {
      if (snippets.has(entry.name)) {
        const existing = snippets.get(entry.name)!;
        existing.code += '\n' + entry.code;
        existing.sources.push(...entry.sources);
      } else {
        snippets.set(entry.name, entry);
      }
    }
  }

  return snippets;
}
