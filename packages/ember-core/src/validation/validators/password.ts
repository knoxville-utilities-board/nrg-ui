import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';

import BaseValidator from './base.ts';

import type { Binding } from '../../index.ts';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types.ts';

export type  CommonTests = {
  alpha: RegExp;
  upper: RegExp;
  lower: RegExp;
  numeral: RegExp;
  special: RegExp;
};

export type PasswordOptions = {

  tests: (string | RegExp)[];
  /**
   * The minimum number of character types required from the list of `tests`.
   */
  minClasses: number;
} & BaseOptions;

export default class PasswordValidator<
  Context extends object = Record<string, unknown>,
  Model extends object = Record<string, unknown>,
> extends BaseValidator<string, Model, Context, PasswordOptions> {
  constructor(
    bind: Binding<Model>,
    options: Computable<Context, PasswordOptions>,
    context: Context,
  ) {
    super(bind, options, context);

    if (
      isNone(options.minClasses)
    ) {
      assert(
        'PasswordValidator requires `minClasses` to be provided',
      );
    }
  }

  validate(value: string, options: PasswordOptions): ValidateFnResponse {
    const { minClasses, tests } = options;

    if (minClasses > tests.length) {
      return {
        key: 'nrg.validation.password.invalid',
        value,
      }
    }

    const commonTests = {
      alpha: /(?:[A-Z]|[a-z])/,
      upper: /[A-Z]/,
      lower: /[a-z]/,
      numeral: /\d/,
      special: /[@#$%^&*\-_+=[\]{}|\\:',.?/`~"();!]/,
    };

    const applicableTests: RegExp[] = tests.map(test => {
      if (typeof test === 'string') {
        if (test in commonTests) {
          return commonTests[test as keyof typeof commonTests];
        }
        throw new Error(`Invalid test key: ${test}`);
      }

      return test;
    });

    const classCount = applicableTests
      .map(test => test.test(value))
      .filter(Boolean)
      .length;

    if (minClasses !== undefined && classCount >= minClasses) {
      return true;
    }

    return {
      key: 'nrg.validation.password.strength',
      value,
    };
  }
}
