import { getOwnConfig } from '@embroider/macros';
import bcd from '@mdn/browser-compat-data';

export const ELEMENT_INDEX = bcd.html['elements']!;
export const API_INDEX = bcd.api;
export const BUILTINS_INDEX = bcd.javascript['builtins']!;

type ImportOptions = {
  importSlug?: string;
  type?: boolean;
};

declare module '@embroider/macros' {
  interface EmbroiderConfig {
    imports?: Record<string, string>;
  }

  export function getOwnConfig(): EmbroiderConfig | undefined;
}

export function createImportPath(
  name: string,
  importSlug?: string,
  options?: ImportOptions,
): string {
  const dasherizedName = name?.toLowerCase().replace(/\s+/g, '-') ?? '';
  const titleCasedName = name?.replace(/\s+(\w)/g, (_, c) => c.toUpperCase()) ?? '';

  const importSlugMap: Record<string, string> = getOwnConfig()?.imports ?? {};

  const slug = importSlug ?? options?.importSlug ?? '';

  if (!slug) {
    return `import ${titleCasedName} from '${dasherizedName}'`;
  }

  const isTypeImport = options?.type === true;
  const prefix = isTypeImport ? 'import type' : 'import';
  const basePath = importSlugMap[slug];

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
