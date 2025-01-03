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
      displayString: displayString1,
      format: format1
    } = this;
    if (!displayString1 || !format1 || isNone(this.value)) {
      return this.value;
    }
    if (typeof format1 === 'function') {
      return format1(this.value);
    }
    const formatPrecision1 = this.args.formatPrecision;
    const options1 = {
      maximumFractionDigits: formatPrecision1,
      minimumFractionDigits: formatPrecision1
    };
    switch (format1) {
      case 'currency':
        return this.intl.formatNumber(this.value, {
          style: 'currency',
          currency: 'USD',
          ...options1
        });
      case 'percent':
        return this.intl.formatNumber((this.value ?? 0) / 100.0, {
          style: 'percent',
          ...options1
        });
      default:
        return this.intl.formatNumber(this.value, {
          ...options1
        });
    }
  }
  get allowDecimals() {
    return this.args.allowDecimals ?? true;
  }
  change(event1) {
    const {
      allowDecimals: allowDecimals1
    } = this;
    const target1 = event1.target;
    let newValue1 = target1.value;
    if (isEmpty(newValue1)) {
      if (!this.args.allowBlank) {
        this.onChange(this.defaultValue ?? 0);
      }
      this.onChange(null);
      return;
    }
    newValue1 = newValue1.replace(/^([+-]?)(\d+)(\.?\d+)?$/, '$1$2$3');
    let numericValue1 = parseFloat(newValue1);
    if (isNaN(numericValue1)) {
      numericValue1 = this.defaultValue;
    }
    if (!allowDecimals1) {
      // @ts-expect-error - `null` is coerced to `0`
      numericValue1 = Math.trunc(numericValue1);
    }
    this.onChange(numericValue1);
  }
  static {
    n(this.prototype, "change", [action]);
  }
  toggleFocus(focused1) {
    this.isFocused = focused1;
    if (focused1) {
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
    setComponentTemplate(precompileTemplate("\n    <input aria-describedby={{@describedBy}} class={{this.classList}} disabled={{@disabled}} id={{@id}} readonly={{@readonly}} type={{if this.isFocused \"number\" \"text\"}} value={{this.displayValue}} {{on \"input\" this.change}} {{on \"focus\" (fn this.toggleFocus true)}} {{on \"blur\" (fn this.toggleFocus false)}} ...attributes />\n  ", {
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
