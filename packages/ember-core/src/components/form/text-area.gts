import { on } from '@ember/modifier';
import { action } from '@ember/object';

import BoundValue from './bound-value.ts';

import type { FieldOptions } from './field.gts';

export interface TextAreaSignature {
  Element: HTMLTextAreaElement;
  Args: {
    basic?: boolean;
    readonly?: boolean;

    fieldOptions?: FieldOptions;
  };
}

export default class TextArea extends BoundValue<TextAreaSignature, string> {
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
    this.onChange?.(target?.value);
  }

  <template>
    <textarea
      aria-describedby={{@fieldOptions.describedBy}}
      id={{@fieldOptions.id}}
      class={{this.classList}}
      disabled={{@fieldOptions.disabled}}
      placeholder={{@fieldOptions.placeholder}}
      readonly={{@readonly}}
      type="text"
      value={{this.value}}
      {{on "input" this.change}}
      ...attributes
    />
  </template>
}
