export default function (inputCSS, themeName) {
  const strippedCSS = inputCSS.replace(',[data-bs-theme=light]', '');
  const compressedRootBlocks = strippedCSS.replaceAll('}:root{', ';');
  const themedCSS = compressedRootBlocks.replace(':root', `[data-theme='${themeName}']`);
  const spacedCSS = themedCSS.replaceAll('}', '}\n\n');
  return spacedCSS;
}
