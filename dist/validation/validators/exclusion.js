import { assert } from '@ember/debug';
import { tKey } from 'ember-intl';
import BaseValidator from './base.js';

class ExclusionValidator extends BaseValidator {
  constructor(bind, options, context) {
    super(bind, options, context);
    const {
      in: invalidValues
    } = options;
    assert('ExclusionValidator requires an array of invalid values to be provided', invalidValues !== undefined);
    assert('ExclusionValidator requires an array of invalid values to be provided', invalidValues.length > 0);
  }
  validate(value, options) {
    const {
      in: invalidValues
    } = options;
    if (!invalidValues.includes(value)) {
      return true;
    }
    const invalidValuesList = this.intl.formatList(invalidValues.map(String));
    return {
      key: tKey('nrg.validation.exclusion.in'),
      value,
      in: invalidValuesList
    };
  }
}

export { ExclusionValidator as default };
//# sourceMappingURL=exclusion.js.map
