import Modifier from 'ember-modifier';

class Classes extends Modifier {
  modify(element, positional, named) {
    const classes = named.filter ?? true ? positional.filter(Boolean) : positional;
    element.classList.value = classes.join(' ');
  }
}

export { Classes as default };
//# sourceMappingURL=classes.js.map
