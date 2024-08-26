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

type BindSignature<Model extends object = Record<string, unknown>> = {
  Args: {
    Positional: [Model, string];
  };
  Return: Binding<Model>;
};

export default class Bind<
  Model extends object = Record<string, unknown>,
> extends Helper<BindSignature<Model>> {
  compute([
    model,
    valuePath,
  ]: BindSignature<Model>['Args']['Positional']): Binding<Model> {
    return bind(model, valuePath);
  }
}
