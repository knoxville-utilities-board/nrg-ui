import ConfirmationValidator from './validators/confirmation.ts';
import CustomValidator from './validators/custom.ts';
import EmailValidator from './validators/email.ts';
import ExclusionValidator from './validators/exclusion.ts';
import FileValidator from './validators/file.ts';
import InclusionValidator from './validators/inclusion.ts';
import LengthValidator from './validators/length.ts';
import NumberValidator from './validators/number.ts';
import PasswordValidator from './validators/password.ts';
import PhoneValidator from './validators/phone.ts';
import PresenceValidator from './validators/presence.ts';
import RangeValidator from './validators/range.ts';
import RegexValidator from './validators/regex.ts';

import type { Computable, TranslatableOption, Validator } from './types.ts';
import type { Binding, Primitive } from '../index.ts';
import type { ConfirmationOptions } from './validators/confirmation.ts';
import type { CustomOptions } from './validators/custom.ts';
import type { EmailOptions } from './validators/email.ts';
import type { ExclusionOptions } from './validators/exclusion.ts';
import type { FileOptions } from './validators/file.ts';
import type { InclusionOptions } from './validators/inclusion.ts';
import type { LengthOptions } from './validators/length.ts';
import type { NumberOptions } from './validators/number.ts';
import type { PasswordOptions } from './validators/password.ts';
import type { PhoneOptions } from './validators/phone.ts';
import type { PresenceOptions } from './validators/presence.ts';
import type { RangeOptions } from './validators/range.ts';
import type { RegexOptions } from './validators/regex.ts';

// It's a lot easier to work with a map of validators
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Validators = {
  confirmation: ConfirmationValidator,
  custom: CustomValidator,
  email: EmailValidator,
  exclusion: ExclusionValidator,
  file: FileValidator,
  inclusion: InclusionValidator,
  length: LengthValidator,
  number: NumberValidator,
  password: PasswordValidator,
  phone: PhoneValidator,
  presence: PresenceValidator,
  range: RangeValidator,
  regex: RegexValidator,
};
type ValidatorType = keyof typeof Validators;

declare type OptionsOf<T extends ValidatorType> = ConstructorParameters<(typeof Validators)[T]>[1];

type ValidatorFnArgs<
  V extends ValidatorType = ValidatorType,
  Context extends object = object,
> = V extends V ? [V, OptionsOf<V>, Context | undefined] | [V, OptionsOf<V>] : never;

export function validator<
  Context extends object = object,
  T = unknown,
  V extends ValidatorType = ValidatorType,
>(
  ...[type, options, context]: ValidatorFnArgs<V, Context>
): Validator<unknown, Context, OptionsOf<V>> {
  if (type === 'confirmation') {
    return confirmation(options, context);
  }

  if (type === 'custom') {
    return custom(options as CustomOptions<T, Context>, context);
  }

  if (type === 'email') {
    return email(options, context);
  }

  if (type === 'exclusion') {
    return exclusion(options, context);
  }

  if (type === 'file') {
    return file(options, context);
  }

  if (type === 'inclusion') {
    return inclusion(options, context);
  }

  if (type === 'length') {
    return length(options, context);
  }

  if (type === 'number') {
    return number(options, context);
  }

  if (type === 'phone') {
    return phone(options, context);
  }

  if (type === 'presence') {
    return presence(options, context);
  }

  if (type === 'range') {
    return range(options, context);
  }

  if (type === 'regex') {
    return regex(options, context);
  }

  if (type === 'password') {
    return password(options, context);
  }

  throw new Error(`Unknown validator type: ${type}`);
}

export function confirmation<Context extends object = object>(
  options: Computable<Context, ConfirmationOptions>,
  context?: Context,
): Validator<TranslatableOption, Context, ConfirmationOptions> {
  return (binding: Binding) => new ConfirmationValidator<Context>(binding, options, context);
}

export function custom<Context extends object = object, T = unknown>(
  options: Computable<Context, CustomOptions<T, Context>>,
  context?: Context,
): Validator<T, Context, CustomOptions<T, Context>> {
  return (binding: Binding) => new CustomValidator<T, Context>(binding, options, context);
}

export function email<Context extends object = object>(
  options: Computable<Context, EmailOptions>,
  context?: Context,
): Validator<string, Context, EmailOptions> {
  return (binding: Binding) => new EmailValidator<Context>(binding, options, context);
}

export function exclusion<Context extends object = object, T extends Primitive = Primitive>(
  options: Computable<Context, ExclusionOptions<T>>,
  context?: Context,
): Validator<T, Context, ExclusionOptions<T>> {
  return (binding: Binding) => new ExclusionValidator<T, Context>(binding, options, context);
}

export function file<Context extends object = object>(
  options: Computable<Context, FileOptions>,
  context?: Context,
): Validator<File | File[], Context, FileOptions> {
  return (binding: Binding) => new FileValidator<Context>(binding, options, context);
}

export function inclusion<Context extends object = object, T extends Primitive = Primitive>(
  options: Computable<Context, InclusionOptions<T>>,
  context?: Context,
): Validator<T, Context, InclusionOptions<T>> {
  return (binding: Binding) => new InclusionValidator<T, Context>(binding, options, context);
}

export function length<
  Context extends object = object,
  T extends ArrayLike<unknown> = ArrayLike<unknown>,
>(
  options: Computable<Context, LengthOptions>,
  context?: Context,
): Validator<T, Context, LengthOptions> {
  return (binding: Binding) => new LengthValidator<T, Context>(binding, options, context);
}

export function number<Context extends object = object>(
  options: Computable<Context, NumberOptions>,
  context?: Context,
): Validator<number, Context, NumberOptions> {
  return (binding: Binding) => new NumberValidator<Context>(binding, options, context);
}

export function password<Context extends object = object>(
  options: Computable<Context, PasswordOptions>,
  context?: Context,
): Validator<string, Context, PasswordOptions> {
  return (binding: Binding) => new PasswordValidator<Context>(binding, options, context);
}

export function phone<Context extends object = object>(
  options: Computable<Context, PhoneOptions>,
  context?: Context,
): Validator<string, Context, PhoneOptions> {
  return (binding: Binding) => new PhoneValidator<Context>(binding, options, context);
}

export function presence<Context extends object = object, T = unknown>(
  options: Computable<Context, PresenceOptions>,
  context?: Context,
): Validator<T, Context, PresenceOptions> {
  return (binding: Binding) => new PresenceValidator<T, Context>(binding, options, context);
}

export function range<Context extends object = object>(
  options: Computable<Context, RangeOptions>,
  context?: Context,
): Validator<number, Context, RangeOptions> {
  return (binding: Binding) => new RangeValidator<Context>(binding, options, context);
}

export function regex<Context extends object = object>(
  options: Computable<Context, RegexOptions>,
  context?: Context,
): Validator<string, Context, RegexOptions> {
  return (binding: Binding) => new RegexValidator<Context>(binding, options, context);
}
