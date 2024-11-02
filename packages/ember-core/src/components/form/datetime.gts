import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import dayjs from 'dayjs';

import DatetimeCalendar from './-private/calendar.gts';
import BoundValue from './bound-value.ts';
import TextInput from './text-input.gts';
import { bind } from '../../helpers/bind.ts';
import onClickOutside from '../../modifiers/on-click-outside.ts';

import type { IconType } from '../../';
import type { OpUnitType } from 'dayjs';

const defaultDateFormat = 'LL';
const defaultTimeFormat = 'LT';

export interface DatetimeSignature {
  Element: HTMLDivElement;
  Args: {
    allowMinuteSelection?: boolean;
    dateFormat?: string;
    disabled?: boolean;
    maxDate?: Date;
    minDate?: Date;
    parseFormat?: string | string[];
    placeholder?: string;
    readonly?: boolean;
    showNowShortcut?: boolean;
    timeFormat?: string;
    type?: 'datetime' | 'date' | 'time';

    // Required by form fields
    basic?: boolean;
    describedBy?: string;
    id?: string;
    isInvalid?: boolean;
    isWarning?: boolean;

    _class?: string;

    isDateDisabled?: (date: Date, precision?: OpUnitType) => boolean;
  };
  Blocks: {
    default: [];
  };
}

export default class Datetime extends BoundValue<DatetimeSignature, Date> {
  self: Record<'displayValue', string> = this;

  @tracked
  isFocused = false;

  @tracked
  inputValue = '';

  get dateFormat() {
    return this.args.dateFormat ?? defaultDateFormat;
  }

  get timeFormat() {
    return this.args.timeFormat ?? defaultTimeFormat;
  }

  get type() {
    return this.args.type ?? 'date'; // 'datetime', 'date', 'time'
  }

  get showNowShortcut() {
    return this.args.showNowShortcut !== false;
  }

  get icon() {
    let icon: IconType = 'bi-calendar-fill';
    if (this.type === 'time') {
      icon = 'bi-clock-fill';
    }
    return icon;
  }

  get displayFormat() {
    if (this.type === 'datetime') {
      return `${this.dateFormat} ${this.timeFormat}`;
    } else if (this.type === 'date') {
      return this.dateFormat;
    }
    return this.timeFormat;
  }

  get displayValue() {
    if (this.isFocused && this.inputValue) {
      return this.inputValue;
    }
    if (!this.value) {
      return '';
    }
    return dayjs(this.value).format(this.displayFormat);
  }

  set displayValue(value) {
    if (this.isFocused) {
      this.inputValue = value;
      return;
    }
    const newValue = dayjs(value, this.displayFormat);
    if (!newValue.isValid()) {
      return;
    }

    if (newValue.isSame(this.value, 'minute')) {
      return;
    }
    this.onDateSelect(newValue.toDate());
  }

  get parseFormats() {
    if (this.args.parseFormat) {
      return this.args.parseFormat;
    }
    return [this.displayFormat];
  }

  getDefaultValue() {
    return new Date();
  }

  @action
  onBlur() {
    const { inputValue } = this;
    this.isFocused = false;
    if (inputValue) {
      let newValue = dayjs(inputValue, this.parseFormats);
      if (!newValue.isValid()) {
        newValue = dayjs(inputValue);
      }
      if (newValue.isValid()) {
        this.onDateSelect(newValue.toDate());
      }

      this.inputValue = '';
    }
  }

  @action
  onFocus(evt: FocusEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.isFocused || this.args.disabled || this.args.readonly) {
      return;
    }

    this.isFocused = true;

    const target = evt.currentTarget as HTMLElement;
    const focusTarget = target.querySelector('input') as HTMLInputElement;

    focusTarget?.focus();
  }

  @action
  onDateSelect(value: Date) {
    this.onChange(value);
  }

  <template>
    <div
      class="calendar input-group"
      role="button"
      {{on "click" this.onFocus}}
      {{onClickOutside this.onBlur}}
      ...attributes
    >
      {{#unless @basic}}
        <span class="input-group-text">
          <i class="{{this.icon}} text-secondary" />
        </span>
      {{/unless}}
      {{#unless (has-block)}}
        <TextInput
          aria-describedby={{@describedBy}}
          class="border-start-0 rounded-end"
          id={{@id}}
          placeholder={{@placeholder}}
          @basic={{@basic}}
          @binding={{bind this.self "displayValue"}}
          @disabled={{@disabled}}
          @isInvalid={{@isInvalid}}
          @isWarning={{@isWarning}}
          @readonly={{@readonly}}
        />
      {{/unless}}
      {{yield}}
      {{#if this.isFocused}}
        <DatetimeCalendar
          @minDate={{@minDate}}
          @maxDate={{@maxDate}}
          @type={{this.type}}
          @value={{this.value}}
          @showNowShortcut={{this.showNowShortcut}}
          @isDateDisabled={{@isDateDisabled}}
          @allowMinuteSelection={{@allowMinuteSelection}}
          @onSelect={{this.onDateSelect}}
          @onClose={{this.onBlur}}
        />
      {{/if}}
    </div>
  </template>
}
