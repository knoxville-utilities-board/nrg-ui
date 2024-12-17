import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import dayjs from 'dayjs';
import DatetimeCalendar from './-private/calendar.js';
import BoundValue from './bound-value.js';
import TextInput from './text-input.js';
import { bind } from '../../helpers/bind.js';
import OnClickOutside from '../../modifiers/on-click-outside.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

const defaultDateFormat = 'LL';
const defaultTimeFormat = 'LT';
class Datetime extends BoundValue {
  self = this;
  static {
    g(this.prototype, "isFocused", [tracked], function () {
      return false;
    });
  }
  #isFocused = (i(this, "isFocused"), void 0);
  static {
    g(this.prototype, "inputValue", [tracked], function () {
      return '';
    });
  }
  #inputValue = (i(this, "inputValue"), void 0);
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
    let icon1 = 'bi-calendar-fill';
    if (this.type === 'time') {
      icon1 = 'bi-clock-fill';
    }
    return icon1;
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
  set displayValue(value1) {
    if (this.isFocused) {
      this.inputValue = value1;
      return;
    }
    const newValue1 = dayjs(value1, this.displayFormat);
    if (!newValue1.isValid()) {
      return;
    }
    if (newValue1.isSame(this.value, 'minute')) {
      return;
    }
    this.onDateSelect(newValue1.toDate());
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
  onBlur() {
    const {
      inputValue: inputValue1
    } = this;
    this.isFocused = false;
    if (inputValue1) {
      let newValue1 = dayjs(inputValue1, this.parseFormats);
      if (!newValue1.isValid()) {
        newValue1 = dayjs(inputValue1);
      }
      if (newValue1.isValid()) {
        this.onDateSelect(newValue1.toDate());
      }
      this.inputValue = '';
    }
  }
  static {
    n(this.prototype, "onBlur", [action]);
  }
  onFocus(evt1) {
    evt1.preventDefault();
    evt1.stopPropagation();
    if (this.isFocused || this.args.disabled || this.args.readonly) {
      return;
    }
    this.isFocused = true;
    const target1 = evt1.currentTarget;
    const focusTarget1 = target1.querySelector('input');
    focusTarget1?.focus();
  }
  static {
    n(this.prototype, "onFocus", [action]);
  }
  onDateSelect(value1) {
    this.onChange(value1);
  }
  static {
    n(this.prototype, "onDateSelect", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <div class=\"calendar input-group\" role=\"button\" {{on \"click\" this.onFocus}} {{onClickOutside this.onBlur}} ...attributes>\n      {{#unless @basic}}\n        <span class=\"input-group-text\">\n          <i class=\"{{this.icon}} text-secondary\" />\n        </span>\n      {{/unless}}\n      {{#unless (has-block)}}\n        <TextInput aria-describedby={{@describedBy}} class=\"border-start-0 rounded-end\" id={{@id}} placeholder={{@placeholder}} @basic={{@basic}} @binding={{bind this.self \"displayValue\"}} @disabled={{@disabled}} @isInvalid={{@isInvalid}} @isWarning={{@isWarning}} @readonly={{@readonly}} />\n      {{/unless}}\n      {{yield}}\n      {{#if this.isFocused}}\n        <DatetimeCalendar @minDate={{@minDate}} @maxDate={{@maxDate}} @type={{this.type}} @value={{this.value}} @showNowShortcut={{this.showNowShortcut}} @isDateDisabled={{@isDateDisabled}} @allowMinuteSelection={{@allowMinuteSelection}} @onSelect={{this.onDateSelect}} @onClose={{this.onBlur}} />\n      {{/if}}\n    </div>\n  ", {
      strictMode: true,
      scope: () => ({
        on,
        onClickOutside: OnClickOutside,
        TextInput,
        bind,
        DatetimeCalendar
      })
    }), this);
  }
}

export { Datetime as default };
//# sourceMappingURL=datetime.js.map
