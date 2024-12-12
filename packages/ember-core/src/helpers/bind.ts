import Helper from '@ember/component/helper';
import { get, set } from '@ember/object';

export type Model = Record<string, unknown>;

export interface Binding<
  M extends Model = Model,
  P extends keyof M | string = keyof M | string,
  T extends P extends keyof M ? M[P] : unknown = P extends keyof M
    ? M[P]
    : unknown,
> {
  model: M;
  valuePath: keyof M | string;
  value: T;
}

export function bind<
  M extends Model = Model,
  ValuePath extends keyof M | string = keyof M | string,
  Type extends ValuePath extends keyof M
    ? M[ValuePath]
    : unknown = ValuePath extends keyof M ? M[ValuePath] : unknown,
>(model: M, valuePath: ValuePath): Binding<M, ValuePath, Type> {
  return {
    model,
    valuePath,
    get value(): Type {
      return get(model, valuePath as keyof M) as Type;
    },
    set value(value: M[keyof M]) {
      set(model, valuePath as keyof M, value);
    },
  };
}

export default class Bind<M extends Model = Model> extends Helper {
  compute([model, valuePath]: [M, keyof M]): Binding<M> {
    return bind(model, valuePath);
  }
}
