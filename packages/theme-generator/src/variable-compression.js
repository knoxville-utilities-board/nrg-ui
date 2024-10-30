import * as csstree from 'css-tree';

const rootVariables = {};

function findMatchingRootValues(value) {
  const matching = [];
  for (const [rootKey, rootValue] of Object.entries(rootVariables)) {
    if (value == rootValue) {
      matching.push(rootKey);
    }
  }
  return matching;
}

function findClosestMatchingPropName(prop, value, possibleMatches) {
  if (!possibleMatches?.length) {
    return null;
  }

  if (value.startsWith('#')) {
    return possibleMatches[0]; // Colors are defined first and the names are unique, so we can just return the first match
  }

  // Return the closest match based on the number of matching segments from the end
  let closestMatch = null;
  let highestMatchScore = 0;

  for (const match of possibleMatches) {
    const matchSegments = match.split('-').reverse();
    const propSegments = prop.split('-').reverse();
    // Reverse segments of css rules as most specific segments are at the end
    let reverseMatches = 0;
    let totalMatches = 0;

    for (let segment of propSegments) {
      if (matchSegments.includes(segment)) {
        totalMatches++;
      } else {
        break;
      }
    }

    if (totalMatches === 0) {
      continue; // Do not match non-color values if no segments match
    }

    for (let i = 0; i < matchSegments.length && i < propSegments.length; i++) {
      if (matchSegments[i] === propSegments[i]) {
        reverseMatches++;
      } else {
        break;
      }
    }

    const matchScore = totalMatches + reverseMatches / 2;

    if (matchScore > highestMatchScore) {
      closestMatch = match;
      highestMatchScore = matchScore;
    }
  }

  return closestMatch;
}

function findRootVariableReplacement(node) {
  const prop = node.property;
  const value = node.value.value.trim();
  const possibleMatches = findMatchingRootValues(value);
  return findClosestMatchingPropName(prop, value, possibleMatches);
}

function isRootNode(node) {
  return (
    node.type == 'Rule' &&
    node.prelude?.children?.first?.children?.first?.type ==
      'PseudoClassSelector' &&
    node.prelude?.children?.first?.children?.first?.name == 'root'
  );
}

export default function (inputCSS) {
  const ast = csstree.parse(inputCSS);

  let inRootNode = false;
  csstree.walk(ast, {
    enter: (node, item, list) => {
      if (isRootNode(node)) {
        inRootNode = true;
      }
      if (node.type !== 'Declaration') {
        return;
      }
      if (!node.property.startsWith('--')) {
        return;
      }
      if (node.value.value.includes('var(')) {
        return;
      }
      const prop = node.property;
      const value = node.value.value.trim();
      if (inRootNode) {
        rootVariables[prop] = value;
        return;
      } else {
        const replacement = findRootVariableReplacement(node);
        if (replacement) {
          node.value.value = `var(${replacement})`;
        }
      }
    },
    leave: (node, item, list) => {
      if (isRootNode(node)) {
        inRootNode = false;
      }
    },
  });

  return csstree.generate(ast);
}
