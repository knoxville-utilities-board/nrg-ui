import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import Modifier from 'ember-modifier';
import { g, i, n } from 'decorator-transforms/runtime';

function cleanup(instance) {
  delete instance.element?.dataset['clickHandler'];
  document.documentElement.removeEventListener('click', instance.clickHandler, true);
}
class OnClickOutside extends Modifier {
  static {
    g(this.prototype, "element", [tracked]);
  }
  #element = (i(this, "element"), void 0);
  static {
    g(this.prototype, "callback", [tracked]);
  }
  #callback = (i(this, "callback"), void 0);
  static {
    g(this.prototype, "named", [tracked]);
  }
  #named = (i(this, "named"), void 0);
  guid = guidFor(this);
  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }
  get disabled() {
    return this.named?.disabled;
  }
  modify(element, positional, named) {
    this.element = element;
    this.callback = positional[0];
    this.named = named;
    cleanup(this);
    element.dataset['clickHandler'] = this.guid;
    document.documentElement.addEventListener('click', this.clickHandler, true);
  }
  clickHandler(evt, ...args) {
    const foundTargetInWrapper = evt.target.closest(`[data-click-handler=${this.guid}]`);
    if (!foundTargetInWrapper && !this.disabled) {
      this.callback(evt, ...args);
    }
    return false;
  }
  static {
    n(this.prototype, "clickHandler", [action]);
  }
}

export { OnClickOutside as default };
//# sourceMappingURL=on-click-outside.js.map
