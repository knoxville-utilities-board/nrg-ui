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
export default class NumberValidator<Context extends object = Record<string, unknown>> extends BaseValidator<NumberLike, Context, NumberOptions> {
    defaultOptions: {
        allowNone: boolean;
    };
    validate(value: NumberLike, options: NumberOptions): ValidateFnResponse;
    handleOptions(value: number, options: NumberOptions): ValidateFnResponse;
}
export {};
