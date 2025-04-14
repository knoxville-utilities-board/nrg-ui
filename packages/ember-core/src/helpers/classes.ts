import Helper from '@ember/component/helper';

type Positional = unknown[];
type Element = HTMLElement;

export function classes(...args: unknown[]): string {
  const classes = args.filter(Boolean);

  return classes.join(' ');
}

export interface ClassesSignature {
  Element: Element;
  Args: {
    Positional: Positional;
  };
  Return: string;
}

export default class Classes extends Helper<ClassesSignature> {
  compute(positional: Positional) {
    return classes(positional);
  }
}
