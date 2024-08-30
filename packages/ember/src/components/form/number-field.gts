import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { isNone } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import { runTask } from 'ember-lifeline';

import InputField from './-private/input-field.ts';

import type { Optional } from '../../';
import type { IntlService } from 'ember-intl';

export interface NumberFieldSignature {
  Args: {
    allowBlank?: boolean;
    allowDecimals?: boolean;
    format?:
      | ((value: Optional<number>) => string)
      | 'number'
      | 'currency'
      | 'percent'
      | false;
    formatPrecision?: number;
  };
}

export default class NumberField extends InputField<
  NumberFieldSignature,
  number
> {
  @tracked
  isFocused = false;

  @tracked
  displayString = true;

  @service
  declare intl: IntlService;

  get format() {
    return this.args.format ?? 'number';
  }

  get displayValue() {
    const { displayString, format } = this;

    if (!displayString || !format || isNone(this.value)) {
      return this.value;
    }

    if (typeof format === 'function') {
      return format(this.value);
    }

    const formatPrecision = this.args.formatPrecision;
    const options = {
      maximumFractionDigits: formatPrecision,
      minimumFractionDigits: formatPrecision,
    };

    switch (format) {
      case 'currency':
        return this.intl.formatNumber(this.value, {
          style: 'currency',
          currency: 'USD',
          ...options,
        });
      case 'percent':
        return this.intl.formatNumber((this.value ?? 0) / 100.0, {
          style: 'percent',
          ...options,
        });
      default:
        return this.intl.formatNumber(this.value, {
          ...options,
        });
    }
  }

  get allowDecimals() {
    return this.args.allowDecimals ?? true;
  }

  @action
  change(event: Event): void {
    const { allowDecimals } = this;
    const target = event.target as HTMLInputElement;
    let newValue = target.value;

    if (isEmpty(newValue)) {
      if (!this.args.allowBlank) {
        this.onChange(this.defaultValue ?? 0);
      }
      this.onChange(null);
      return;
    }

    newValue = newValue.replace(/^([+-]?)(\d+)(\.?\d+)?$/, '$1$2$3');

    let numericValue: Optional<number> = parseFloat(newValue);

    if (isNaN(numericValue)) {
      numericValue = this.defaultValue;
    }

    if (!allowDecimals) {
      // @ts-expect-error - `null` is coerced to `0`
      numericValue = Math.trunc(numericValue);
    }

    this.onChange(numericValue);
  }

  @action
  toggleFocus(focused: boolean): void {
    this.isFocused = focused;

    if (focused) {
      this.displayString = false;
    } else {
      runTask(this, () => {
        this.displayString = true;
      });
    }
  }

  <template>
    <input
      aria-describedby={{@describedBy}}
      class={{this.classList}}
      disabled={{@disabled}}
      id={{@id}}
      readonly={{@readonly}}
      type={{if this.isFocused "number" "text"}}
      value={{this.displayValue}}
      {{on "input" this.change}}
      {{on "focus" (fn this.toggleFocus true)}}
      {{on "blur" (fn this.toggleFocus false)}}
      ...attributes
    />
  </template>
}
