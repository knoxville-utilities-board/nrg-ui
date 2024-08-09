import { assert } from '@ember/debug';

import BaseValidator from './base.ts';

import type { Binding } from '../../types';
import type { ValidateFnResponse } from '../types';

type Primitive = string | number | boolean;

declare type InclusionOptions<T> = {
  /**
   * An array of valid values.
   */
  in: T[];
};

export default class InclusionValidator<
  T extends Primitive,
  Context extends object = Record<string, unknown>,
> extends BaseValidator<T, InclusionOptions<T>, Context> {
  constructor(
    binding: Binding,
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
