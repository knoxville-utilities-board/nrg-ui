import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { runTask } from 'ember-lifeline';

import TextField from './text-field.gts';
import onInsert from '../../modifiers/did-insert.ts';

import type { Optional } from '../../types.d.ts';

export default class PhoneField extends TextField {
  @tracked
  inputElement: Optional<HTMLInputElement> = null;

  @action
  onInsert(element: HTMLElement) {
    this.inputElement = element as HTMLInputElement;
  }

  @action
  change(evt: Event) {
    const target = evt.target as HTMLInputElement;
    const value = target?.value;
    const unformattedValue = value.replace(/\D/g, '');
    this.onChange(unformattedValue);
  }

  get displayValue() {
    const localInput = /^(\d{3})(\d{0,4})$/g;
    const withAreaCodeInput = /^(\d{0,3})(\d{3})(\d{4})$/g;
    const withCountryCodeInput = /^(\d{0,3})(\d{3})(\d{3})(\d{4})$/g;

    const localOutput = '$1-$2';
    const withAreaCodeOutput = '($1) $2-$3';
    const withCountryCodeOutput = '+$1 ($2) $3-$4';

    const unformattedValue = this.value?.replace(/\D/g, '') ?? '';
    let returnValue;
    if (unformattedValue.length <= 4) {
      returnValue = unformattedValue;
    } else if (unformattedValue.length <= 7) {
      returnValue = unformattedValue.replace(localInput, localOutput);
    } else if (unformattedValue.length <= 10) {
      returnValue = unformattedValue.replace(
        withAreaCodeInput,
        withAreaCodeOutput,
      );
    } else {
      returnValue = unformattedValue
        .substring(0, 13)
        .replace(withCountryCodeInput, withCountryCodeOutput);
    }

    // Adjust cursor to the same relative position as before formatting
    const inputValue = this.inputElement?.value ?? '';
    const cursor = this.inputElement?.selectionStart ?? inputValue.length;
    if (cursor !== null || inputValue.length) {
      const numbersBeforeCursor = inputValue
        .substring(0, cursor)
        .replace(/\D/g, '').length;
      const newCursorPosition = returnValue
        .split(/\d/, numbersBeforeCursor + 1)
        .join('0').length;
      runTask(this, () => {
        this.inputElement?.setSelectionRange(
          newCursorPosition,
          newCursorPosition,
        );
      });
    }

    return returnValue;
  }

  <template>
    <input
      class={{this.classList}}
      disabled={{@disabled}}
      readonly={{@readonly}}
      type="tel"
      maxlength="19"
      value={{this.displayValue}}
      {{onInsert this.onInsert}}
      {{on "input" this.change}}
      ...attributes
    />
  </template>
}
