import { assert } from '@ember/debug';
import { action, get, set } from '@ember/object';
import Component from '@glimmer/component';
import { runTask, scheduleTask } from 'ember-lifeline';

import { ensurePathExists } from '../../utils/ensure-path-exists.ts';

import type { FieldOptions } from './field.gts';
import type { Binding, Optional } from '../../';
import type Owner from '@ember/owner';

type AllowChangeFn<T> = (newValue: T, oldValue: T) => boolean;

export type BoundValueSignature<Signature, Type> = {
  Args: {
    binding?: Binding;

    defaultValue?: Type;
    useDefaultValue?: boolean;

    fieldOptions?: FieldOptions;

    allowChange?: AllowChangeFn<Optional<Type>>;
    initBinding?: (binding: Binding) => void;
    onChange?: (value: Optional<Type>, ...args: unknown[]) => void;
  };
} & Signature;

export default class BoundValue<Signature, T> extends Component<
  BoundValueSignature<Signature, Optional<T>>
> {
  constructor(
    owner: Owner,
    args: BoundValueSignature<Signature, Optional<T>>['Args'],
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

    runTask(this, () => {
      const initFn = args.fieldOptions?.initBinding ?? args.initBinding;

      initFn?.(binding);
    });
  }

  get model() {
    return this.args.binding!.model;
  }

  get valuePath() {
    return this.args.binding!.valuePath;
  }

  get value(): Optional<T> {
    return get(this.model, this.valuePath) as T;
  }

  set value(newValue: Optional<T>) {
    ensurePathExists(this.model, this.valuePath);
    set(this.model, this.valuePath, newValue);
  }

  get useDefaultValue(): boolean {
    return this.args.useDefaultValue ?? false;
  }

  get defaultValue(): Optional<T> {
    if (this.args.defaultValue !== undefined) {
      return this.args.defaultValue;
    }
    return this.getDefaultValue?.() ?? null;
  }

  get allowChange(): AllowChangeFn<Optional<T>> {
    if (this.args.allowChange) {
      return this.args.allowChange;
    }
    return () => true;
  }

  getDefaultValue(): Optional<T> {
    return null;
  }

  @action
  onChange(newValue: Optional<T>, ...args: unknown[]) {
    const currentValue = this.value;
    if (!this.allowChange(newValue, currentValue)) {
      return;
    }

    this.value = newValue;
    this.args.onChange?.(newValue, ...args);
  }
}
