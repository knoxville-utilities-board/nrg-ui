import BaseValidator from './base.ts';

import type { Binding, Primitive } from '../../';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types';

export type PasswordStrengthOptions = BaseOptions;

export default class B2CPasswordValidator<
  T extends Primitive,
  Context extends object = Record<string, unknown>,
  Model extends object = Record<string, unknown>,
> extends BaseValidator<T, Model, Context, PasswordStrengthOptions> {
  constructor(
    bind: Binding<Model>,
    options: Computable<Context, PasswordStrengthOptions>,
    context: Context,
  ) {
    super(bind, options, context);
  }

  validate(value: T, options: PasswordStrengthOptions): ValidateFnResponse {
    const minClasses = 3;
    const conditions = [
      /[A-Z]/.test(value as string),
      /[a-z]/.test(value as string),
      /\d/.test(value as string),
      /[^a-zA-Z0-9]/.test(value as string),
    ];

    const classCount = conditions.filter(Boolean).length;

    if (classCount >= minClasses) {
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
