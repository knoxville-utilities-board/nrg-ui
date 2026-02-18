import { getOwnConfig } from '@embroider/macros';
import bcd from '@mdn/browser-compat-data';

export const ELEMENT_INDEX = bcd.html['elements']!;
export const API_INDEX = bcd.api;
export const BUILTINS_INDEX = bcd.javascript['builtins']!;

export function createImportPath(name?: string, parentName?: string) {
  name = name?.replace(/\s+/g, '') ?? '';

  const basePath = getOwnConfig()?.imports?.basePath ?? '@nrg-ui/core';

  if (parentName === 'form') {
    name = 'Form';
  }

  let importStatement = `import { ${name} } from '${basePath}`;
  if (parentName) {
    importStatement += `/${parentName.toLowerCase().replace(/\s+/g, '-')}`;
  }

  return `${importStatement}';`;
}

export function createLink(name: string | string[]) {
  if (Array.isArray(name)) {
    name = name.filter(Boolean).join('-');
  }

  return name.toLowerCase().replace(/\s+/g, '_');
}

export function stringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stringify).join(', ')}]`;
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return String(value);
}

export function getMdnLinkForElement(element: string) {
  const data = ELEMENT_INDEX[element.toLowerCase()];

  return data?.__compat?.mdn_url ?? null;
}

export function getMdnLinkForApi(api: string) {
  const data = BUILTINS_INDEX[api] ?? API_INDEX[api];

  return data?.__compat?.mdn_url ?? null;
}
