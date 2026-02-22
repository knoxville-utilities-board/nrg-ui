import bcd from '@mdn/browser-compat-data';

const ELEMENT_INDEX = bcd.html['elements'];
const API_INDEX = bcd.api;
const BUILTINS_INDEX = bcd.javascript['builtins'];
function createLink(name) {
  if (Array.isArray(name)) {
    name = name.filter(Boolean).join('-');
  }
  return name.toLowerCase().replace(/\s+/g, '_');
}
function stringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stringify).join(', ')}]`;
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
}
function getMdnLinkForElement(element) {
  const data = ELEMENT_INDEX[element.toLowerCase()];
  return data?.__compat?.mdn_url ?? null;
}
function getMdnLinkForApi(api) {
  const data = BUILTINS_INDEX[api] ?? API_INDEX[api];
  return data?.__compat?.mdn_url ?? null;
}

export { API_INDEX, BUILTINS_INDEX, ELEMENT_INDEX, createLink, getMdnLinkForApi, getMdnLinkForElement, stringify };
//# sourceMappingURL=utils.js.map
