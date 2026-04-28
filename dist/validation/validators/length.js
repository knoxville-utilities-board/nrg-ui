import { assert } from '@ember/debug';
import { isNone, isEmpty } from '@ember/utils';
import { tKey } from 'ember-intl';
import BaseValidator from './base.js';

class LengthValidator extends BaseValidator {
  defaultOptions = {
    allowNone: true,
    presence: true
  };
  constructor(binding, options, context) {
    super(binding, options, context);
    if (isNone(options.is) && isNone(options.min) && isNone(options.max) && isNone(options.between)) {
      assert('LengthValidator requires either `is`, `min`, `max`, or `between` to be provided');
    }
  }
  validate(value, options) {
    const {
      allowBlank,
      allowNone,
      between,
      is,
      max,
      min
    } = options;
    if (isNone(value)) {
      if (allowNone) {
        return true;
      }
      return {
        key: tKey('nrg.validation.length.invalid'),
        value
      };
    }
    if (allowBlank && isEmpty(value)) {
      return true;
    }
    const type = typeof value === 'string' ? 'string' : 'array';
    const length = value.length;
    if (!isNone(is) && length !== is) {
      return {
        key: `nrg.validation.length.${type}.wrongLength`,
        is,
        length,
        value: this.toString(value)
      };
    }
    if (!isNone(min) && length < min) {
      return {
        key: `nrg.validation.length.${type}.tooShort`,
        min,
        length,
        value: this.toString(value)
      };
    }
    if (!isNone(max) && length > max) {
      return {
        key: `nrg.validation.length.${type}.tooLong`,
        max,
        length,
        value: this.toString(value)
      };
    }
    if (!isNone(between) && (length < between[0] || length > between[1])) {
      return {
        key: `nrg.validation.length.${type}.between`,
        min: between[0],
        max: between[1],
        length,
        value: this.toString(value)
      };
    }
    return true;
  }
  toString(value) {
    if (typeof value === 'string') {
      return value;
    }
    if (Array.isArray(value)) {
      return this.intl.formatList(value.map(String));
    }
    const values = Array.from(value).map(String);
    return this.intl.formatList(values);
  }
}

export { LengthValidator as default };
//# sourceMappingURL=length.js.map
