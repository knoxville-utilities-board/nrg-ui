import { assert } from '@ember/debug';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import InputField from './-private/input-field.js';
import { format } from '../../utils/phone.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

class PhoneField extends InputField {
  static {
    g(this.prototype, "isFocused", [tracked], function () {
      return false;
    });
  }
  #isFocused = (i(this, "isFocused"), void 0);
  get format() {
    return this.args.format ?? format;
  }
  get displayValue() {
    const {
      format,
      isFocused
    } = this;
    if (isFocused || !this.format || !this.value) {
      return this.value;
    }
    assert('format must be a function or false', typeof format === 'function');
    return format(this.value);
  }
  change(event) {
    const target = event.target;
    const newValue = target.value ?? '';
    this.onChange(newValue.replace(/\D/g, ''));
  }
  static {
    n(this.prototype, "change", [action]);
  }
  toggleFocus(focused) {
    this.isFocused = focused;
  }
  static {
    n(this.prototype, "toggleFocus", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<input aria-describedby={{@fieldOptions.describedBy}} class={{this.classList}} disabled={{@fieldOptions.disabled}} id={{@fieldOptions.id}} readonly={{@readonly}} type=\"tel\" value={{this.displayValue}} {{on \"input\" this.change}} {{on \"focus\" (fn this.toggleFocus true)}} {{on \"blur\" (fn this.toggleFocus false)}} ...attributes />", {
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
