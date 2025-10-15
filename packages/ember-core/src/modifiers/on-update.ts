import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { runTask } from 'ember-lifeline';
import Modifier from 'ember-modifier';

type CallbackFn<Element, A> = (element: Element, args: A) => void;
export interface OnUpdateSignature<
  Element extends HTMLElement,
  Named extends object,
> {
  Element: Element;
  Args: {
    Positional: [CallbackFn<Element, Named>];
    Named: Named;
  };
}

export default class OnUpdate<
  Element extends HTMLElement,
  Named extends Record<string, unknown>,
> extends Modifier<OnUpdateSignature<Element, Named>> {
  @tracked
  initialized = false;

  modify(element: Element, [fn]: [CallbackFn<Element, Named>], named: Named) {
    if (!this.initialized) {
      runTask(this, () => {
        this.initialized = true;

        // Entangle all named arguments
        Object.values(named);
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

      // Entangle all named arguments
      Object.values(named);

      fn(element, named);
    });
  }
}
