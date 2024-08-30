import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { runTask } from 'ember-lifeline';

import InputField from './-private/input-field.ts';
import onInsert from '../../modifiers/did-insert.ts';
import {
  exchangeCodeInput,
  exchangeCodeOutput,
  areaCodeInput,
  areaCodeOutput,
  countryCodeInput,
  countryCodeOutput,
} from '../../utils/phone.ts';

function isSpecialCharacter(char: string) {
  return /\D/.test(char);
}

export default class PhoneField extends InputField {
  @tracked
  inputElement!: HTMLInputElement;

  @action
  onInsert(element: HTMLElement) {
    this.inputElement = element as HTMLInputElement;
  }

  @action
  change(evt: Event) {
    const inputEvent = evt as InputEvent;
    const target = evt.target as HTMLInputElement;
    const newValue = target.value;
    const currentValue = this.displayValue;
    const cursorPosition = target.selectionStart ?? -1;
    const isBackspace = inputEvent.inputType === 'deleteContentBackward';
    const isDelete = inputEvent.inputType === 'deleteContentForward';

    let unformattedValue = newValue.replace(/\D/g, '');
    let characterUnderCursor = currentValue[cursorPosition ?? 0] ?? '';
    const isNonDigitCharacter = isSpecialCharacter(characterUnderCursor);
    const isDeletingSpecialCharacter =
      cursorPosition >= 0 && (isBackspace || isDelete) && isNonDigitCharacter;
    if (isDeletingSpecialCharacter) {
      if (isBackspace) {
        let newCursorPosition = cursorPosition - 1;
        if (isSpecialCharacter(currentValue[newCursorPosition] ?? '')) {
          newCursorPosition--;
        }
        this.inputElement?.setSelectionRange(
          newCursorPosition,
          newCursorPosition,
        );
      }
      const beforeCursor = newValue
        .substring(0, cursorPosition)
        .replace(/\D/g, '');
      const afterCursor = newValue.substring(cursorPosition).replace(/\D/g, '');
      if (isBackspace) {
        unformattedValue = beforeCursor.slice(0, -1) + afterCursor;
      } else {
        unformattedValue = beforeCursor + afterCursor.slice(1);
      }
    }

    this.onChange(unformattedValue);
  }

  get displayValue() {
    const unformattedValue = this.value?.replace(/\D/g, '') ?? '';
    let returnValue;
    if (unformattedValue.length <= 4) {
      returnValue = unformattedValue;
    } else if (unformattedValue.length <= 7) {
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
      aria-describedby={{@describedBy}}
      class={{this.classList}}
      disabled={{@disabled}}
      id={{@id}}
      readonly={{@readonly}}
      maxlength="19"
      type="tel"
      value={{this.displayValue}}
      {{onInsert this.onInsert}}
      {{on "input" this.change}}
      ...attributes
    />
  </template>
}
