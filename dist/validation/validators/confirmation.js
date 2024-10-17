import { assert } from '@ember/debug';
import { isPresent, isEqual } from '@ember/utils';
import BaseValidator from './base.js';

class ConfirmationValidator extends BaseValidator {
  constructor(binding, options, context) {
    super(binding, options, context);
    const {
      on
    } = options;
    assert('ConfirmationValidator requires a property name `on` to be provided', isPresent(on));
  }
  validate(value, options, context) {
    const {
      label,
      inverse,
      on
    } = options;
    const expectedValue = context[on];
    const matches = isEqual(value, expectedValue);
    let key = 'nrg.validation.confirmation.invalid';
    if (!inverse && matches) {
      return true;
    }
    if (inverse) {
      key = 'nrg.validation.confirmation.match';
      if (!matches) {
        return true;
      }
    }
    return {
      key,
      value,
      expectedValue,
      label: label ?? on
    };
  }
}

export { ConfirmationValidator as default };
//# sourceMappingURL=confirmation.js.map
