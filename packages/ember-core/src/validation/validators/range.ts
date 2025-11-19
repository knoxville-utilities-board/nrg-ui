import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';

import BaseValidator from './base.ts';

import type { Binding } from '../../index.ts';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types';

export type RangeOptions = {
  /**
   * The minimum value allowed.
   */
  min?: number;
  /**
   * Whether the value can be equal to the minimum value.
   * @default true
   */
  minInclusive?: boolean;
  /**
   * The maximum value allowed.
   */
  max?: number;
  /**
   * Whether the value can be equal to the maximum value.
   * @default true
   */
  maxInclusive?: boolean;
} & BaseOptions;

export default class RangeValidator<
  Model extends object,
  Context extends object = Record<string, unknown>,
> extends BaseValidator<number, Model, Context, RangeOptions> {
  defaultOptions = {
    minInclusive: true,
    maxInclusive: true,
  };

  constructor(
    binding: Binding<Model>,
    options: Computable<Context, RangeOptions>,
    context: Context,
  ) {
    super(binding, options, context);

    assert(
      'RangeValidator requires at least one of `min` and `max` to be provided',
      isPresent(options.min) || isPresent(options.max),
    );
  }

  validate(value: number, options: RangeOptions): ValidateFnResponse {
    const { min, minInclusive, max, maxInclusive } = options;

    if (Number.isNaN(value)) {
      return { key: 'nrg.validation.range.notANumber' };
    }

    let key = null;

    if (min !== undefined) {
      if (minInclusive && value < min) {
        key = 'nrg.validation.range.greaterThanOrEqualTo';
      } else if (!minInclusive && value <= min) {
        key = 'nrg.validation.range.greaterThan';
      }
    }
    if (max !== undefined) {
      if (maxInclusive && value > max) {
        key = 'nrg.validation.range.lessThanOrEqualTo';
      } else if (!maxInclusive && value >= max) {
        key = 'nrg.validation.range.lessThan';
      }
    }

    if (key) {
      return { key, min, max };
    }

    return true;
  }
}
