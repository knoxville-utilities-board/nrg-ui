import { assert } from '@ember/debug';
import { isEmpty, isNone } from '@ember/utils';

import BaseValidator from './base.ts';

import type { Binding } from '../../index.ts';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types';

export type LengthOptions = {
  /**
   * If `true`, the value can be an empty string or array.
   */
  allowBlank?: boolean;
  /**
   * If `true`, the value can be `null` or `undefined`.
   */
  allowNone?: boolean;
  /**
   * If set, the length must be greater than `between[0]` and
   * less than `between[1]`.
   */
  between?: [number, number];
  /**
   * If set, the length must equal this value.
   */
  is?: number;
  /**
   * If set, the length cannot be greater than or
   * equal to this.
   */
  max?: number;
  /**
   * If set, the length cannot be less than or
   * equal to this.
   */
  min?: number;
} & BaseOptions;

export default class LengthValidator<
  T extends ArrayLike<unknown>,
  Context extends object = Record<string, unknown>,
> extends BaseValidator<T, Context, LengthOptions> {
  defaultOptions = {
    allowNone: true,
    presence: true,
  };

  constructor(
    binding: Binding,
    options: Computable<Context, LengthOptions>,
    context?: Context,
  ) {
    super(binding, options, context);

    if (
      isNone(options.is) &&
      isNone(options.min) &&
      isNone(options.max) &&
      isNone(options.between)
    ) {
      assert(
        'LengthValidator requires either `is`, `min`, `max`, or `between` to be provided',
      );
    }
  }

  validate(value: T, options: LengthOptions): ValidateFnResponse {
    const { allowBlank, allowNone, between, is, max, min } = options;

    if (isNone(value)) {
      if (allowNone) {
        return true;
      }

      return { key: 'nrg.validation.length.invalid', value };
    }

    if (allowBlank && isEmpty(value)) {
      return true;
    }

    const type = typeof value === 'string' ? 'string' : 'array';
    const length = value.length;

    if (!isNone(is) && length !== is) {
      return {
        key: `nrg.validation.length.${type}.wrongLength`,
        is,
        length,
        value: this.toString(value),
      };
    }

    if (!isNone(min) && length < min) {
      return {
        key: `nrg.validation.length.${type}.tooShort`,
        min,
        length,
        value: this.toString(value),
      };
    }

    if (!isNone(max) && length > max) {
      return {
        key: `nrg.validation.length.${type}.tooLong`,
        max,
        length,
        value: this.toString(value),
      };
    }

    if (!isNone(between) && (length < between[0] || length > between[1])) {
      return {
        key: `nrg.validation.length.${type}.between`,
        min: between[0],
        max: between[1],
        length,
        value: this.toString(value),
      };
    }

    return true;
  }

  toString(value: T): string {
    if (typeof value === 'string') {
      return value;
    }
    if (Array.isArray(value)) {
      return this.intl.formatList(value.map(String));
    }
    const values = Array.from(value).map(String);

    return this.intl.formatList(values);
  }
}
