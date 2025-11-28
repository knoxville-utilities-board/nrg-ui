import { assert } from '@ember/debug';
import { isEmpty, isPresent } from '@ember/utils';

import BaseValidator from './base.ts';

import type { Binding } from '../../index.ts';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types';

export type PresenceOptions = {
  /**
   * If `true`, the value must be present.
   * If `false`, the value must be blank.
   */
  presence: boolean;
  /**
   * Allow empty strings to be considered blank
   * @default true
   */
  ignoreBlank?: boolean;
} & BaseOptions;

export default class PresenceValidator<
  T,
  Context extends object = Record<string, unknown>,
> extends BaseValidator<T, Context, PresenceOptions> {
  defaultOptions = {
    presence: true,
    ignoreBlank: true,
  };

  constructor(
    binding: Binding,
    options: Computable<Context, PresenceOptions>,
    context: Context,
  ) {
    super(binding, options, context);

    assert(
      'PresenceValidator requires `presence` to be provided',
      options.presence !== undefined,
    );
  }

  validate(value: T, options: PresenceOptions): ValidateFnResponse {
    const { presence, ignoreBlank } = options;
    const hasValue = ignoreBlank ? isPresent(value) : !isEmpty(value);

    if (presence === true && !hasValue) {
      return { key: 'nrg.validation.presence.blank' };
    }

    if (presence === false && hasValue) {
      return { key: 'nrg.validation.presence.notBlank' };
    }

    return true;
  }
}
