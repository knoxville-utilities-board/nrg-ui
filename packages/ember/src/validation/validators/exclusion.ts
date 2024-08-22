import { assert } from '@ember/debug';

import BaseValidator from './base.ts';

import type { Binding, Primitive } from '../../';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types';

export type ExclusionOptions<T> = {
  /**
   * An array of invalid values.
   */
  in: T[];
} & BaseOptions;

export default class ExclusionValidator<
  T extends Primitive,
  Context extends object = Record<string, unknown>,
  Model extends object = Record<string, unknown>,
> extends BaseValidator<T, Model, Context, ExclusionOptions<T>> {
  constructor(
    bind: Binding<Model>,
    options: Computable<Context, ExclusionOptions<T>>,
    context: Context,
  ) {
    super(bind, options, context);

    const { in: invalidValues } = options;

    assert(
      'ExclusionValidator requires an array of invalid values to be provided',
      invalidValues !== undefined,
    );

    assert(
      'ExclusionValidator requires an array of invalid values to be provided',
      invalidValues.length > 0,
    );
  }

  validate(value: T, options: ExclusionOptions<T>): ValidateFnResponse {
    const { in: invalidValues } = options;

    if (!invalidValues.includes(value)) {
      return true;
    }

    const invalidValuesList = this.intl.formatList(invalidValues.map(String));

    return {
      key: 'nrg.validation.exclusion.in',
      value,
      in: invalidValuesList,
    };
  }
}
