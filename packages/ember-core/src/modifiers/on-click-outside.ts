import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import Modifier from 'ember-modifier';

import type Owner from '@ember/owner';

type Named = {
  disabled?: boolean;
};
type Positional = [(evt: MouseEvent, ...args: unknown[]) => unknown];
type Element = HTMLElement;

export interface OnClickOutsideSignature {
  Args: {
    Named: Named;
    Positional: Positional;
  };
  Element: Element;
}

function cleanup(instance: OnClickOutside) {
  delete instance.element?.dataset['clickHandler'];
  document.documentElement.removeEventListener(
    'click',
    instance.clickHandler,
    true,
  );
}

export default class OnClickOutside extends Modifier<OnClickOutsideSignature> {
  @tracked
  declare element: Element;

  @tracked
  declare callback: Positional[0];

  @tracked
  declare named: Named;

  guid = guidFor(this);

  constructor(owner: Owner, args: { named: Named; positional: Positional }) {
    super(owner, args);

    registerDestructor(this, cleanup);
  }

  get disabled() {
    return this.named?.disabled;
  }

  modify(element: Element, positional: Positional, named: Named) {
    this.element = element;
    this.callback = positional[0];
    this.named = named;

    cleanup(this);

    element.dataset['clickHandler'] = this.guid;
    document.documentElement.addEventListener('click', this.clickHandler, true);
  }

  @action
  clickHandler(evt: MouseEvent, ...args: unknown[]) {
    const foundTargetInWrapper = (evt.target as HTMLElement).closest(
      `[data-click-handler=${this.guid}]`,
    );
    if (!foundTargetInWrapper && !this.disabled) {
      this.callback(evt, ...args);
    }
    return false;
  }
}
