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

  tests: (keyof CommonTests | RegExp)[];
  /**
   * The minimum number of character types required, including uppercase, lowercase, digits, and symbols.
   */
  minClasses?: number;
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
    const { minClasses } = options;

    const commonTests = {
      alpha: /(?:[A-Z]|[a-z])/,
      upper: /[A-Z]/,
      lower: /[a-z]/,
      numeral: /\d/,
      special: /[@#$%^&*\-_+=[\]{}|\\:',.?/`~"();!]/,
    };

    const classCount = Object.keys(commonTests)
      .map(key => commonTests[key as keyof typeof commonTests].test(value))
      .filter(Boolean)
      .length;

    if (minClasses !== undefined && classCount >= minClasses) {
      return true;
    }

    return {
      key: 'nrg.validation.password.strength',
      value,
      minClasses,
    };
  }
}
