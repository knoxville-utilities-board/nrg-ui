import * as csstree from 'css-tree';

function isRootNode(node) {
  return (
    node.type == 'Rule' &&
    node.prelude?.children?.first?.children?.first?.type ==
      'PseudoClassSelector' &&
    node.prelude?.children?.first?.children?.first?.name == 'root'
  );
}

export function stripRoot(inputCSS) {
  const ast = csstree.parse(inputCSS);

  csstree.walk(ast, {
    enter: (node, item, list) => {
      if (isRootNode(node)) {
        list.remove(item);
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

export function stripNonRoot(inputCSS) {
  const ast = csstree.parse(inputCSS);

  let inRootNode = false;
  csstree.walk(ast, {
    enter: (node, item, list) => {
      if (isRootNode(node)) {
        inRootNode = true;
      }
      if (inRootNode) {
        return;
      }
      if (node.type !== 'Declaration') {
        return;
      }
      list.remove(item);
    },
    leave: (node, item, list) => {
      if (isRootNode(node)) {
        inRootNode = false;
      }
      if (node?.block?.children?.isEmpty) {
        list?.remove(item);
      }
    },
  });

  return csstree.generate(ast);
}
