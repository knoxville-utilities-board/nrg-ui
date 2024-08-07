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
