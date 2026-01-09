import { Transformer } from 'content-tag-utils';
import { parse, print, builders } from 'ember-template-recast';
import { createFilter } from 'vite';

const GLIMMER_TEMPLATE_LANG = 'glimmer-template';
function cloneNode(node) {
  return parse(print(node));
}
function escapeSource(source) {
  return source.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\n/g, '&#10;').replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
}
function extractCode(code) {
  let lines = code.split(/\r?\n/);

  // Remove leading blank lines
  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }

  // Remove trailing blank lines
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }
  if (lines.length === 0) {
    return '';
  }
  const whitespace = lines[0].match(/^(\s*)/)?.[1] ?? '';
  if (whitespace) {
    const regex = new RegExp(`^${whitespace}`);
    lines = lines.map(line => line.replace(regex, ''));
  }
  return escapeSource(lines.join('\n'));
}
function markArguments(node, blockName) {
  if (node.type === 'Template') {
    for (const child of node.body) {
      markArguments(child, blockName);
    }
    return;
  }
  if (node.type === 'ElementNode') {
    for (const attrNode of node.attributes) {
      if (attrNode.value.type !== 'MustacheStatement') {
        continue;
      }
      const path = attrNode.value.path;
      if (path.type !== 'PathExpression' || path.head.type !== 'VarHead' || !path.original.startsWith(blockName)) {
        continue;
      }
      const fullPath = path.tail.join('.');
      const placeholder = `__SHOWCASE_ARG_${blockName}-${fullPath}__`;
      attrNode.value = builders.mustache(placeholder);
    }
    for (const child of node.children) {
      markArguments(child, blockName);
    }
  }
}
function walkAST(node) {
  let didChange = false;
  if (node.type === 'Program') {
    for (const child of node.body) {
      didChange ||= walkAST(child);
    }
  }
  if (node.type === 'ElementNode') {
    if (node.tag === 'Section.Subsection') {
      const exampleBlock = node.children.find(child => child.type === 'ElementNode' && child.tag === ':example');
      if (exampleBlock) {
        const blockName = exampleBlock.blockParams[0];
        const clonedChildren = exampleBlock.children.map(cloneNode);
        if (blockName) {
          for (const child of clonedChildren) {
            markArguments(child, blockName);
          }
        }
        const rawSource = print(builders.program(clonedChildren));
        const codeContent = extractCode(rawSource);
        const sourceAttr = builders.attr('@sourceCode', builders.text(codeContent));
        const langAttr = builders.attr('@sourceLanguage', builders.text(GLIMMER_TEMPLATE_LANG));
        node.attributes.push(sourceAttr, langAttr);
        didChange = true;
      }
    }
    for (const child of node.children) {
      didChange = walkAST(child) || didChange;
    }
  }
  return didChange;
}
function extractCodeBlocks(options = {}) {
  const glob = options.filter ?? ['**/*.gts', '**/*.gjs'];
  const filter = createFilter(glob);
  return {
    name: 'ember-showcase-extract-code-blocks',
    enforce: 'pre',
    async transform(code, id) {
      if (!filter(id)) {
        return null;
      }
      const t = new Transformer(code);
      await t.asyncMap(contents => {
        const ast = parse(contents);
        let didChange = false;
        for (const node of ast.body) {
          didChange ||= walkAST(node);
        }
        if (didChange) {
          return print(ast);
        }
        return contents;
      });
      return t.toString();
    }
  };
}

export { extractCodeBlocks };
//# sourceMappingURL=plugins.js.map
