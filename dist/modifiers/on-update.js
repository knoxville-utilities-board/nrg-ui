
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';
import { runTask } from 'ember-lifeline';
import Modifier from 'ember-modifier';
import { g, i } from 'decorator-transforms/runtime';

class OnUpdate extends Modifier {
  static {
    g(this.prototype, "initialized", [tracked], function () {
      return false;
    });
  }
  #initialized = (i(this, "initialized"), void 0);
  modify(element, [fn, ...positional], named) {
    if (!this.initialized) {
      runTask(this, () => {
        this.initialized = true;
      });
      return;
    }
    assert('The first argument to the `on-update` modifier must be a function', typeof fn === 'function');
    runTask(this, () => {
      if (!this.initialized) {
        return;
      }
      fn(element, positional, named);
    });
  }
}

export { OnUpdate as default };
//# sourceMappingURL=on-update.js.map
