import { action } from '@ember/object';
import BoundValue from '../bound-value.js';
import { n } from 'decorator-transforms/runtime';

class InputField extends BoundValue {
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
    this.onChange(target?.value);
  }
  static {
    n(this.prototype, "change", [action]);
  }
}

export { InputField as default };
//# sourceMappingURL=input-field.js.map
