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
export default class LengthValidator<T extends ArrayLike<unknown>, Context extends object = Record<string, unknown>> extends BaseValidator<T, Context, LengthOptions> {
    defaultOptions: {
        allowNone: boolean;
        presence: boolean;
    };
    constructor(binding: Binding, options: Computable<Context, LengthOptions>, context?: Context);
    validate(value: T, options: LengthOptions): ValidateFnResponse;
    toString(value: T): string;
}
