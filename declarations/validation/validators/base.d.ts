import ArrayProxy from '@ember/array/proxy';
import ObjectProxy from '@ember/object/proxy';
import type { Binding } from '../../';
import type { BaseOptions, Computable, TranslatableMessage, ValidateFnResponse, ValidationResult, Validator } from '../types.d.ts';
export declare function isProxy(value: unknown): value is ObjectProxy | ArrayProxy<never>;
export declare function unwrapProxy<T>(value: T): T;
export default abstract class BaseValidator<T, Model extends object = Record<string, unknown>, Context extends object = Record<string, unknown>, OptionsShape extends BaseOptions = BaseOptions> implements Validator<T, Model, Context, OptionsShape> {
    abstract validate(this: BaseValidator<T, Model, Context, OptionsShape>, value: T, options: OptionsShape, context: Context | Model): ValidateFnResponse;
    defaultOptions: Computable<Context, OptionsShape & BaseOptions>;
    readonly owner: import("@ember/owner").default;
    readonly binding: Binding<Model>;
    readonly options: Computable<Context, OptionsShape & BaseOptions>;
    readonly context: Context | Model;
    constructor(binding: Binding<Model>, options: Computable<Context, OptionsShape & BaseOptions>, context: Context);
    get intl(): import("ember-intl").IntlService;
    get value(): T;
    get result(): ValidationResult;
    coalesceResponse(response: ValidateFnResponse, options: OptionsShape): ValidationResult;
    translateMessage(message: TranslatableMessage): string;
    computeOptions(options: Computable<Context, OptionsShape>): OptionsShape;
    compute<K extends keyof OptionsShape>(value: Computable<Context, OptionsShape>[K]): OptionsShape[K];
}
//# sourceMappingURL=base.d.ts.map