import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';
import { tKey } from 'ember-intl';
import BaseValidator from './base.js';

class RangeValidator extends BaseValidator {
  defaultOptions = {
    minInclusive: true,
    maxInclusive: true
  };
  constructor(binding, options, context) {
    super(binding, options, context);
    assert('RangeValidator requires at least one of `min` and `max` to be provided', isPresent(options.min) || isPresent(options.max));
  }
  validate(value, options) {
    const {
      min,
      minInclusive,
      max,
      maxInclusive
    } = options;
    if (Number.isNaN(value)) {
      return {
        key: tKey('nrg.validation.range.notANumber')
      };
    }
    let key = null;
    if (min !== undefined) {
      if (minInclusive && value < min) {
        key = tKey('nrg.validation.range.greaterThanOrEqualTo');
      } else if (!minInclusive && value <= min) {
        key = tKey('nrg.validation.range.greaterThan');
      }
    }
    if (max !== undefined) {
      if (maxInclusive && value > max) {
        key = tKey('nrg.validation.range.lessThanOrEqualTo');
      } else if (!maxInclusive && value >= max) {
        key = tKey('nrg.validation.range.lessThan');
      }
    }
    if (key) {
      return {
        key,
        min,
        max
      };
    }
    return true;
  }
}

export { RangeValidator as default };
//# sourceMappingURL=range.js.map
