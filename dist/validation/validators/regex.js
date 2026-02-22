import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';
import BaseValidator from './base.js';

class RegexValidator extends BaseValidator {
  constructor(binding, options, context) {
    super(binding, options, context);
    const {
      pattern
    } = options;
    assert('RegexValidator requires `pattern` to be provided', !isNone(pattern));
  }
  validate(value, options) {
    const {
      inverse = false,
      pattern
    } = options;
    assert('RegexValidator requires a pattern to be provided', !isNone(pattern));
    assert('RegexValidator requires the pattern to be of type string or RegExp', typeof pattern === 'string' || pattern instanceof RegExp);
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    const isValid = regex.test(value) === !inverse;
    if (isValid) {
      return true;
    }
    const messageType = inverse ? 'match' : 'doesNotMatch';
    return {
      key: `nrg.validation.regex.${messageType}`,
      value,
      inverse,
      pattern: regex.toString()
    };
  }
}

export { RegexValidator as default };
//# sourceMappingURL=regex.js.map
