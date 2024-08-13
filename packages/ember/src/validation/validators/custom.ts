import { assert } from '@ember/debug';
// @ts-expect-error Glimmer doesn't currently ship a type for the `cached` decorator
// https://github.com/glimmerjs/glimmer.js/issues/408
import { cached } from '@glimmer/tracking';

import BaseValidator from './base.ts';

import type { Binding } from '../../types';
import type {
  DerivedOptions,
  ValidateFnResponse,
  ValidationResult,
} from '../types';

declare type ValidateFn<T> = (
  value: T,
  options: CustomOptions<T>,
  context: Record<string, unknown>,
) => ValidateFnResponse;

export type CustomOptions<T> = {
  /**
   * The function to be called to validate. It should return a boolean or a
   * response object.
   */
  validate: ValidateFn<T>;
} & DerivedOptions;

export default class CustomValidator<
  T,
  Options extends CustomOptions<T> = CustomOptions<T>,
  Context extends object = Record<string, unknown>,
> extends BaseValidator<T, Options, Context> {
  constructor(binding: Binding, options: Options, context: Context) {
    super(binding, options, context);

    const { validate } = options;

    assert(
      'CustomValidator requires a `validate` function to be provided',
      validate,
    );
  }

  @cached
  get result(): ValidationResult {
    const { context, value } = this;
    const { validate, ...options } = this.options;
    const computedOptions = this.computeOptions(options);

    let response = validate.apply(context, [
      value,
      computedOptions,
      context as Record<string, unknown>,
    ]);

    response = this.coalesceResponse(response, computedOptions);
    if (!response.isValid) {
      response.message ??= this.intl.t('nrg.validation.custom.invalid', {
        value: String(value),
      });
    }

    return this.coalesceResponse(response, computedOptions);
  }

  validate(): ValidateFnResponse {
    assert('[BUG] The `validate` method should never be called directly');
  }
}
