export default function (inputCSS) {
  const compressedRootBlocks = inputCSS.replaceAll('}:root{', ';');
  return compressedRootBlocks.replaceAll('}', '}\n\n');
}
