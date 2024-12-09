import BaseValidator from './base.ts';
import type { Binding } from '../..';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types';
export type RegexOptions = {
    /**
     * If `true`, the value must not match the pattern.
     * @default false
     */
    inverse?: boolean;
    /**
     * A regular expression pattern that the value must match.
     */
    pattern: RegExp | string;
} & BaseOptions;
export default class RegexValidator<Model extends object = Record<string, unknown>, Context extends object = Record<string, unknown>> extends BaseValidator<string, Model, Context, RegexOptions> {
    constructor(binding: Binding<Model>, options: Computable<Context, RegexOptions>, context: Context);
    validate(value: string, options: RegexOptions): ValidateFnResponse;
}
//# sourceMappingURL=regex.d.ts.map