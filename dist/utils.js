import { assert } from '@ember/debug';
import { getOwnConfig } from '@embroider/macros';
import bcd from '@mdn/browser-compat-data';

const ELEMENT_INDEX = bcd.html['elements'];
const API_INDEX = bcd.api;
const BUILTINS_INDEX = bcd.javascript['builtins'];
const IMPORT_SLUG_MAP = getOwnConfig()?.imports ?? {};
function createImportPath(name, options) {
  const dasherizedName = name.toLowerCase().replace(/\s+/g, '-');
  const titleCasedName = name.replace(/\s+(\w)/g, (_, c) => c.toUpperCase());
  const slug = typeof options === 'string' ? options : options?.importSlug ?? '';
  if (!slug) {
    return `import ${titleCasedName} from '${dasherizedName}';`;
  }
  let isTypeImport = false;
  if (typeof options === 'object' && options.type) {
    isTypeImport = true;
  }
  const prefix = isTypeImport ? 'import type' : 'import';
  assert(`Import slug ${slug} is not defined`, IMPORT_SLUG_MAP[slug]);
  const basePath = IMPORT_SLUG_MAP[slug];
  return `${prefix} ${titleCasedName} from '${basePath}/${dasherizedName}';`;
}
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

export { API_INDEX, BUILTINS_INDEX, ELEMENT_INDEX, createImportPath, createLink, getMdnLinkForApi, getMdnLinkForElement, stringify };
//# sourceMappingURL=utils.js.map
