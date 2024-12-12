import { assert } from '@ember/debug';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { scheduleTask } from 'ember-lifeline';

import { ensurePathExists } from '../../utils/ensure-path-exists.ts';

import type { Binding, Optional } from '../../';
import type { Model } from '../../helpers/bind.ts';

export type BoundValueSignature<
  Signature,
  Type,
  M extends Model = Model,
  P extends keyof M | string = keyof M | string,
  T extends P extends keyof M ? M[P] & Type : unknown = P extends keyof M
    ? M[P] & Type
    : Type,
  BindingType extends Binding<M, P, T> = Binding<M, P, T>,
> = {
  Args: {
    binding?: BindingType;

    defaultValue?: T;
    useDefaultValue?: boolean;

    allowChange?: (newValue: T, oldValue: T) => boolean;
    initBinding?: (binding: BindingType) => void;
    onChange?: (value: T, ...args: unknown[]) => void;
  };
} & Signature;

export default class BoundValue<
  Signature,
  Type,
  M extends Model = Model,
  P extends keyof M | string = keyof M | string,
  T extends P extends keyof M
    ? Optional<M[P] & Type>
    : unknown = P extends keyof M ? Optional<M[P] & Type> : Type,
  BindingType extends Binding<M, P, T> = Binding<M, P, T>,
> extends Component<
  BoundValueSignature<Signature, Type, M, P, T, BindingType>
> {
  constructor(
    owner: unknown,
    args: BoundValueSignature<
      Signature,
      Type,
      M,
      P,
      T,
      BindingType
    >['Args'],
  ) {
    super(owner, args);

    const { binding } = args;

    assert(
      `You must provide a binding argument to ${this.constructor.name}`,
      binding,
    );

    const defaultValue = this.defaultValue;
    const initialValue = this.value;
    if (
      initialValue === undefined &&
      defaultValue !== undefined &&
      this.useDefaultValue
    ) {
      scheduleTask(this, 'actions', () => {
        this.onChange(defaultValue);
      });
    }

    this.args.initBinding?.(binding);
  }

  get model() {
    return this.args.binding!.model;
  }

  get valuePath() {
    return this.args.binding!.valuePath;
  }

  get value(): T {
    return this.args.binding!.value;
  }

  set value(newValue: T) {
    ensurePathExists(this.model as Record<string, unknown>, this.valuePath);
    this.args.binding!.value = newValue;
  }

  get useDefaultValue() {
    return this.args.useDefaultValue ?? false;
  }

  get defaultValue(): Optional<T> {
    if (this.args.defaultValue !== undefined) {
      return this.args.defaultValue ?? null;
    }
    return this.getDefaultValue?.() ?? null;
  }

  get allowChange() {
    if (this.args.allowChange) {
      return this.args.allowChange;
    }
    return () => true;
  }

  getDefaultValue(): Optional<T> {
    return null;
  }

  @action
  onChange(newValue: T, ...args: unknown[]) {
    const currentValue = this.value;
    if (!this.allowChange(newValue, currentValue)) {
      return;
    }

    this.value = newValue;
    this.args.onChange?.(newValue, ...args);
  }
}
