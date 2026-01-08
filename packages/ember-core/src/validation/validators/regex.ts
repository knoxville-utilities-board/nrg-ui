import { assert } from '@ember/debug';
import { isNone } from '@ember/utils';

import BaseValidator from './base.ts';

import type { Binding } from '../../index.ts';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types';

export type RegexOptions = {
  /**
   * If `true`, the value must not match the pattern.
   * @default false
   */
  inverse?: boolean;
  /**
   * A regular expression pattern that the value must match.
   */
  pattern: RegExp | string;
} & BaseOptions;

export default class RegexValidator<
  Context extends object = Record<string, unknown>,
> extends BaseValidator<string, Context, RegexOptions> {
  constructor(binding: Binding, options: Computable<Context, RegexOptions>, context?: Context) {
    super(binding, options, context);

    const { pattern } = options;

    assert('RegexValidator requires `pattern` to be provided', !isNone(pattern));
  }

  validate(value: string, options: RegexOptions): ValidateFnResponse {
    const { inverse = false, pattern } = options;

    assert('RegexValidator requires a pattern to be provided', !isNone(pattern));

    assert(
      'RegexValidator requires the pattern to be of type string or RegExp',
      typeof pattern === 'string' || pattern instanceof RegExp,
    );

    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    const isValid = regex.test(value) === !inverse;

    if (isValid) {
      return true;
    }

    const messageType = inverse ? 'match' : 'doesNotMatch';

    return {
      key: `nrg.validation.regex.${messageType}`,
      value,
      inverse,
      pattern: regex.toString(),
    };
  }
}
