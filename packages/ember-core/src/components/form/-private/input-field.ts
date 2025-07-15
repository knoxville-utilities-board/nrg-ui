import { action } from '@ember/object';

import BoundValue from '../bound-value.ts';

import type { FieldOptions } from '../field.gts';
import type { AttrValue } from '@glint/template';

export type InputFieldSignature<S> = {
  Element: HTMLInputElement;
  Args: {
    basic?: boolean;
    readonly?: boolean;

    fieldOptions?: FieldOptions;
  } & S;
};

export default class InputField<
  S = object,
  T extends AttrValue = string,
> extends BoundValue<InputFieldSignature<S>, T> {
  get classList() {
    const classes = ['form-control'];

    if (this.args.basic) {
      classes[0] += '-plaintext';
    }

    if (this.args.fieldOptions?.isInvalid) {
      classes.push('is-invalid');
    } else if (this.args.fieldOptions?.isWarning) {
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
