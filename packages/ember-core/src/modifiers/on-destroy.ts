import { registerDestructor } from '@ember/destroyable';
import Modifier from 'ember-modifier';

import type Owner from '@ember/owner';
import type { ArgsFor } from 'ember-modifier';

type CallbackFn<Element, A> = (element: Element, args: A) => void;
export interface OnDestroySignature<Element extends HTMLElement, Named extends object> {
  Element: Element;
  Args: {
    Positional: [CallbackFn<Element, Named>];
    Named: Named;
  };
}

export default class OnDestroy<
  Element extends HTMLElement,
  Named extends Record<string, unknown>,
> extends Modifier<OnDestroySignature<Element, Named>> {
  declare callback: () => void;

  constructor(owner: Owner, args: ArgsFor<OnDestroySignature<Element, Named>>) {
    super(owner, args);

    registerDestructor(this, () => {
      this.callback?.();
    });
  }

  modify(element: Element, [callback]: [CallbackFn<Element, Named>], named: Named): void {
    this.callback = () => callback(element, named);
  }
}
