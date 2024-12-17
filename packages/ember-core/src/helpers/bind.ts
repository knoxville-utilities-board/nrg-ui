import Helper from '@ember/component/helper';
import { get, set } from '@ember/object';

import type { Optional } from '../';

export interface Binding<
  Type,
  M extends object = object,
  P extends keyof M | string = keyof M | string,
  T extends P extends keyof M
    ? Optional<M[P] & Type>
    : Optional<Type> = P extends keyof M
    ? Optional<M[P] & Type>
    : Optional<Type>,
> {
  model: M;
  valuePath: keyof M | string;
  value: Optional<T>;
}

export function bind<
  Type,
  M extends object = object,
  ValuePath extends keyof M | string = keyof M | string,
  T extends ValuePath extends keyof M
    ? M[ValuePath] & Type
    : Type = ValuePath extends keyof M ? M[ValuePath] & Type : Type,
>(model: M, valuePath: ValuePath): Binding<Type, M, ValuePath, T> {
  return {
    model,
    valuePath,
    get value(): T {
      return get(model, valuePath as keyof M) as T;
    },
    set value(value: M[keyof M]) {
      set(model, valuePath as keyof M, value);
    },
  };
}

export default class Bind<Type, M extends object = object> extends Helper {
  compute([model, valuePath]: [M, keyof M]): Binding<Type, M> {
    return bind(model, valuePath);
  }
}
