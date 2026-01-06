import ArrayProxy from '@ember/array/proxy';
import { assert } from '@ember/debug';
import { get } from '@ember/object';
import ObjectProxy from '@ember/object/proxy';
import { getOwner } from '@ember/owner';
import { cached } from '@glimmer/tracking';

import type { Binding } from '../../index.ts';
import type {
  BaseOptions,
  Computable,
  TranslatableMessage,
  ValidateFnResponse,
  ValidationResult,
  ValidatorImpl,
} from '../types.ts';
import type { IntlService } from 'ember-intl';

export function isProxy(value: unknown): value is ObjectProxy | ArrayProxy<never> {
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
  Context extends object = Record<string, unknown>,
  OptionsShape extends BaseOptions = BaseOptions,
> implements ValidatorImpl<T, Context, OptionsShape> {
  abstract validate(
    this: BaseValidator<T, Context, OptionsShape>,
    value: T,
    options: OptionsShape,
    context: Context,
  ): ValidateFnResponse;
  defaultOptions: Computable<Context, OptionsShape & BaseOptions> = {} as OptionsShape;

  readonly owner;
  readonly binding: Binding;
  readonly options: Computable<Context, OptionsShape & BaseOptions>;
  readonly context: Context;

  constructor(
    binding: Binding,
    options: Computable<Context, OptionsShape & BaseOptions>,
    context?: Context,
  ) {
    this.binding = binding;
    this.options = options;
    this.context = context ?? (binding.model as Context);

    assert(`You must provide a binding argument to ${this.constructor.name}`, binding);

    assert(
      'BaseValidator requires the `validate` function to be implemented by subclasses',
      typeof this.validate === 'function',
    );

    const owner = getOwner(this.context);
    assert(
      'The `context` or `model` must be have an owner. Usually this means the `context` or `model` is an EmberObject or GlimmerComponent, but this can be manually set up with `setOwner`',
      owner !== undefined,
    );

    this.owner = owner;
  }

  get intl() {
    return this.owner.lookup('service:intl') as IntlService;
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

    if (computedOptions.disabled) {
      return { isValid: true };
    }

    const response = validate.apply(this, [value, computedOptions, context]);

    return this.coalesceResponse(response, computedOptions);
  }

  coalesceResponse(response: ValidateFnResponse, options: OptionsShape): ValidationResult {
    let isValid = false;
    let isWarning = options.isWarning;
    let message = options.message;

    if (typeof response === 'boolean') {
      isValid = response;
    } else if (typeof response === 'string') {
      message = response;
    } else {
      isValid = response.isValid ?? isValid;
      isWarning ??= response.isWarning ?? isWarning;
    }

    isWarning ??= false;

    if (options.key) {
      const translationOptions = { ...options };
      if (typeof response === 'object') {
        Object.assign(translationOptions, response);
      }

      message = this.translateMessage({
        ...translationOptions,
        key: options.key,
      });
    } else if (options.message) {
      message = options.message;
    } else if (typeof response === 'object') {
      message = response.message;

      if ('key' in response && response.key) {
        message = this.translateMessage({ ...options, ...response });
      }
    }

    if (isValid && !isWarning) {
      message = undefined;
    }

    return { isValid, isWarning, message };
  }

  translateMessage(message: TranslatableMessage): string {
    const { key, ...options } = message;

    return this.intl.t(key, options);
  }

  computeOptions(options: Computable<Context, OptionsShape>) {
    const { defaultOptions } = this;
    const computed = {} as OptionsShape;

    for (const key of Object.keys(options)) {
      computed[key as keyof OptionsShape] = this.compute(options[key as keyof OptionsShape]);
    }

    for (const key of Object.keys(defaultOptions)) {
      if (key in computed) {
        continue;
      }

      const willOverrideMessage = key === 'key' && 'message' in computed;
      const willOverrideKey = key === 'message' && 'key' in computed;
      if (willOverrideMessage || willOverrideKey) {
        continue;
      }

      computed[key as keyof OptionsShape] = this.compute(defaultOptions[key as keyof OptionsShape]);
    }

    return { ...computed };
  }

  compute<K extends keyof OptionsShape>(
    value: Computable<Context, OptionsShape>[K],
  ): OptionsShape[K] {
    if (typeof value === 'function') {
      return value.apply(this.context);
    }

    return value as OptionsShape[K];
  }
}
