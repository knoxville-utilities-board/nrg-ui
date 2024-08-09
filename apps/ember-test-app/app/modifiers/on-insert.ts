import Modifier, { type PositionalArgs } from 'ember-modifier';

interface OnInsertSignature {
  Element: HTMLElement;
  Args: {
    Positional: [
      (el: HTMLElement, ...args: unknown[]) => unknown,
      ...args: unknown[],
    ];
  };
}

export default class OnInsertModifier extends Modifier<OnInsertSignature> {
  modify(
    element: OnInsertSignature['Element'],
    [fn, ...args]: PositionalArgs<OnInsertSignature>,
  ) {
    fn(element, ...args);
  }
}
