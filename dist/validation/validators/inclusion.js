import { assert } from '@ember/debug';
import { tKey } from 'ember-intl';
import BaseValidator from './base.js';

class InclusionValidator extends BaseValidator {
  constructor(binding, options, context) {
    super(binding, options, context);
    const {
      in: validValues
    } = options;
    assert('InclusionValidator requires an array of valid values to be provided', validValues !== undefined);
    assert('InclusionValidator requires an array of valid values to be provided', validValues.length > 0);
  }
  validate(value, options) {
    const {
      in: validValues
    } = options;
    if (validValues.includes(value)) {
      return true;
    }
    const validValuesList = this.intl.formatList(validValues.map(String));
    return {
      key: tKey('nrg.validation.inclusion.in'),
      value,
      in: validValuesList
    };
  }
}

export { InclusionValidator as default };
//# sourceMappingURL=inclusion.js.map
