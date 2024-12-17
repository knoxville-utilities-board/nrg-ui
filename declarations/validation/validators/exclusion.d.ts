import BaseValidator from './base.ts';
import type { Binding, Primitive } from '../../';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types';
export type ExclusionOptions<T> = {
    /**
     * An array of invalid values.
     */
    in: T[];
} & BaseOptions;
export default class ExclusionValidator<T extends Primitive, Context extends object = Record<string, unknown>, Model extends object = Record<string, unknown>> extends BaseValidator<T, Model, Context, ExclusionOptions<T>> {
    constructor(bind: Binding<Model>, options: Computable<Context, ExclusionOptions<T>>, context: Context);
    validate(value: T, options: ExclusionOptions<T>): ValidateFnResponse;
}
//# sourceMappingURL=exclusion.d.ts.map