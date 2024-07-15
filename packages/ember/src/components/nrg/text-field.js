import ValidationComponent from './validation-component.js';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';

const defaultType = 'text';

export default class NrgTextFieldComponent extends ValidationComponent {
  get type() {
    return this.args.type ?? defaultType;
  }

  get step() {
    if (this.type != 'number') {
      return null;
    }
    const { allowDecimals, step } = this.args;
    if (allowDecimals) {
      return step ?? 'any';
    }

    return step ?? 1;
  }

  validateInput(input) {
    if (this.args.validateInput) {
      return this.args.validateInput(input);
    }

    let isValid = true;
    if (this.type === 'number') {
      const min = this.args.min ?? 0;
      if (isEmpty(input)) {
        if (!this.args.allowNull) {
          return min.toString();
        }
        return null;
      }
      let numericValue = parseFloat(input);
      if (!this.args.allowDecimals) {
        numericValue = Math.trunc(input);
        input = numericValue.toString();
      }
      isValid = !isNaN(numericValue);

      if (this.args.allowNegatives !== true && numericValue < 0) {
        isValid = true;
        input = min;
      }
    }
    return isValid && input;
  }

  @action
  onChange(value) {
    value = this.validateInput(value);
    if (value === false) {
      return;
    }
    super.onChange(value);
  }
}
