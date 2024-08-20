import { assert } from '@ember/debug';
import { isEqual, isPresent } from '@ember/utils';

import BaseValidator from './base.ts';

import type { Binding } from '../../';
import type {
  BaseOptions,
  Computable,
  TranslatableOption,
  ValidateFnResponse,
} from '../types';

export type ConfirmationOptions = {
  /**
   * When building the error message, this will be used as the label for the field.
   * If not provided, the `on` property will be used.
   */
  label?: string;
  /**
   * The property name to compare the value against.
   */
  on: string;
} & BaseOptions;

export default class ConfirmationValidator<
  Model extends object,
  Context extends object = Record<string, TranslatableOption>,
> extends BaseValidator<
  TranslatableOption,
  Model,
  Context,
  ConfirmationOptions
> {
  constructor(
    binding: Binding<Model>,
    options: Computable<Context, ConfirmationOptions>,
    context: Context,
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
    context: Context,
  ): ValidateFnResponse {
    const { label, on } = options;

    const expectedValue = (context as Record<string, TranslatableOption>)[on];

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
