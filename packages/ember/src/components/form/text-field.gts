import { on } from '@ember/modifier';
import { action } from '@ember/object';

import BoundValue from './bound-value.ts';

export interface TextFieldSignature {
  Element: HTMLInputElement;
  Args: {
    basic?: boolean;
    describedBy?: string;
    disabled?: boolean;
    id?: string;
    isInvalid?: boolean;
    readonly?: boolean;
  };
}

export default class TextField extends BoundValue<TextFieldSignature, string> {
  get classList() {
    const classes = ['form-control'];

    if (this.args.basic) {
      classes[0] += '-plaintext';
    }

    if (this.args.isInvalid) {
      classes.push('is-invalid');
    }

    return classes.join(' ');
  }

  @action
  change(evt: Event) {
    const target = evt.target as HTMLInputElement;
    this.onChange(target?.value);
  }

  <template>
    <input
      aria-describedby={{@describedBy}}
      class={{this.classList}}
      disabled={{@disabled}}
      id={{@id}}
      readonly={{@readonly}}
      type="text"
      value={{this.value}}
      {{on "input" this.change}}
      ...attributes
    />
  </template>
}
