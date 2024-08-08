import BaseValidator from './base.ts';
import { isEqual, isPresent } from '@ember/utils';
import { assert } from '@ember/debug';

import type { Binding } from '../../types';
import type { TranslatableOption, ValidateFnResponse } from '../types';

declare type ConfirmationOptions = {
  label?: string;
  on: string;
};

export default class ConfirmationValidator extends BaseValidator<
  TranslatableOption,
  ConfirmationOptions,
  Record<string, TranslatableOption>
> {
  constructor(
    binding: Binding<unknown>,
    options: ConfirmationOptions,
    context: Record<string, TranslatableOption>,
  ) {
    super(binding, options, context);

    const { on } = options;

    assert(
      'ConfirmationValidator requires a property name `on` to be provided',
      isPresent(on),
    );
  }

  validate(
    value: TranslatableOption,
    options: ConfirmationOptions,
    context: Record<string, TranslatableOption>,
  ): ValidateFnResponse {
    const { label, on } = options;

    const expectedValue = context[on];

    if (isEqual(value, expectedValue)) {
      return true;
    }

    return {
      key: 'nrg.validation.confirmation.invalid',
      value,
      expectedValue,
      label: label ?? on,
    };
  }
}
