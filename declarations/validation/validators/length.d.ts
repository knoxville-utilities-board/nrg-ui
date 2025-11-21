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
     * A range
     */
    between?: [number, number];
    is?: number;
    max?: number;
    min?: number;
} & BaseOptions;
export default class LengthValidator<T extends ArrayLike<T>, Model extends object, Context extends object = Record<string, unknown>> extends BaseValidator<T, Model, Context, LengthOptions> {
    defaultOptions: {
        allowNone: boolean;
        presence: boolean;
    };
    constructor(binding: Binding<Model>, options: Computable<Context, LengthOptions>, context: Context);
    validate(value: T, options: LengthOptions): ValidateFnResponse;
    toString(value: ArrayLike<T>): string;
}
