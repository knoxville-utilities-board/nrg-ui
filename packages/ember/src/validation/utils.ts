import ConfirmationValidator from './validators/confirmation.ts';
import CustomValidator from './validators/custom.ts';
import ExclusionValidator from './validators/exclusion.ts';
import InclusionValidator from './validators/inclusion.ts';
import LengthValidator from './validators/length.ts';
import NumberValidator from './validators/number.ts';
import PresenceValidator from './validators/presence.ts';
import RangeValidator from './validators/range.ts';
import RegexValidator from './validators/regex.ts';

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
declare type ValidatorType = Lowercase<keyof typeof Validators>;

declare type OptionsOf<T extends ValidatorType> = ConstructorParameters<
  (typeof Validators)[T]
>[1];
declare type ContextOf<T extends ValidatorType> = ConstructorParameters<
  (typeof Validators)[T]
>[2];

// TypeScript isn't recognizing that the type of the options has been narrowed
// to the correct type, so we need to use @ts-expect-error to suppress the error
// that would otherwise be raised.
export function validator<V extends ValidatorType>(
  type: V,
  options?: OptionsOf<V>,
) {
  if (type === 'confirmation') {
    return (binding: Binding, context: ContextOf<V>) =>
      // @ts-expect-error - See above
      new ConfirmationValidator(binding, options, context);
  }
  if (type === 'custom') {
    return (binding: Binding, context: ContextOf<V>) =>
      // @ts-expect-error - See above
      new CustomValidator(binding, options, context);
  }
  if (type === 'exclusion') {
    return (binding: Binding, context: ContextOf<V>) =>
      // @ts-expect-error - See above
      new ExclusionValidator(binding, options, context);
  }
  if (type === 'inclusion') {
    return (binding: Binding, context: ContextOf<V>) =>
      // @ts-expect-error - See above
      new InclusionValidator(binding, options, context);
  }
  if (type === 'length') {
    return (binding: Binding, context: ContextOf<V>) =>
      // @ts-expect-error - See above
      new LengthValidator(binding, options, context);
  }
  if (type === 'number') {
    return (binding: Binding, context: ContextOf<V>) =>
      // @ts-expect-error - See above
      new NumberValidator(binding, options, context);
  }
  if (type === 'presence') {
    return (binding: Binding, context: ContextOf<V>) =>
      // @ts-expect-error - See above
      new PresenceValidator(binding, options, context);
  }
  if (type === 'range') {
    return (binding: Binding, context: ContextOf<V>) =>
      // @ts-expect-error - Ditto
      new RangeValidator(binding, options, context);
  }
  if (type === 'regex') {
    return (binding: Binding, context: ContextOf<V>) =>
      // @ts-expect-error - See above
      new RegexValidator(binding, options, context);
  }

  throw new Error(`Unknown validator type: ${type}`);
}
