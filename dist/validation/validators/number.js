import { isEmpty, isNone } from '@ember/utils';
import { tKey } from 'ember-intl';
import BaseValidator from './base.js';

class NumberValidator extends BaseValidator {
  defaultOptions = {
    allowNone: true
  };
  validate(value, options) {
    const {
      allowBlank,
      allowNone,
      allowString,
      integer
    } = options;
    const numValue = Number(value);
    if (allowBlank && isEmpty(value)) {
      return true;
    }
    if (allowNone && isNone(value)) {
      return true;
    }
    if (isEmpty(value)) {
      return {
        key: tKey('nrg.validation.number.notANumber')
      };
    }
    if (typeof value === 'string' && !allowString) {
      return {
        key: tKey('nrg.validation.number.notANumber')
      };
    }
    if (integer && !Number.isInteger(numValue)) {
      return {
        key: tKey('nrg.validation.number.integer')
      };
    }
    return this.handleOptions(numValue, options);
  }
  handleOptions(value, options) {
    const {
      positive,
      negative,
      even,
      odd,
      is
    } = options;
    if (positive && !isPositive(value)) {
      return {
        key: tKey('nrg.validation.number.positive')
      };
    }
    if (negative && !isNegative(value)) {
      return {
        key: tKey('nrg.validation.number.negative')
      };
    }
    if (even && !isEven(value)) {
      return {
        key: tKey('nrg.validation.number.even')
      };
    }
    if (odd && !isOdd(value)) {
      return {
        key: tKey('nrg.validation.number.odd')
      };
    }
    const multipleOf = options['multipleOf'];
    if (multipleOf && !isMultipleOf(value, multipleOf)) {
      return {
        key: tKey('nrg.validation.number.multipleOf'),
        multipleOf
      };
    }
    const isValue = is;
    if (isValue !== undefined && value !== isValue) {
      return {
        key: tKey('nrg.validation.number.isValue'),
        isValue
      };
    }
    const maxPrecision = options['maxPrecision'];
    if (maxPrecision !== undefined && !hasMaxPrecision(value, maxPrecision)) {
      return {
        key: tKey('nrg.validation.number.precision'),
        precision: maxPrecision
      };
    }
    return true;
  }
}
const isPositive = value => value > 0;
const isNegative = value => value < 0;
const isEven = value => value % 2 === 0;
const isOdd = value => value % 2 !== 0;
const isMultipleOf = (value, multiple) => value % multiple === 0;
const hasMaxPrecision = (value, maxPrecision) => {
  const [, decimal] = value.toString().split('.');
  return decimal ? decimal.length <= maxPrecision : true;
};

export { NumberValidator as default };
//# sourceMappingURL=number.js.map
