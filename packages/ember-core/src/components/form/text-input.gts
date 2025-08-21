import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import InputField from './-private/input-field.ts';

import type { Optional } from '../../';

export interface TextInputArgs {
  format?: ((value: Optional<string>) => string) | false;
}

export default class TextInput extends InputField<TextInputArgs> {
  @tracked
  isFocused = false;

  get displayValue() {
    const { format } = this.args;
    const { isFocused, value } = this;

    if (isFocused || !format || !value) {
      return value;
    }

    if (typeof format === 'function') {
      return format(value);
    }

    return value;
  }

  @action
  toggleFocus(isFocused: boolean) {
    this.isFocused = isFocused;
  }

  <template>
    <input
      aria-describedby={{@fieldOptions.describedBy}}
      class={{this.classList}}
      disabled={{@fieldOptions.disabled}}
      id={{@fieldOptions.id}}
      placeholder={{@fieldOptions.placeholder}}
      readonly={{@readonly}}
      type="text"
      value={{this.displayValue}}
      {{on "input" this.change}}
      {{on "focus" (fn this.toggleFocus true)}}
      {{on "blur" (fn this.toggleFocus false)}}
      ...attributes
    />
  </template>
}
