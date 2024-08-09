import { assert } from '@ember/debug';

import BaseValidator from './base.ts';

import type { Binding } from '../../types';
import type { ValidateFnResponse } from '../types';

type Primitive = string | number | boolean;

declare type ExclusionOptions<T> = {
  /**
   * An array of invalid values.
   */
  in: T[];
};

export default class ExclusionValidator<
  T extends Primitive,
  Context extends object = Record<string, unknown>,
> extends BaseValidator<T, ExclusionOptions<T>, Context> {
  constructor(bind: Binding, options: ExclusionOptions<T>, context: Context) {
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
