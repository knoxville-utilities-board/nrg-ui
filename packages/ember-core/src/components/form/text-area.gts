import { on } from '@ember/modifier';
import { action } from '@ember/object';

import BoundValue from './bound-value.ts';

export interface TextAreaSignature {
  Element: HTMLTextAreaElement;
  Args: {
    basic?: boolean;
    describedBy?: string;
    disabled?: boolean;
    id?: string;
    isInvalid?: boolean;
    isWarning?: boolean;
    readonly?: boolean;
  };
}

export default class TextArea extends BoundValue<TextAreaSignature, string> {
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
    this.onChange?.(target?.value);
  }

  <template>
    <textarea
      aria-describedby={{@describedBy}}
      id={{@id}}
      class={{this.classList}}
      disabled={{@disabled}}
      placeholder={{@placeholder}}
      readonly={{@readonly}}
      type="text"
      value={{this.value}}
      {{on "input" this.change}}
      ...attributes
    />
  </template>
}
