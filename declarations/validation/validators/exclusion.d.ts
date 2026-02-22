import BaseValidator from './base.ts';
import type { Binding, Primitive } from '../../index.ts';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types';
export type ExclusionOptions<T> = {
    /**
     * An array of invalid values.
     */
    in: T[];
} & BaseOptions;
export default class ExclusionValidator<T extends Primitive, Context extends object = Record<string, unknown>> extends BaseValidator<T, Context, ExclusionOptions<T>> {
    constructor(bind: Binding, options: Computable<Context, ExclusionOptions<T>>, context?: Context);
    validate(value: T, options: ExclusionOptions<T>): ValidateFnResponse;
}
