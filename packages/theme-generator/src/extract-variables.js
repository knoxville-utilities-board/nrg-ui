import * as csstree from 'css-tree';

export default function (inputCSS) {
  const ast = csstree.parse(inputCSS);

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

  return csstree.generate(ast);
}
