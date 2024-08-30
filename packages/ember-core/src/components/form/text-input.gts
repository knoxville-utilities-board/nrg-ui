import { on } from '@ember/modifier';

import InputField from './-private/input-field.ts';

import type { InputFieldSignature } from './-private/input-field.ts';

export interface TextInputSignature extends InputFieldSignature<object> {}

export default class TextInput extends InputField {
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
