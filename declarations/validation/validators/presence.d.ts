import BaseValidator from './base.ts';
import type { Binding } from '../../index.ts';
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
export default class PresenceValidator<T, Context extends object = Record<string, unknown>> extends BaseValidator<T, Context, PresenceOptions> {
    defaultOptions: {
        presence: boolean;
        ignoreBlank: boolean;
    };
    constructor(binding: Binding, options: Computable<Context, PresenceOptions>, context?: Context);
    validate(value: T, options: PresenceOptions): ValidateFnResponse;
}
