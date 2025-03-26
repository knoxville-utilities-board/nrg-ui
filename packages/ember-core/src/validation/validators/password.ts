
import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';

import BaseValidator from './base.ts';

import type { Binding, Primitive } from '../../index.ts';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types.ts';

export type PasswordOptions = {
  minLength?: number;
  maxLength?: number;
  /**
   * The minimum number of character types required, including uppercase, lowercase, digits, and symbols.
   */
  minClasses?: number;
} & BaseOptions;

export default class PasswordValidator<
  T extends Primitive,
  Context extends object = Record<string, unknown>,
  Model extends object = Record<string, unknown>,
> extends BaseValidator<T, Model, Context, PasswordOptions> {
  constructor(
    bind: Binding<Model>,
    options: Computable<Context, PasswordOptions>,
    context: Context,
  ) {
    super(bind, options, context);

    if (
      isNone(options.minLength) &&
      isNone(options.maxLength) &&
      isNone(options.minClasses)
    ) {
      assert(
        'PasswordValidator requires `minLength`, `maxLength`, and `minClasses` to be provided',
      );
    }
  }

  validate(value: T, options: PasswordOptions): ValidateFnResponse {
    const {minLength, maxLength, minClasses} = options;

    if (minLength !== undefined && typeof value === 'string' && value.length < minLength) {
      return {
        key: 'nrg.validation.passwordLengthTooShort',
        value,
        minLength,
      };
    }

    if (minLength !== undefined && typeof value === 'string' && value.length < minLength) {
      return {
        key: 'nrg.validation.passwordLengthTooLong',
        value,
        maxLength,
      };
    }

    const conditions = [
      /[A-Z]/.test(value as string),
      /[a-z]/.test(value as string),
      /\d/.test(value as string),
      /[^a-zA-Z0-9]/.test(value as string),
    ];

    const classCount = conditions.filter(Boolean).length;

    if (minClasses !== undefined && classCount >= minClasses) {
      return true;
    }

    return {
      key: 'nrg.validation.passwordStrength',
      value,
      minClasses,
    };
  }

  listToString(value: string[]): string {
    return this.intl.formatList(value);
  }
}
