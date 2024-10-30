export default function (inputCSS, themeName) {
  const strippedCSS = inputCSS.replace(',[data-bs-theme=light]', '');
  const compressedRootBlocks = strippedCSS.replaceAll('}:root{', ';');
  const themedCSS = compressedRootBlocks.replace(':root', `[data-theme='${themeName}']`);
  return themedCSS.replaceAll('}', '}\n\n');
}
