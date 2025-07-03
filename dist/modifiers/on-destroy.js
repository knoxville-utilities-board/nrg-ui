
import { registerDestructor } from '@ember/destroyable';
import Modifier from 'ember-modifier';

// eslint-disable-next-line @typescript-eslint/no-explicit-any

class OnDestroy extends Modifier {
  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, () => {
      this.callback?.();
    });
  }
  modify(element, [callback, ...args]) {
    this.callback = () => callback(element, ...args);
  }
}

export { OnDestroy as default };
//# sourceMappingURL=on-destroy.js.map
