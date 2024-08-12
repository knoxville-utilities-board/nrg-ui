import ConfirmationValidator from './validators/confirmation.ts';
import CustomValidator from './validators/custom.ts';
import ExclusionValidator from './validators/exclusion.ts';
import InclusionValidator from './validators/inclusion.ts';
import LengthValidator from './validators/length.ts';
import NumberValidator from './validators/number.ts';
import PresenceValidator from './validators/presence.ts';
import RangeValidator from './validators/range.ts';
import RegexValidator from './validators/regex.ts';

import type { TranslatableOption, ValidatorBuilder } from './types';
import type { Binding } from '../types';

const Validators = {
  confirmation: ConfirmationValidator,
  custom: CustomValidator,
  exclusion: ExclusionValidator,
  inclusion: InclusionValidator,
  length: LengthValidator,
  number: NumberValidator,
  presence: PresenceValidator,
  range: RangeValidator,
  regex: RegexValidator,
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
): ValidatorBuilder<unknown, OptionsOf<V>, ContextOf<V>> {
  if (type === 'confirmation') {
    return (binding: Binding, context: ContextOf<V>) =>
      new ConfirmationValidator(
        binding,
        options,
        context as Record<string, TranslatableOption>,
      );
  }
  if (type === 'custom') {
    return (binding: Binding, context: ContextOf<V>) =>
      new CustomValidator(binding, options, context);
  }
  if (type === 'exclusion') {
    return (binding: Binding, context: ContextOf<V>) =>
      new ExclusionValidator(binding, options, context);
  }
  if (type === 'inclusion') {
    return (binding: Binding, context: ContextOf<V>) =>
      new InclusionValidator(binding, options, context);
  }
  if (type === 'length') {
    return (binding: Binding, context: ContextOf<V>) =>
      new LengthValidator(binding, options, context);
  }
  if (type === 'number') {
    return (binding: Binding, context: ContextOf<V>) =>
      new NumberValidator(binding, options, context);
  }
  if (type === 'presence') {
    return (binding: Binding, context: ContextOf<V>) =>
      new PresenceValidator(binding, options, context);
  }
  if (type === 'range') {
    return (binding: Binding, context: ContextOf<V>) =>
      new RangeValidator(binding, options, context);
  }
  if (type === 'regex') {
    return (binding: Binding, context: ContextOf<V>) =>
      new RegexValidator(binding, options, context);
  }

  throw new Error(`Unknown validator type: ${type}`);
}
