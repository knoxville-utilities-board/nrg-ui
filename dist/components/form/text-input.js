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
  #isFocused = (i(this, "isFocused"), void 0);
  get displayValue() {
    const {
      format
    } = this.args;
    const {
      isFocused,
      value
    } = this;
    if (isFocused || !format || !value) {
      return value;
    }
    if (typeof format === 'function') {
      return format(value);
    }
    return value;
  }
  toggleFocus(isFocused) {
    this.isFocused = isFocused;
  }
  static {
    n(this.prototype, "toggleFocus", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<input aria-describedby={{@fieldOptions.describedBy}} class={{this.classList}} disabled={{@fieldOptions.disabled}} id={{@fieldOptions.id}} readonly={{@readonly}} type=\"text\" value={{this.displayValue}} {{on \"input\" this.change}} {{on \"focus\" (fn this.toggleFocus true)}} {{on \"blur\" (fn this.toggleFocus false)}} ...attributes />", {
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
