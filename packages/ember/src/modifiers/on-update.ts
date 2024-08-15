import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { runTask } from 'ember-lifeline';
import Modifier from 'ember-modifier';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (element: Element, ...args: any[]) => void;
type Element = HTMLElement;

export interface OnUpdateSignature<Positional, Named> {
  Element: HTMLElement;
  Args: {
    Named: Named;
    Positional: [Fn, Positional];
  };
}

export default class OnUpdate<
  Positional,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Named extends Record<string, any>,
> extends Modifier<OnUpdateSignature<Positional, Named>> {
  @tracked
  initialized = false;

  modify(
    element: Element,
    [fn, ...positional]: [Fn, Positional],
    named: Named,
  ) {
    if (!this.initialized) {
      runTask(this, () => {
        this.initialized = true;
      });
      return;
    }

    assert(
      'The first argument to the `on-update` modifier must be a function',
      typeof fn === 'function',
    );

    runTask(this, () => {
      if (!this.initialized) {
        return;
      }

      fn(element, positional, named);
    });
  }
}
