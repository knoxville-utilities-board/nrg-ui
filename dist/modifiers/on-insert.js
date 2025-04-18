import Modifier from 'ember-modifier';

class OnInsertModifier extends Modifier {
  modify(element, [fn, ...args]) {
    fn(element, ...args);
  }
}

export { OnInsertModifier as default };
//# sourceMappingURL=on-insert.js.map
