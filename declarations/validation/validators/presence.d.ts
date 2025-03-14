import BaseValidator from './base.ts';
import type { Binding } from '../../';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types';
export type PresenceOptions = {
    /**
     * If `true`, the value must be present.
     * If `false`, the value must be blank.
     */
    presence: boolean;
    /**
     * Allow empty strings to be considered blank
     * @default true
     */
    ignoreBlank?: boolean;
} & BaseOptions;
export default class PresenceValidator<T, Model extends object, Context extends object = Record<string, unknown>> extends BaseValidator<T, Model, Context, PresenceOptions> {
    defaultOptions: {
        presence: boolean;
        ignoreBlank: boolean;
    };
    constructor(binding: Binding<Model>, options: Computable<Context, PresenceOptions>, context: Context);
    validate(value: T, options: PresenceOptions): ValidateFnResponse;
}
//# sourceMappingURL=presence.d.ts.map