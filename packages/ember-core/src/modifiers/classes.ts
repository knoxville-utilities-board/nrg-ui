import Modifier from 'ember-modifier';

type Named = {
  filter?: boolean;
};
type Positional = unknown[];
type Element = HTMLElement;

export interface ClassesSignature {
  Element: Element;
  Args: {
    Named: Named;
    Positional: Positional;
  };
}

export default class Classes extends Modifier<ClassesSignature> {
  modify(element: Element, positional: Positional, named: Named) {
    const classes =
      (named.filter ?? true) ? positional.filter(Boolean) : positional;

    element.classList.value = classes.join(' ');
  }
}
