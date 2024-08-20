import { assert } from '@ember/debug';

import BaseValidator from './base.ts';

import type { Binding, Primitive } from '../../';
import type { ValidateFnResponse } from '../types';

export type InclusionOptions<T> = {
  /**
   * An array of valid values.
   */
  in: T[];
};

export default class InclusionValidator<
  T extends Primitive,
  Model extends object,
  Context extends object = Record<string, unknown>,
> extends BaseValidator<T, Model, InclusionOptions<T>, Context> {
  constructor(
    binding: Binding<Model>,
    options: InclusionOptions<T>,
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
