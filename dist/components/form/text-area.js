import { on } from '@ember/modifier';
import { action } from '@ember/object';
import BoundValue from './bound-value.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';
import { n } from 'decorator-transforms/runtime';

class TextArea extends BoundValue {
  get classList() {
    const classes1 = ['form-control'];
    if (this.args.basic) {
      classes1[0] += '-plaintext';
    }
    if (this.args.isInvalid) {
      classes1.push('is-invalid');
    } else if (this.args.isWarning) {
      classes1.push('is-warning');
    }
    return classes1.join(' ');
  }
  change(evt1) {
    const target1 = evt1.target;
    this.onChange?.(target1?.value);
  }
  static {
    n(this.prototype, "change", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("\n    <textarea aria-describedby={{@describedBy}} id={{@id}} class={{this.classList}} disabled={{@disabled}} readonly={{@readonly}} type=\"text\" value={{this.value}} {{on \"input\" this.change}} ...attributes />\n  ", {
      strictMode: true,
      scope: () => ({
        on
      })
    }), this);
  }
}

export { TextArea as default };
//# sourceMappingURL=text-area.js.map
