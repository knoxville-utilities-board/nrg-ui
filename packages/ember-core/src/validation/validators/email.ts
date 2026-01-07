import { isEmpty, isNone } from '@ember/utils';
import { tKey } from 'ember-intl';

import BaseValidator from './base.ts';
import { regex as emailRegex } from '../../utils/email.ts';

import type { BaseOptions, ValidateFnResponse } from '../types';

export type EmailOptions = {
  /**
   * If `true`, the value can be an empty string, null, or undefined.
   */
  allowBlank?: boolean;
  /**
   * If provided, the value must not use any of the domains in the list.
   *
   * Note that subdomains are not supported.
   */
  invalidDomains?: string[];
  /**
   * If provided, the value must use one of the domains in the list.
   *
   * Note that subdomains are not supported.
   */
  validDomains?: string[];
} & BaseOptions;

/** TODO Add support for subdomains */
export default class EmailValidator<
  Context extends object = Record<string, unknown>,
> extends BaseValidator<string | null | undefined, Context, EmailOptions> {
  validate(value: string | null | undefined, options: EmailOptions): ValidateFnResponse {
    const { allowBlank, invalidDomains, validDomains } = options;

    const key = tKey('nrg.validation.email.invalid');

    if (isEmpty(value) || isNone(value)) {
      if (allowBlank) {
        return true;
      }
      return {
        key,
        value,
      };
    }

    const matches = emailRegex.exec(value);
    if (matches === null) {
      return {
        key,
        value,
      };
    }
    const [, , domainPart] = matches;

    if (invalidDomains?.includes(domainPart!)) {
      return {
        key: tKey('nrg.validation.email.domain.invalid'),
        value,
        domains: this.listToString(invalidDomains),
      };
    }

    if (validDomains && !validDomains.includes(domainPart!)) {
      return {
        key: tKey('nrg.validation.email.domain.valid'),
        value,
        domains: this.listToString(validDomains),
      };
    }

    return true;
  }

  listToString(value: string[]): string {
    return this.intl.formatList(value);
  }
}
