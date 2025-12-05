import BaseValidator from './base.ts';
import type { Binding } from '../../index.ts';
import type { BaseOptions, Computable, TranslatableOption, ValidateFnResponse } from '../types';
export type ConfirmationOptions = {
    /**
     * When building the error message, this will be used as the label for the field.
     * If not provided, the `on` property will be used.
     */
    label?: string;
    /**
     * If `true`, the value must not match the value of the property specified by `on`.
     */
    inverse?: boolean;
    /**
     * The property name to compare the value against.
     */
    on: string;
} & BaseOptions;
export default class ConfirmationValidator<Context extends object = Record<string, TranslatableOption>> extends BaseValidator<TranslatableOption, Context, ConfirmationOptions> {
    constructor(binding: Binding, options: Computable<Context, ConfirmationOptions>, context?: Context);
    validate(value: TranslatableOption, options: ConfirmationOptions, context: Context): ValidateFnResponse;
}
