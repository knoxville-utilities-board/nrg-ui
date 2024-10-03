import * as csstree from 'css-tree';
import fs from 'fs';
import path from 'path';

const inputPath = path.resolve(process.cwd(), 'tmp/theme.css');
const rawCss = fs.readFileSync(inputPath, 'utf8');
const ast = csstree.parse(rawCss);

// Cleanup non-variable declarations
csstree.walk(ast, {
  enter: (node, item, list) => {
    if (node.type == 'Comment') {
      list.remove(item);
      return;
    }
    if (node.type == 'Atrule' && node.name == 'charset') {
      list.remove(item);
      return;
    }
    if (node.type !== 'Declaration') {
      return;
    }
    if (node.property.startsWith('--')) {
      return;
    }
    list.remove(item);
    if (!list.isEmpty) {
      return;
    }
  },
  leave: (node, item, list) => {
    if (node?.block?.children?.isEmpty) {
      list?.remove(item);
    }
  },
});

const outputCSS = csstree.generate(ast);

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

fs.writeFileSync('dist/theme.css', outputCSS);
