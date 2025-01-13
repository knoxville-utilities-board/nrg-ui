import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import InputField from './-private/input-field.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { g, i, n } from 'decorator-transforms/runtime';

class TextInput extends InputField {
  static {
    g(this.prototype, "isFocused", [tracked], function () {
      return false;
    });
  }
  #isFocused = (i(this, "isFocused"), undefined);
  get displayValue() {
    const {
      format: format1
    } = this.args;
    const {
      isFocused: isFocused1,
      value: value1
    } = this;
    if (isFocused1 || !format1 || !value1) {
      return value1;
    }
    if (typeof format1 === 'function') {
      return format1(value1);
    }
    return value1;
  }
  toggleFocus(isFocused1) {
    this.isFocused = isFocused1;
  }
  static {
    n(this.prototype, "toggleFocus", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <input aria-describedby={{@describedBy}} class={{this.classList}} disabled={{@disabled}} id={{@id}} readonly={{@readonly}} type=\"text\" value={{this.displayValue}} {{on \"input\" this.change}} {{on \"focus\" (fn this.toggleFocus true)}} {{on \"blur\" (fn this.toggleFocus false)}} ...attributes />\n  ", {
      strictMode: true,
      scope: () => ({
        on,
        fn
      })
    }), this);
  }
}

export { TextInput as default };
//# sourceMappingURL=text-input.js.map
