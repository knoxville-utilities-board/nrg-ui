import { assert } from '@ember/debug';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import InputField from './-private/input-field.ts';
import {
  exchangeCodeInput,
  exchangeCodeOutput,
  areaCodeInput,
  areaCodeOutput,
  countryCodeInput,
  countryCodeOutput,
} from '../../utils/phone.ts';

import type { Optional } from '../../';

export interface PhoneInputSignature {
  Args: {
    format?: ((value: Optional<string>) => string) | false;
  };
}

const defaultFormat = (value: string) => {
  const unformattedValue = value.replace(/\D/g, '');
  let returnValue;
  if (unformattedValue.length <= 7) {
    returnValue = unformattedValue.replace(
      exchangeCodeInput,
      exchangeCodeOutput,
    );
  } else if (unformattedValue.length <= 10) {
    returnValue = unformattedValue.replace(areaCodeInput, areaCodeOutput);
  } else {
    returnValue = unformattedValue
      .substring(0, 13)
      .replace(countryCodeInput, countryCodeOutput);
  }

  return returnValue;
};

export default class PhoneField extends InputField<PhoneInputSignature> {
  @tracked
  isFocused = false;

  get format() {
    return this.args.format ?? defaultFormat;
  }

  get displayValue() {
    const { format, isFocused } = this;

    if (isFocused || !this.format || !this.value) {
      return this.value;
    }

    assert('format must be a function or false', typeof format === 'function');

    return format(this.value);
  }

  @action
  change(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.value ?? '';

    this.onChange(newValue.replace(/\D/g, ''));
  }

  @action
  toggleFocus(focused: boolean): void {
    this.isFocused = focused;
  }

  <template>
    <input
      aria-describedby={{@describedBy}}
      class={{this.classList}}
      disabled={{@disabled}}
      id={{@id}}
      readonly={{@readonly}}
      type="tel"
      value={{this.displayValue}}
      {{on "input" this.change}}
      {{on "focus" (fn this.toggleFocus true)}}
      {{on "blur" (fn this.toggleFocus false)}}
      ...attributes
    />
  </template>
}
