export type ComputedProperty<Context> = (this: Context) => DerivedOptionValue;

export interface DerivedOptions {
  [key: string]: DerivedOptionValue;
  message?: string;
  isWarning?: boolean;
}
export type DerivedOptionValue =
  | boolean
  | number
  | string
  | Date
  | undefined
  | RegExp
  | unknown[];

export interface Options<Context> {
  [key: string]: OptionValue<Context>;
}
export type OptionValue<Context> =
  | ComputedProperty<Context, unknown>
  | DerivedOptionValue;

export interface TranslatableMessage {
  key: string;
  [option: string]: TranslatableOption;
}

export type TranslatableOption =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined;

export type ValidateFnResponse =
  | boolean
  | string
  | TranslatableMessage
  | ValidationResult;

export interface ValidationResult {
  isValid: boolean;
  isWarning?: boolean;
  message?: string;
}

export type ValidatorBuilder<T, Model, OptionsShape, Context> = (
  binding: Binding<Model>,
  context: Context,
) => Validator<T, Model, OptionsShape, Context>;
export interface Validator<T, Model, OptionsShape, Context> {
  validate(
    this: BaseValidator<T, OptionsShape, Context>,
    value: T,
    options: OptionsShape,
    context: Context | Model,
  ): ValidateFnResponse;

  result: ValidationResult;
}
