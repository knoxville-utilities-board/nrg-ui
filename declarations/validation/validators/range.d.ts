import BaseValidator from './base.ts';
import type { Binding } from '../../';
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
export default class RangeValidator<Model extends object, Context extends object = Record<string, unknown>> extends BaseValidator<number, Model, Context, RangeOptions> {
    defaultOptions: {
        minInclusive: boolean;
        maxInclusive: boolean;
    };
    constructor(binding: Binding<Model>, options: Computable<Context, RangeOptions>, context: Context);
    validate(value: number, options: RangeOptions): ValidateFnResponse;
}
