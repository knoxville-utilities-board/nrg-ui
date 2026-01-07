import Helper from '@ember/component/helper';

import type { Binding } from '../';

export function bind<Model extends object = Record<string, unknown>>(
  model: Model,
  valuePath: string,
): Binding<Model> {
  return {
    model,
    valuePath,
  };
}

export default class Bind<Model extends object = Record<string, unknown>> extends Helper {
  compute([model, valuePath]: [Model, string]) {
    return bind(model, valuePath);
  }
}
