import { assert } from '@ember/debug';
import { tKey } from 'ember-intl';
import BaseValidator from './base.js';

const CommonTests = {
  alpha: /[a-zA-Z]/,
  upper: /[A-Z]/,
  lower: /[a-z]/,
  numeral: /\d/,
  special: /[^A-Za-z0-9]/
};
class PasswordValidator extends BaseValidator {
  defaultOptions = {
    tests: Object.keys(CommonTests),
    minClasses: 3
  };
  validate(value, options) {
    const {
      minClasses,
      tests
    } = options;
    assert('PasswordValidator requires `minClasses` to be provided', minClasses);
    assert('PasswordValidator requires `minClasses` to be less than or equal to the number of tests provided', minClasses <= tests.length);
    const applicableTests = tests.map(test => {
      if (typeof test === 'string') {
        assert(`Invalid test key: ${test}`, test in CommonTests);
        return CommonTests[test];
      }
      return test;
    });
    const classCount = applicableTests.map(test => test.test(value)).filter(Boolean).length;
    if (classCount >= minClasses) {
      return true;
    }
    return {
      key: tKey('nrg.validation.password.strength'),
      value
    };
  }
}

export { PasswordValidator as default };
//# sourceMappingURL=password.js.map
