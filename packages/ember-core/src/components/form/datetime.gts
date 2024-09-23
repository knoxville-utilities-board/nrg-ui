import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import dayjs from 'dayjs';

import DatetimeCalendar from './-private/calendar.gts';
import BoundValue from './bound-value.ts';
import TextInput from './text-input.gts';
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
    placeholder?: string;
    readonly?: boolean;
    showNowShortcut?: boolean;
    timeFormat?: string;
    type?: 'datetime' | 'date' | 'time';

    _class?: string;

    isDateDisabled?: (date: Date, precision?: OpUnitType) => boolean;

    onClose?: () => void;
    onSelect?: (date: Date) => void;
  };
  Blocks: {
    default: [];
  };
}

export default class Datetime extends BoundValue<
  DatetimeSignature,
  Date
> {
  @tracked
  isFocused = false;

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
    let icon = 'calendar';
    if (this.type === 'time') {
      icon = 'clock';
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
    if (!this.value) {
      return '';
    }
    return dayjs(this.value).format(this.displayFormat);
  }

  set displayValue(value) {
    const newValue = dayjs(value, this.displayFormat);
    if (!newValue.isValid()) {
      return;
    }

    if (newValue.isSame(this.value, 'minute')) {
      return;
    }
    this.onDateSelect(newValue.toDate());
  }

  getDefaultValue() {
    return new Date();
  }

  @action
  onBlur() {
    this.isFocused = false;
  }

  @action
  onFocus(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.isFocused || this.args.disabled || this.args.readonly) {
      return;
    }

    this.isFocused = true;

    evt.currentTarget?.querySelector('.ui.popup.calendar')?.focus();
  }

  @action
  onDateSelect(value) {
    this.onChange(value);
  }

  <template>
    <div
      class="ui calendar {{@class}}"
      role="button"
      {{on "click" this.onFocus}}
      {{on-click-outside this.onBlur}}
      ...attributes
    >
      {{#if (has-block)}}
        <div class="wrapper">
          {{yield}}
          {{#if this.isFocused}}
            <NrgDatetime::Calendar
              @minDate={{@minDate}}
              @maxDate={{@maxDate}}
              @type={{this.type}}
              @value={{this.value}}
              @showNowShortcut={{this.showNowShortcut}}
              @isDateDisabled={{@isDateDisabled}}
              @allowMinuteSelection={{@allowMinuteSelection}}
              @readonly={{@readonly}}
              @onSelect={{this.onDateSelect}}
              @onClose={{this.onBlur}}
            />
          {{/if}}
        </div>
      {{else}}
        <NrgTextField
          @focusId={{@focusId}}
          @placeholder={{@placeholder}}
          class="left icon"
          @disabled={{@disabled}}
          @readonly={{@readonly}}
          @model={{this}}
          @valuePath="displayValue"
          as |view|
        >
          {{#if this.isFocused}}
            <NrgDatetime::Calendar
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
          <NrgIcon @icon={{this.icon}} />
          <view.input />
        </NrgTextField>
      {{/if}}
    </div>
  </template>
}
