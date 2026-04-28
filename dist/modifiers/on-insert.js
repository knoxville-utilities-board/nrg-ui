import Modifier from 'ember-modifier';

class OnInsertModifier extends Modifier {
  modify(element, [fn], named) {
    fn(element, named);
  }
}

export { OnInsertModifier as default };
//# sourceMappingURL=on-insert.js.map
