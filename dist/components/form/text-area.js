import { on } from '@ember/modifier';
import { action } from '@ember/object';
import BoundValue from './bound-value.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime';

class TextArea extends BoundValue {
  get classList() {
    const classes = ['form-control'];
    if (this.args.basic) {
      classes[0] += '-plaintext';
    }
    if (this.args.fieldOptions?.isInvalid) {
      classes.push('is-invalid');
    } else if (this.args.fieldOptions?.isWarning) {
      classes.push('is-warning');
    }
    return classes.join(' ');
  }
  change(evt) {
    const target = evt.target;
    this.onChange?.(target?.value);
  }
  static {
    n(this.prototype, "change", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("<textarea aria-describedby={{@fieldOptions.describedBy}} id={{@fieldOptions.id}} class={{this.classList}} disabled={{@fieldOptions.disabled}} readonly={{@readonly}} value={{this.value}} {{on \"input\" this.change}} ...attributes />", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { TextArea as default };
//# sourceMappingURL=text-area.js.map
