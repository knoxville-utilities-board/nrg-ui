import ConfirmationValidator from './validators/confirmation.ts';
import CustomValidator from './validators/custom.ts';
import EmailValidator from './validators/email.ts';
import ExclusionValidator from './validators/exclusion.ts';
import InclusionValidator from './validators/inclusion.ts';
import LengthValidator from './validators/length.ts';
import NumberValidator from './validators/number.ts';
import PasswordValidator from './validators/password.ts';
import PhoneValidator from './validators/phone.ts';
import PresenceValidator from './validators/presence.ts';
import RangeValidator from './validators/range.ts';
import RegexValidator from './validators/regex.ts';

import type { TranslatableOption, ValidatorBuilder } from './types';
import type { Binding } from '../';

// It's a lot easier to work with a map of validators
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Validators = {
  confirmation: ConfirmationValidator,
  custom: CustomValidator,
  email: EmailValidator,
  exclusion: ExclusionValidator,
  inclusion: InclusionValidator,
  length: LengthValidator,
  number: NumberValidator,
  phone: PhoneValidator,
  presence: PresenceValidator,
  range: RangeValidator,
  regex: RegexValidator,
  password: PasswordValidator,
};
type ValidatorType = keyof typeof Validators;

declare type OptionsOf<T extends ValidatorType> = ConstructorParameters<
  (typeof Validators)[T]
>[1];
declare type ContextOf<T extends ValidatorType> = ConstructorParameters<
  (typeof Validators)[T]
>[2];

type ValidatorFnArgs<T extends ValidatorType = ValidatorType> = T extends T
  ? [type: T, values: OptionsOf<T>]
  : never;

export function validator<V extends ValidatorType = ValidatorType>(
  ...[type, options]: ValidatorFnArgs<V>
): ValidatorBuilder<unknown, ContextOf<V>, ContextOf<V>, OptionsOf<V>> {
  if (type === 'confirmation') {
    return (binding: Binding<ContextOf<V>>, context: ContextOf<V>) =>
      new ConfirmationValidator(
        binding,
        options,
        context as Record<string, TranslatableOption>,
      );
  }
  if (type === 'custom') {
    return (binding: Binding<ContextOf<V>>, context: ContextOf<V>) =>
      new CustomValidator(binding, options, context);
  }
  if (type === 'email') {
    return (binding: Binding<ContextOf<V>>, context: ContextOf<V>) =>
      new EmailValidator(binding, options, context);
  }
  if (type === 'exclusion') {
    return (binding: Binding<ContextOf<V>>, context: ContextOf<V>) =>
      new ExclusionValidator(binding, options, context);
  }
  if (type === 'inclusion') {
    return (binding: Binding<ContextOf<V>>, context: ContextOf<V>) =>
      new InclusionValidator(binding, options, context);
  }
  if (type === 'length') {
    return (binding: Binding<ContextOf<V>>, context: ContextOf<V>) =>
      new LengthValidator(binding, options, context);
  }
  if (type === 'number') {
    return (binding: Binding<ContextOf<V>>, context: ContextOf<V>) =>
      new NumberValidator(binding, options, context);
  }
  if (type === 'phone') {
    return (binding: Binding<ContextOf<V>>, context: ContextOf<V>) =>
      new PhoneValidator(binding, options, context);
  }
  if (type === 'presence') {
    return (binding: Binding<ContextOf<V>>, context: ContextOf<V>) =>
      new PresenceValidator(binding, options, context);
  }
  if (type === 'range') {
    return (binding: Binding<ContextOf<V>>, context: ContextOf<V>) =>
      new RangeValidator(binding, options, context);
  }
  if (type === 'regex') {
    return (binding: Binding<ContextOf<V>>, context: ContextOf<V>) =>
      new RegexValidator(binding, options, context);
  }
  if (type === 'password') {
    return (binding: Binding<ContextOf<V>>, context: ContextOf<V>) =>
      new PasswordValidator(binding, options, context);
  }

  throw new Error(`Unknown validator type: ${type}`);
}
