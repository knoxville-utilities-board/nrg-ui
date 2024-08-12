import { on } from '@ember/modifier';
import { action } from '@ember/object';

import TextField from './text-field.gts';

export default class PhoneField extends TextField {
  @action
  change(evt: Event) {
    const target = evt.target as HTMLInputElement;
    const value = target?.value;
    const unformattedValue = value.replace(/\D/g, '');
    this.onChange(unformattedValue);
  }

  get displayValue() {
    const sevenDigitInput = /^(\d{0,3})(\d{0,4})$/g;
    const tenDigitInput = /^(\d{0,3})(\d{0,3})(\d{0,4})$/g;
    const elevenDigitInput = /^(\d)(\d{0,3})(\d{0,3})(\d{0,4})$/g;

    const sevenDigitOutput = '$1-$2';
    const tenDigitOutput = '($1) $2-$3';
    const elevenDigitOutput = '+$1 ($2) $3-$4';

    const unformattedValue = this.value?.replace(/\D/g, '') ?? '';
    if (unformattedValue.length <= 4) {
      return unformattedValue;
    } else if (unformattedValue.length <= 7) {
      return unformattedValue.replace(sevenDigitInput, sevenDigitOutput);
    } else if (unformattedValue.length <= 10) {
      return unformattedValue.replace(tenDigitInput, tenDigitOutput);
    } else {
      return unformattedValue
        .substring(0, 11)
        .replace(elevenDigitInput, elevenDigitOutput);
    }
  }

  <template>
    <input
      class={{this.classList}}
      disabled={{@disabled}}
      readonly={{@readonly}}
      type="tel"
      maxlength="17"
      value={{this.displayValue}}
      {{on "input" this.change}}
      ...attributes
    />
  </template>
}
