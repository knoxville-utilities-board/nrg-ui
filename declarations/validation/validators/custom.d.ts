import BaseValidator from './base.ts';
import type { Binding } from '../../';
import type { BaseOptions, Computable, ValidateFnResponse, ValidationResult } from '../types';
declare type ValidateFn<T, Context> = (value: T, options: CustomOptions<T, Context>, context: Record<string, unknown>) => ValidateFnResponse;
export type CustomOptions<T, Context> = {
    /**
     * The function to be called to validate. It should return a boolean or a
     * response object.
     */
    validate: ValidateFn<T, Context>;
} & BaseOptions;
export default class CustomValidator<T, Model extends object, Context extends object = Record<string, unknown>> extends BaseValidator<T, Model, Context, CustomOptions<T, Context>> {
    constructor(binding: Binding<Model>, options: Computable<Context, CustomOptions<T, Context>>, context: Context);
    get result(): ValidationResult;
    validate(): ValidateFnResponse;
}
export {};
