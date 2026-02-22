import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { isNone, isEmpty } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import { runTask } from 'ember-lifeline';
import InputField from './-private/input-field.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

class NumberInput extends InputField {
  static {
    g(this.prototype, "isFocused", [tracked], function () {
      return false;
    });
  }
  #isFocused = (i(this, "isFocused"), void 0);
  static {
    g(this.prototype, "displayString", [tracked], function () {
      return true;
    });
  }
  #displayString = (i(this, "displayString"), void 0);
  static {
    g(this.prototype, "intl", [service]);
  }
  #intl = (i(this, "intl"), void 0);
  get format() {
    return this.args.format ?? 'number';
  }
  get displayValue() {
    const {
      displayString,
      format
    } = this;
    if (!displayString || !format || isNone(this.value)) {
      return this.value;
    }
    if (typeof format === 'function') {
      return format(this.value);
    }
    const formatPrecision = this.args.formatPrecision;
    const options = {
      maximumFractionDigits: formatPrecision,
      minimumFractionDigits: formatPrecision
    };
    switch (format) {
      case 'currency':
        return this.intl.formatNumber(this.value, {
          style: 'currency',
          currency: 'USD',
          ...options
        });
      case 'percent':
        return this.intl.formatNumber((this.value ?? 0) / 100.0, {
          style: 'percent',
          ...options
        });
      default:
        return this.intl.formatNumber(this.value, {
          ...options
        });
    }
  }
  get allowDecimals() {
    return this.args.allowDecimals ?? true;
  }
  change(event) {
    const {
      allowDecimals
    } = this;
    const target = event.target;
    let newValue = target.value;
    if (isEmpty(newValue)) {
      if (!this.args.allowBlank) {
        this.onChange(this.defaultValue ?? 0);
      }
      this.onChange(null);
      return;
    }
    newValue = newValue.replace(/^([+-]?)(\d+)(\.?\d+)?$/, '$1$2$3');
    let numericValue = parseFloat(newValue);
    if (isNaN(numericValue)) {
      numericValue = this.defaultValue;
    }
    if (!allowDecimals) {
      // @ts-expect-error - `null` is coerced to `0`
      numericValue = Math.trunc(numericValue);
    }
    this.onChange(numericValue);
  }
  static {
    n(this.prototype, "change", [action]);
  }
  toggleFocus(focused) {
    this.isFocused = focused;
    if (focused) {
      this.displayString = false;
    } else {
      runTask(this, () => {
        this.displayString = true;
      });
    }
  }
  static {
    n(this.prototype, "toggleFocus", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<input aria-describedby={{@fieldOptions.describedBy}} class={{this.classList}} disabled={{@fieldOptions.disabled}} id={{@fieldOptions.id}} readonly={{@readonly}} type={{if this.isFocused \"number\" \"text\"}} value={{this.displayValue}} {{on \"input\" this.change}} {{on \"focus\" (fn this.toggleFocus true)}} {{on \"blur\" (fn this.toggleFocus false)}} ...attributes />", {
      strictMode: true,
      scope: () => ({
        on,
        fn
      })
    }), this);
  }
}

export { NumberInput as default };
//# sourceMappingURL=number-input.js.map
