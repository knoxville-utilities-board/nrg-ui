import { assert } from '@ember/debug';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import InputField from './-private/input-field.js';
import { exchangeCodeInput, exchangeCodeOutput, areaCodeInput, areaCodeOutput, countryCodeInput, countryCodeOutput, invalidInput, invalidOutput } from '../../utils/phone.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

const defaultFormat = value1 => {
  const unformattedValue1 = value1.replace(/\D/g, '');
  if (unformattedValue1.length <= 7) {
    return unformattedValue1.replace(exchangeCodeInput, exchangeCodeOutput);
  }
  if (unformattedValue1.length <= 10) {
    return unformattedValue1.replace(areaCodeInput, areaCodeOutput);
  }
  if (unformattedValue1.length <= 13) {
    return unformattedValue1.replace(countryCodeInput, countryCodeOutput);
  }
  return unformattedValue1.replace(invalidInput, invalidOutput);
};
class PhoneField extends InputField {
  static {
    g(this.prototype, "isFocused", [tracked], function () {
      return false;
    });
  }
  #isFocused = (i(this, "isFocused"), void 0);
  get format() {
    return this.args.format ?? defaultFormat;
  }
  get displayValue() {
    const {
      format: format1,
      isFocused: isFocused1
    } = this;
    if (isFocused1 || !this.format || !this.value) {
      return this.value;
    }
    assert('format must be a function or false', typeof format1 === 'function');
    return format1(this.value);
  }
  change(event1) {
    const target1 = event1.target;
    const newValue1 = target1.value ?? '';
    this.onChange(newValue1.replace(/\D/g, ''));
  }
  static {
    n(this.prototype, "change", [action]);
  }
  toggleFocus(focused1) {
    this.isFocused = focused1;
  }
  static {
    n(this.prototype, "toggleFocus", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <input aria-describedby={{@describedBy}} class={{this.classList}} disabled={{@disabled}} id={{@id}} readonly={{@readonly}} type=\"tel\" value={{this.displayValue}} {{on \"input\" this.change}} {{on \"focus\" (fn this.toggleFocus true)}} {{on \"blur\" (fn this.toggleFocus false)}} ...attributes />\n  ", {
      strictMode: true,
      scope: () => ({
        on,
        fn
      })
    }), this);
  }
}

export { PhoneField as default };
//# sourceMappingURL=phone-input.js.map
