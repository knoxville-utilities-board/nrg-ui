import bcd from '@mdn/browser-compat-data';

export const ELEMENT_INDEX = bcd.html['elements']!;

export function createLink(name: string | string[]) {
  if (Array.isArray(name)) {
    name = name.filter(Boolean).join('-');
  }

  return name.toLowerCase().replace(/\s+/g, '_');
}

export function stringify(value: unknown) {
  return String(value);
}

export function getMdnLinkForElement(element: string) {
  const data = ELEMENT_INDEX[element.toLowerCase()];

  return data?.__compat?.mdn_url ?? null;
}
