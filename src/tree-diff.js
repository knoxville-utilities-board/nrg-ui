import * as csstree from 'css-tree';

export default function (inputCSS, baseCSS) {
  const inputAst = csstree.parse(inputCSS);
  const baseAst = csstree.parse(baseCSS);

  // Gather a list of fully qualified declarations from the base CSS
  let nodeParents = [];
  const baseDeclarations = [];
  csstree.walk(baseAst, {
    enter: (node) => {
      if (node.type !== 'Declaration') {
        nodeParents.push(node);
        return;
      }

      baseDeclarations.push(serializeNode(node, nodeParents));
    },
    leave: (node) => {
      if (node.type !== 'Declaration') {
        nodeParents.pop();
      }
    },
  });

  nodeParents = [];
  csstree.walk(inputAst, {
    enter: (node, item, list) => {
      // Also strip extraneous comments and charset declarations
      if (
        node.type == 'Comment' ||
        (node.type == 'Atrule' && node.name == 'charset')
      ) {
        list.remove(item);
        return;
      }

      if (node.type !== 'Declaration') {
        nodeParents.push(node);
        return;
      }

      // Strip declarations from the toDiff CSS that are present in the base CSS
      const stringDeclaration = serializeNode(node, nodeParents);
      if (baseDeclarations.includes(stringDeclaration)) {
        list.remove(item);
      }
    },
    leave: (node, item, list) => {
      if (node.type !== 'Declaration') {
        nodeParents.pop();
      }
      if (node?.block?.children?.isEmpty) {
        list?.remove(item);
      }
    },
  });

  return csstree.generate(inputAst);
}

function serializeNode(declaration, parents) {
  const serialized = [];
  for (const parent of parents) {
    if (parent.type === 'StyleSheet') {
      continue;
    }
    if (parent.type === 'Block') {
      serialized.push('{');
    }
    if (
      (parent.type === 'Rule' || parent.type === 'Atrule') &&
      parent.prelude
    ) {
      const objectRule = csstree.toPlainObject(parent.prelude);
      serialized.push(renderKey(objectRule));
    }
  }
  const value =
    declaration.value?.value ??
    declaration.value?.name ??
    declaration.value ??
    '';
  serialized.push(`${declaration.property}: ${value}`);

  return serialized.join(' ');
}

function renderKey(objectNode) {
  const children = [];
  if (objectNode.children) {
    for (const child of objectNode.children) {
      children.push(renderKey(child));
    }
  } else {
    const name = objectNode.name?.name ?? objectNode.name;
    const value =
      objectNode.value?.value ??
      objectNode.value?.name ??
      objectNode.value ??
      '';
    children.push(`${name} ${value}`);
  }
  return children.join(',');
}
