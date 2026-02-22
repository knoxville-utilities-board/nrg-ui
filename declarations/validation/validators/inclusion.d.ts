import BaseValidator from './base.ts';
import type { Binding, Primitive } from '../../index.ts';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types';
export type InclusionOptions<T> = {
    /**
     * An array of valid values.
     */
    in: T[];
} & BaseOptions;
export default class InclusionValidator<T extends Primitive, Context extends object = Record<string, unknown>> extends BaseValidator<T, Context, InclusionOptions<T>> {
    constructor(binding: Binding, options: Computable<Context, InclusionOptions<T>>, context?: Context);
    validate(value: T, options: InclusionOptions<T>): ValidateFnResponse;
}
