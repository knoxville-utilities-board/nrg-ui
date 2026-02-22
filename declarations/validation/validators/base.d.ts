import ArrayProxy from '@ember/array/proxy';
import ObjectProxy from '@ember/object/proxy';
import type { Binding } from '../../index.ts';
import type { BaseOptions, Computable, TranslatableMessage, ValidateFnResponse, ValidationResult, ValidatorImpl } from '../types.ts';
import type { IntlService } from 'ember-intl';
export declare function isProxy(value: unknown): value is ObjectProxy | ArrayProxy<never>;
export declare function unwrapProxy<T>(value: T): T;
export default abstract class BaseValidator<T, Context extends object = Record<string, unknown>, OptionsShape extends BaseOptions = BaseOptions> implements ValidatorImpl<T, Context, OptionsShape> {
    abstract validate(this: BaseValidator<T, Context, OptionsShape>, value: T, options: OptionsShape, context: Context): ValidateFnResponse;
    defaultOptions: Computable<Context, OptionsShape & BaseOptions>;
    readonly owner: import("@ember/owner").default;
    readonly binding: Binding;
    readonly options: Computable<Context, OptionsShape & BaseOptions>;
    readonly context: Context;
    constructor(binding: Binding, options: Computable<Context, OptionsShape & BaseOptions>, context?: Context);
    get intl(): IntlService;
    get value(): T;
    get result(): ValidationResult;
    coalesceResponse(response: ValidateFnResponse, options: OptionsShape): ValidationResult;
    translateMessage(message: TranslatableMessage): string;
    computeOptions(options: Computable<Context, OptionsShape>): OptionsShape;
    compute<K extends keyof OptionsShape>(value: Computable<Context, OptionsShape>[K]): OptionsShape[K];
}
