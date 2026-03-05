import { hash } from '@ember/helper';
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
    let icon = 'bi-calendar-fill';
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
  get defaultValue() {
    if (this.args.defaultValue !== undefined) {
      return this.args.defaultValue ? dayjs(this.args.defaultValue).toDate() : null;
    }
    return new Date();
  }
  onBlur() {
    if (!this.isFocused) {
      return;
    }
    const {
      inputValue
    } = this;
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
    this.args.onHide?.();
  }
  static {
    n(this.prototype, "onBlur", [action]);
  }
  onFocus(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.isFocused || this.args.fieldOptions?.disabled || this.args.readonly) {
      return;
    }
    this.isFocused = true;
    const target = evt.currentTarget;
    const focusTarget = target.querySelector('input');
    focusTarget?.focus();
    this.args.onShow?.();
  }
  static {
    n(this.prototype, "onFocus", [action]);
  }
  onDateSelect(value) {
    this.onChange(value);
  }
  static {
    n(this.prototype, "onDateSelect", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<div class=\"calendar input-group\" role=\"button\" {{on \"click\" this.onFocus}} {{onClickOutside this.onBlur}} ...attributes>\n  {{#unless @basic}}\n    <span class=\"input-group-text\">\n      <i class=\"{{this.icon}} text-secondary\" />\n    </span>\n  {{/unless}}\n  {{#unless (has-block)}}\n    <TextInput class=\"border-start-0 rounded-end\" placeholder={{@placeholder}} @basic={{@basic}} @binding={{bind this.self \"displayValue\"}} @fieldOptions={{hash describedBy=@fieldOptions.describedBy disabled=@fieldOptions.disabled id=@fieldOptions.id isInvalid=@fieldOptions.isInvalid isWarning=@fieldOptions.isWarning required=@fieldOptions.required}} @readonly={{@readonly}} />\n  {{/unless}}\n  {{yield}}\n  {{#if this.isFocused}}\n    <DatetimeCalendar @minDate={{@minDate}} @maxDate={{@maxDate}} @type={{this.type}} @value={{this.value}} @showNowShortcut={{this.showNowShortcut}} @isDateDisabled={{@isDateDisabled}} @allowMinuteSelection={{@allowMinuteSelection}} @onSelect={{this.onDateSelect}} @onClose={{this.onBlur}} />\n  {{/if}}\n</div>", {
      strictMode: true,
      scope: () => ({
        on,
        onClickOutside: OnClickOutside,
        TextInput,
        bind,
        hash,
        DatetimeCalendar
      })
    }), this);
  }
}

export { Datetime as default };
//# sourceMappingURL=datetime.js.map
