import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';
import { tKey } from 'ember-intl';

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
  Context extends object = Record<string, unknown>,
> extends BaseValidator<number, Context, RangeOptions> {
  defaultOptions = {
    minInclusive: true,
    maxInclusive: true,
  };

  constructor(
    binding: Binding,
    options: Computable<Context, RangeOptions>,
    context?: Context,
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
      return {
        key: tKey('nrg.validation.range.notANumber'),
      };
    }

    let key = null;

    if (min !== undefined) {
      if (minInclusive && value < min) {
        key = tKey('nrg.validation.range.greaterThanOrEqualTo');
      } else if (!minInclusive && value <= min) {
        key = tKey('nrg.validation.range.greaterThan');
      }
    }
    if (max !== undefined) {
      if (maxInclusive && value > max) {
        key = tKey('nrg.validation.range.lessThanOrEqualTo');
      } else if (!maxInclusive && value >= max) {
        key = tKey('nrg.validation.range.lessThan');
      }
    }

    if (key) {
      return { key, min, max };
    }

    return true;
  }
}
