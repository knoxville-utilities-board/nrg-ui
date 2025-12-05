import { registerDestructor } from '@ember/destroyable';
import Modifier from 'ember-modifier';

class OnDestroy extends Modifier {
  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, () => {
      this.callback?.();
    });
  }
  modify(element, [callback], named) {
    this.callback = () => callback(element, named);
  }
}

export { OnDestroy as default };
//# sourceMappingURL=on-destroy.js.map
