import { Transformer } from 'content-tag-utils';
import { builders, parse, print } from 'ember-template-recast';
import { extname } from 'node:path';
import { createFilter } from 'vite';

import type { AST } from 'ember-template-recast';
import type { Plugin } from 'vite';

export interface SnippetExtractorOptions {
  filter?: string | string[];
}
const LANGUAGE_MAP = {
  '.gjs': 'glimmer-js',
  '.gts': 'glimmer-ts',
} as Record<string, string>;

function escapeSource(source: string): string {
  return source
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '&#10;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;');
}

function extractCode(code: string): string {
  let lines = code.split(/\r?\n/);

  // Remove leading blank lines
  while (lines.length > 0 && lines[0]!.trim() === '') {
    lines.shift();
  }

  // Remove trailing blank lines
  while (lines.length > 0 && lines[lines.length - 1]!.trim() === '') {
    lines.pop();
  }

  if (lines.length === 0) {
    return '';
  }

  const whitespace = lines[0]!.match(/^(\s*)/)?.[1] ?? '';
  if (whitespace) {
    const regex = new RegExp(`^${whitespace}`);

    lines = lines.map((line) => line.replace(regex, ''));
  }

  return escapeSource(lines.join('\n'));
}

function walkAST(node: AST.Statement, language: string): boolean {
  if (node.type === 'ElementNode' && node.tag === 'Section.Subsection') {
    const exampleBlock = node.children.find(
      (child) => child.type === 'ElementNode' && child.tag === ':example',
    ) as AST.ElementNode | undefined;

    if (exampleBlock) {
      const rawSource = print(builders.program(exampleBlock.children));
      const codeContent = extractCode(rawSource);
      const sourceAttr = builders.attr(
        '@sourceCode',
        builders.text(codeContent),
      );
      const langAttr = builders.attr(
        '@sourceLanguage',
        builders.text(language),
      );

      node.attributes.push(sourceAttr, langAttr);

      return true;
    }
  }

  let didChange = false;

  if (node.type === 'ElementNode') {
    for (const child of node.children) {
      didChange ||= walkAST(child, language);
    }
  }

  return didChange;
}

export function extractCodeBlocks(
  options: SnippetExtractorOptions = {},
): Plugin {
  const glob = options.filter ?? ['**/*.gts', '**/*.gjs'];
  const filter = createFilter(glob);

  return {
    name: 'ember-showcase-extract-code-blocks',
    enforce: 'pre',

    async transform(code, id) {
      if (!filter(id)) {
        return null;
      }

      const extension = extname(id);
      const language = LANGUAGE_MAP[extension] || 'glimmer-js';

      const t = new Transformer(code);

      await t.asyncMap((contents: string) => {
        const ast = parse(contents);

        let didChange = false;
        for (const node of ast.body) {
          didChange ||= walkAST(node, language);
        }

        if (didChange) {
          return print(ast);
        }

        return contents;
      });

      return t.toString() as string;
    },
  };
}
