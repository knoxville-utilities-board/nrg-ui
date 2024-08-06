import BoundValue from './bound-value.ts';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

export interface TextAreaSignature {
  Element: HTMLTextAreaElement;
  Args: {
    basic?: boolean;
    disabled?: boolean;
    readonly?: boolean;
  };
}

export default class TextArea extends BoundValue<TextAreaSignature, string> {
  get classList() {
    const classes = ['form-control'];

    if (this.args.basic) {
      classes[0] += '-plaintext';
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
      class={{this.classList}}
      disabled={{@disabled}}
      readonly={{@readonly}}
      type="text"
      value={{this.value}}
      {{on "input" this.change}}
      ...attributes
    />
  </template>
}
