import { action } from '@ember/object';

import BoundValue from '../bound-value.ts';

import type { AttrValue } from '@glint/template';

export type InputFieldSignature<S> = {
  Element: HTMLInputElement;
  Args: {
    basic?: boolean;
    describedBy?: string;
    disabled?: boolean;
    id?: string;
    isInvalid?: boolean;
    isWarning?: boolean;
    placeholder?: string;
    readonly?: boolean;
  };
} & S;

export default class InputField<
  S = object,
  T extends AttrValue = string,
> extends BoundValue<InputFieldSignature<S>, T> {
  get classList() {
    const classes = ['form-control'];

    if (this.args.basic) {
      classes[0] += '-plaintext';
    }

    if (this.args.isInvalid) {
      classes.push('is-invalid');
    } else if (this.args.isWarning) {
      classes.push('is-warning');
    }

    return classes.join(' ');
  }

  @action
  change(evt: Event) {
    const target = evt.target as HTMLInputElement;
    this.onChange(target?.value as T);
  }
}
