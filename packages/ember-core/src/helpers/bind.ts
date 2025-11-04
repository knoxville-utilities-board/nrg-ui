import Helper from '@ember/component/helper';

import type { Binding } from '../';

export function bind(
  model: Record<string, unknown>,
  valuePath: string,
): Binding {
  return {
    model,
    valuePath,
  };
}

export default class Bind extends Helper {
  compute([model, valuePath]: [Record<string, unknown>, string]) {
    return bind(model, valuePath);
  }
}
