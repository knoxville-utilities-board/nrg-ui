import ArrayProxy from '@ember/array/proxy';
import { assert } from '@ember/debug';
import { get } from '@ember/object';
import ObjectProxy from '@ember/object/proxy';
import { getOwner } from '@ember/owner';
// @ts-expect-error Glimmer doesn't currently ship a type for the `cached` decorator
// https://github.com/glimmerjs/glimmer.js/issues/408
import { cached } from '@glimmer/tracking';

import type { Binding } from '../../';
import type {
  DerivedOptions,
  Options,
  TranslatableMessage,
  ValidateFnResponse,
  ValidationResult,
  Validator,
} from '../types.d.ts';

export function isProxy(
  value: unknown,
): value is ObjectProxy | ArrayProxy<never> {
  return value instanceof ObjectProxy || value instanceof ArrayProxy;
}

export function unwrapProxy<T>(value: T): T {
  if (isProxy(value)) {
    return unwrapProxy(value.content as T);
  }

  return value;
}

export default abstract class BaseValidator<
  T,
  Model extends object = Record<string, unknown>,
  OptionsShape extends DerivedOptions = DerivedOptions,
  Context extends object = Record<string, unknown>,
> implements Validator<T, Model, OptionsShape, Context>
{
  abstract validate(
    this: BaseValidator<T, Model, OptionsShape, Context>,
    value: T,
    options: OptionsShape,
    context: Context | Model,
  ): ValidateFnResponse;
  defaultOptions: OptionsShape = {} as OptionsShape;

  readonly owner;
  readonly binding: Binding<Model>;
  readonly options: OptionsShape;
  readonly context: Context | Model;

  constructor(
    binding: Binding<Model>,
    options: OptionsShape,
    context: Context,
  ) {
    this.binding = binding;
    this.options = options;
    this.context = context ?? binding.model;

    assert(
      'The `validate` method must be implemented by subclasses of BaseValidator',
      this.validate,
    );

    const owner = getOwner(this.context);
    assert(
      'The `context` or `model` must be have an owner. Usually this means the `context` or `model` is an EmberObject or GlimmerComponent, but this can be manually set up with `setOwner`',
      owner !== undefined,
    );

    this.owner = owner;
  }

  get intl() {
    return this.owner.lookup('service:intl');
  }

  get value(): T {
    const { model, valuePath } = this.binding;
    const value = get(model, valuePath) as T;

    return unwrapProxy(value);
  }

  @cached
  get result(): ValidationResult {
    const { context, options, validate, value } = this;
    const computedOptions = this.computeOptions(options);
    const response = validate.apply(this, [value, computedOptions, context]);

    return this.coalesceResponse(response, computedOptions);
  }

  coalesceResponse(
    response: ValidateFnResponse,
    options: OptionsShape,
  ): ValidationResult {
    if (typeof response === 'boolean') {
      return {
        isValid: response,
        isWarning: options.isWarning ?? false,
        message: options.message,
      };
    }
    if (typeof response === 'string') {
      return {
        isValid: false,
        isWarning: options.isWarning ?? false,
        message: options.message ?? response,
      };
    }
    if ('key' in response) {
      const message = this.translateMessage(response);
      return {
        isValid: false,
        isWarning: options.isWarning ?? false,
        message,
      };
    }

    return response;
  }

  translateMessage(message: TranslatableMessage): string {
    const { key, ...options } = message;

    return this.intl.t(key, options);
  }

  computeOptions(options: Options<Context>): OptionsShape {
    const { context, defaultOptions } = this;
    const computed: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(options)) {
      if (typeof value === 'function') {
        computed[key] = value.apply(context);
      } else {
        computed[key] = value;
      }
    }

    return { ...defaultOptions, ...computed } as OptionsShape;
  }
}
