import { assert } from '@ember/debug';
// @ts-expect-error Glimmer doesn't currently ship a type for the `cached` decorator
// https://github.com/glimmerjs/glimmer.js/issues/408
import { cached } from '@glimmer/tracking';

import BaseValidator from './base.ts';

import type { Binding } from '../../';
import type {
  BaseOptions,
  Computable,
  ValidateFnResponse,
  ValidationResult,
} from '../types';

declare type ValidateFn<T, Context> = (
  value: T,
  options: CustomOptions<T, Context>,
  context: Record<string, unknown>,
) => ValidateFnResponse;

export type CustomOptions<T, Context> = {
  /**
   * The function to be called to validate. It should return a boolean or a
   * response object.
   */
  validate: ValidateFn<T, Context>;
} & BaseOptions;

export default class CustomValidator<
  T,
  Model extends object,
  Context extends object = Record<string, unknown>,
> extends BaseValidator<T, Model, Context, CustomOptions<T, Context>> {
  constructor(
    binding: Binding<Model>,
    options: Computable<Context, CustomOptions<T, Context>>,
    context: Context,
  ) {
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
    const computedOptions = this.computeOptions(
      options as CustomOptions<T, Context>,
    );

    if (computedOptions.disabled) {
      return { isValid: true };
    }

    let response = (validate as ValidateFn<T, Context>).apply(context, [
      value,
      computedOptions,
      context as Record<string, unknown>,
    ]);

    response = this.coalesceResponse(response, computedOptions);
    if (!response.isValid) {
      response.message ??= this.intl.t('nrg.validation.custom.invalid', {
        value: String(value),
      });

      delete computedOptions.key;
    }

    return this.coalesceResponse(response, computedOptions);
  }

  validate(): ValidateFnResponse {
    assert('[BUG] The `validate` method should never be called directly');
  }
}
