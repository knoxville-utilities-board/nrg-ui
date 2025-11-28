import { assert } from '@ember/debug';

import BaseValidator from './base.ts';

import type { BaseOptions, ValidateFnResponse } from '../types.ts';

const CommonTests = {
  alpha: /[a-zA-Z]/,
  upper: /[A-Z]/,
  lower: /[a-z]/,
  numeral: /\d/,
  special: /[^A-Za-z0-9]/,
};

export type PasswordOptions = {
  /**
   * A list of tests to run against the password.
   * Each test must be either a regular expression or one of the following values: "alpha", "upper", "lower", "numeral", "special".
   */
  tests: (RegExp | keyof typeof CommonTests)[];
  /**
   * The minimum number of character types required from the list of `tests`.
   */
  minClasses: number;
} & BaseOptions;

export default class PasswordValidator<
  Context extends object = Record<string, unknown>,
> extends BaseValidator<string, Context, PasswordOptions> {
  defaultOptions = {
    tests: Object.keys(CommonTests) as (keyof typeof CommonTests)[],
    minClasses: 3,
  };

  validate(value: string, options: PasswordOptions): ValidateFnResponse {
    const { minClasses, tests } = options;

    assert(
      'PasswordValidator requires `minClasses` to be provided',
      minClasses,
    );

    assert(
      'PasswordValidator requires `minClasses` to be less than or equal to the number of tests provided',
      minClasses <= tests.length,
    );

    const applicableTests: RegExp[] = tests.map((test) => {
      if (typeof test === 'string') {
        assert(`Invalid test key: ${test}`, test in CommonTests);

        return CommonTests[test];
      }

      return test;
    });

    const classCount = applicableTests
      .map((test) => test.test(value))
      .filter(Boolean).length;

    if (classCount >= minClasses) {
      return true;
    }

    return {
      key: 'nrg.validation.password.strength',
      value,
    };
  }
}
