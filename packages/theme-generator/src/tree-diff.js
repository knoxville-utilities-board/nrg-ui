import * as csstree from 'css-tree';

export default function (toDiffInput, baseCSS) {
  const toDiffAst = csstree.parse(toDiffInput);
  const baseAst = csstree.parse(baseCSS);

  const toDiffDeclarations = [];

  let nodeParents = [];
  csstree.walk(toDiffAst, {
    enter: (node) => {
      if (node.type !== 'Declaration') {
        nodeParents.push(node);
        return;
      }

      toDiffDeclarations.push(serializeNode(node, nodeParents));
    },
    leave: (node) => {
      if (node.type !== 'Declaration') {
        nodeParents.pop();
      }
    },
  });

  nodeParents = [];
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

  const diffDeclarations = toDiffDeclarations.filter((declaration) => {
    return !baseDeclarations.includes(declaration);
  });

  nodeParents = [];
  csstree.walk(toDiffAst, {
    enter: (node, item, list) => {
      if (node.type !== 'Declaration') {
        nodeParents.push(node);
        return;
      }
      const stringDeclaration = serializeNode(node, nodeParents);
      if (!diffDeclarations.includes(stringDeclaration)) {
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

  return csstree.generate(toDiffAst);
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
    if ((parent.type === 'Rule' || parent.type === 'Atrule') && parent.prelude) {
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
