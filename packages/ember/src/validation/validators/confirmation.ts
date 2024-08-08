import { assert } from '@ember/debug';
import { isEqual, isPresent } from '@ember/utils';

import BaseValidator from './base.ts';

import type { Binding } from '../../types';
import type { TranslatableOption, ValidateFnResponse } from '../types';

declare type ConfirmationOptions = {
  /**
   * When building the error message, this will be used as the label for the field.
   * If not provided, the `on` property will be used.
   */
  label?: string;
  /**
   * The property name to compare the value against.
   */
  on: string;
};

export default class ConfirmationValidator extends BaseValidator<
  TranslatableOption,
  ConfirmationOptions,
  Record<string, TranslatableOption>
> {
  constructor(
    binding: Binding,
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
