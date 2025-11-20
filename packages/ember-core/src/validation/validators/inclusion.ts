import { assert } from '@ember/debug';

import BaseValidator from './base.ts';

import type { Binding, Primitive } from '../../index.ts';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types';

export type InclusionOptions<T> = {
  /**
   * An array of valid values.
   */
  in: T[];
} & BaseOptions;

export default class InclusionValidator<
  T extends Primitive,
  Model extends object,
  Context extends object = Record<string, unknown>,
> extends BaseValidator<T, Model, Context, InclusionOptions<T>> {
  constructor(
    binding: Binding<Model>,
    options: Computable<Context, InclusionOptions<T>>,
    context: Context,
  ) {
    super(binding, options, context);

    const { in: validValues } = options;

    assert(
      'InclusionValidator requires an array of valid values to be provided',
      validValues !== undefined,
    );

    assert(
      'InclusionValidator requires an array of valid values to be provided',
      validValues.length > 0,
    );
  }

  validate(value: T, options: InclusionOptions<T>): ValidateFnResponse {
    const { in: validValues } = options;

    if (validValues.includes(value)) {
      return true;
    }

    const validValuesList = this.intl.formatList(validValues.map(String));

    return {
      key: 'nrg.validation.inclusion.in',
      value,
      in: validValuesList,
    };
  }
}
