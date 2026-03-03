import { assert } from '@ember/debug';
import { getOwnConfig } from '@embroider/macros';
import bcd from '@mdn/browser-compat-data';

export const ELEMENT_INDEX = bcd.html['elements']!;
export const API_INDEX = bcd.api;
export const BUILTINS_INDEX = bcd.javascript['builtins']!;

type ImportOptions = {
  importSlug?: string;
  type?: boolean;
};

export function createImportPath(name: string, options?: string | ImportOptions): string {
  const dasherizedName = name.toLowerCase().replace(/\s+/g, '-');
  const titleCasedName = name.replace(/\s+(\w)/g, (_, c) => c.toUpperCase());

  const IMPORT_SLUG_MAP: Record<string, string> = getOwnConfig()?.imports ?? {};

  const slug = typeof options === 'string' ? options : (options?.importSlug ?? '');

  if (!slug) {
    return `import ${titleCasedName} from '${dasherizedName}'`;
  }

  let isTypeImport = false;
  if (typeof options === 'object' && options.type) {
    isTypeImport = true;
  }
  const prefix = isTypeImport ? 'import type' : 'import';

  assert(`Import slug ${slug} is not defined`, IMPORT_SLUG_MAP[slug]);
  const basePath = IMPORT_SLUG_MAP[slug];

  return `${prefix} ${titleCasedName} from '${basePath}/${dasherizedName}'`;
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
