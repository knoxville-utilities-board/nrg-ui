import { registerDestructor } from '@ember/destroyable';
import Modifier from 'ember-modifier';

import type Owner from '@ember/owner';
import type { ArgsFor } from 'ember-modifier';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyArray = any[];

type CallbackFn<Args extends AnyArray> = (
  element: HTMLElement,
  ...args: Args
) => void;

export interface OnDestroySignature<Args extends AnyArray> {
  Element: HTMLElement;
  Args: {
    Positional: [CallbackFn<Args>, ...Args];
  };
}

export default class OnDestroy<Args extends AnyArray> extends Modifier<
  OnDestroySignature<Args>
> {
  declare callback: () => void;

  constructor(owner: Owner, args: ArgsFor<OnDestroySignature<Args>>) {
    super(owner, args);

    registerDestructor(this, () => {
      this.callback?.();
    });
  }

  modify(
    element: HTMLElement,

    [callback, ...args]: [CallbackFn<Args>, ...Args],
  ): void {
    this.callback = () => callback(element, ...args);
  }
}
