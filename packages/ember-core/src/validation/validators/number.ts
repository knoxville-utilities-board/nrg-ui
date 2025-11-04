import { isEmpty, isNone } from '@ember/utils';

import BaseValidator from './base.ts';

import type { BaseOptions, ValidateFnResponse } from '../types';

export type NumberOptions = {
  /**
   * When true, `null` and empty strings are valid
   * @default false
   */
  allowBlank?: boolean;
  /**
   * When true, `null` and `undefined` are valid
   * @default true
   */
  allowNone?: boolean;
  /**
   * When true, strings will be parsed as numbers
   * @default false
   */
  allowString?: boolean;
  /**
   * When true, only integers are valid
   * @default false
   */
  integer?: boolean;
  /**
   * When true, only positive numbers are valid
   * @default false
   */
  positive?: boolean;
  /**
   * When true, only negative numbers are valid
   * @default false
   */
  negative?: boolean;
  /**
   * When true, only even numbers are valid
   * @default false
   */
  even?: boolean;
  /**
   * When true, only odd numbers are valid
   * @default false
   */
  odd?: boolean;
  /**
   * When set, the number must be a multiple of this value
   */
  multipleOf?: number;
  /**
   * When set, the number must be exactly this value
   */
  is?: number;
  /**
   * When set, the number of decimal places must be less than or equal to this value
   */
  maxPrecision?: number;
} & BaseOptions;

declare type NumberLike = number | string | null | undefined;

export default class NumberValidator<
  Model extends Record<string, unknown>,
  Context extends Record<string, unknown> = Record<string, unknown>,
> extends BaseValidator<NumberLike, Model, Context, NumberOptions> {
  defaultOptions = {
    allowNone: true,
  };

  validate(value: NumberLike, options: NumberOptions): ValidateFnResponse {
    const { allowBlank, allowNone, allowString, integer } = options;
    const numValue = Number(value);

    if (allowBlank && isEmpty(value)) {
      return true;
    }

    if (allowNone && isNone(value)) {
      return true;
    }

    if (isEmpty(value)) {
      return { key: 'nrg.validation.number.notANumber' };
    }

    if (typeof value === 'string' && !allowString) {
      return { key: 'nrg.validation.number.notANumber' };
    }

    if (integer && !Number.isInteger(numValue)) {
      return { key: 'nrg.validation.number.integer' };
    }

    return this.handleOptions(numValue, options);
  }

  handleOptions(value: number, options: NumberOptions): ValidateFnResponse {
    const { positive, negative, even, odd, is } = options;

    if (positive && !isPositive(value)) {
      return { key: 'nrg.validation.number.positive' };
    }

    if (negative && !isNegative(value)) {
      return { key: 'nrg.validation.number.negative' };
    }

    if (even && !isEven(value)) {
      return { key: 'nrg.validation.number.even' };
    }

    if (odd && !isOdd(value)) {
      return { key: 'nrg.validation.number.odd' };
    }

    const multipleOf = options['multipleOf'];
    if (multipleOf && !isMultipleOf(value, multipleOf)) {
      return { key: 'nrg.validation.number.multipleOf', multipleOf };
    }

    const isValue = is;
    if (isValue !== undefined && value !== isValue) {
      return { key: 'nrg.validation.number.isValue', isValue };
    }

    const maxPrecision = options['maxPrecision'];
    if (maxPrecision !== undefined && !hasMaxPrecision(value, maxPrecision)) {
      return {
        key: 'nrg.validation.number.precision',
        precision: maxPrecision,
      };
    }

    return true;
  }
}

const isPositive = (value: number) => value > 0;
const isNegative = (value: number) => value < 0;
const isEven = (value: number) => value % 2 === 0;
const isOdd = (value: number) => value % 2 !== 0;
const isMultipleOf = (value: number, multiple: number) =>
  value % multiple === 0;

const hasMaxPrecision = (value: number, maxPrecision: number): boolean => {
  const [, decimal] = value.toString().split('.');
  return decimal ? decimal.length <= maxPrecision : true;
};
