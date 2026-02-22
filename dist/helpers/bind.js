import Helper from '@ember/component/helper';

function bind(model, valuePath) {
  return {
    model,
    valuePath
  };
}
class Bind extends Helper {
  compute([model, valuePath]) {
    return bind(model, valuePath);
  }
}

export { bind, Bind as default };
//# sourceMappingURL=bind.js.map
