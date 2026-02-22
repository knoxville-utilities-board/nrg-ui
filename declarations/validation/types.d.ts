import type { Binding } from '../index.ts';
import type BaseValidator from './validators/base.ts';
export type BaseOptions = {
    /**
     * When true, the validation will not be performed.
     */
    disabled?: boolean;
    /**
     * When the validation fails, this key is used by `ember-intl`
     * to translate a failure message. This option overrides the
     * `message` option.
     */
    key?: string;
    /**
     * When the validation fails, this failure message will be displayed.
     * This option can be overridden by the `key` option.
     */
    message?: string;
    /**
     * When true, validation failures will not prevent form submissions.
     * Additionally, warnings are shown before the form is submitted, when
     * the user inputs a value that fails the validation.
     */
    isWarning?: boolean;
};
export type Computable<Context, Options> = {
    [key in keyof Options]: ComputedProperty<Context, Options[key]>;
};
export type ComputedProperty<Context, T> = T | ((this: Context) => T);
export interface TranslatableMessage extends Partial<ValidationResult> {
    key: string;
    [option: string]: TranslatableOption;
}
export type TranslatableOption = string | number | boolean | Date | null | undefined;
export type ValidateFnResponse = boolean | string | TranslatableMessage | ValidationResult;
export interface ValidationResult {
    isValid: boolean;
    isWarning?: boolean;
    message?: string;
}
export type Validator<T = unknown, Context extends object = object, OptionsShape extends object = object> = (binding: Binding, context: Context) => ValidatorImpl<T, Context, OptionsShape>;
export interface ValidatorImpl<T, Context extends object, OptionsShape extends BaseOptions> {
    validate(this: BaseValidator<T, Context, OptionsShape>, value: T, options: Computable<Context, OptionsShape>, context: Context): ValidateFnResponse;
    readonly binding: Binding;
    readonly result: ValidationResult;
}
