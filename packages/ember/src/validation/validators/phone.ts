import { isEmpty, isNone } from '@ember/utils';

import BaseValidator from './base.ts';
import {
  getAreaCode,
  getCountryCode,
  getExchangeCode,
} from '../../utils/phone.ts';

import type { BaseOptions, ValidateFnResponse } from '../types';

export type PhoneOptions = {
  /**
   * If `true`, the value can be an empty string, null, or undefined.
   */
  allowBlank?: boolean;
  /**
   * If `allow`, the number may contain an area code.
   * If `disallow`, the number must not contain an area code.
   * If `require`, the number must contain an area code.
   * @default 'allow'
   */
  areaCode?: 'allow' | 'disallow' | 'require';
  /**
   * If `allow`, the number may contain a country code.
   * If `disallow`, the number must not contain a country code.
   * If `require`, the number must contain a country code.
   * @default 'allow'
   */
  countryCode?: 'allow' | 'disallow' | 'require';
  /**
   * If provided, the area code of the number must not match any of the provided area codes.
   */
  invalidAreaCodes?: string[];
  /**
   * If provided, the country code of the number must not match any of the provided country codes.
   */
  invalidCountryCodes?: string[];
  /**
   * If provided, the exchange code of the number must not match any of the provided exchange codes.
   */
  invalidExchangeCodes?: string[];
  /**
   * If provided, the area code of the number must match one of the provided area codes.
   */
  validAreaCodes?: string[];
  /**
   * If provided, the country code of the number must match one of the provided country codes.
   */
  validCountryCodes?: string[];
  /**
   * If provided, the exchange code of the number must match one of the provided exchange codes.
   */
  validExchangeCodes?: string[];
} & BaseOptions;

export default class PhoneValidator<
  Model extends object,
  Context extends object = Record<string, unknown>,
> extends BaseValidator<
  string | null | undefined,
  Model,
  Context,
  PhoneOptions
> {
  defaultOptions = {
    areaCode: 'allow' as const,
    countryCode: 'allow' as const,
  };

  validate(
    value: string | null | undefined,
    options: PhoneOptions,
  ): ValidateFnResponse {
    const { allowBlank } = options;

    const key = 'nrg.validation.phone.invalid';

    if (isEmpty(value) || isNone(value)) {
      if (allowBlank) {
        return true;
      }
      return {
        key,
        value,
      };
    }

    let result = this.checkCountryCode(value, options);
    if (result !== true) {
      return result;
    }

    result = this.checkAreaCode(value, options);
    if (result !== true) {
      return result;
    }

    result = this.checkExchangeCode(value, options);
    if (result !== true) {
      return result;
    }

    if (value) {
      const length = value.length;

      if (length < 7 || length > 13) {
        return {
          key,
          value,
        };
      }
    }

    return result;
  }

  checkCountryCode(value: string, options: PhoneOptions): ValidateFnResponse {
    const { countryCode, validCountryCodes, invalidCountryCodes } = options;
    const cc = getCountryCode(value);

    if (countryCode !== 'allow' || validCountryCodes || invalidCountryCodes) {
      if (cc && countryCode === 'disallow') {
        return {
          key: 'nrg.validation.phone.countryCode.notAllowed',
          value,
        };
      } else if (!cc && countryCode === 'require') {
        return {
          key: 'nrg.validation.phone.countryCode.required',
          value,
        };
      }
    }

    if (cc && validCountryCodes && !validCountryCodes.includes(cc)) {
      return {
        key: 'nrg.validation.phone.countryCode.valid',
        value,
        countryCodes: this.listToString(validCountryCodes),
      };
    }

    if (cc && invalidCountryCodes?.includes(cc)) {
      return {
        key: 'nrg.validation.phone.countryCode.invalid',
        value,
        countryCodes: this.listToString(invalidCountryCodes),
      };
    }

    return true;
  }

  checkAreaCode(value: string, options: PhoneOptions): ValidateFnResponse {
    const { areaCode, validAreaCodes, invalidAreaCodes } = options;

    const ac = getAreaCode(value);

    if (areaCode !== 'allow') {
      if (ac && areaCode === 'disallow') {
        return {
          key: 'nrg.validation.phone.areaCode.notAllowed',
          value,
        };
      } else if (!ac && areaCode === 'require') {
        return {
          key: 'nrg.validation.phone.areaCode.required',
          value,
        };
      }
    }

    if (ac && validAreaCodes && !validAreaCodes.includes(ac)) {
      return {
        key: 'nrg.validation.phone.areaCode.valid',
        value,
        areaCodes: this.listToString(validAreaCodes),
      };
    }

    if (ac && invalidAreaCodes?.includes(ac)) {
      return {
        key: 'nrg.validation.phone.areaCode.invalid',
        value,
        areaCodes: this.listToString(invalidAreaCodes),
      };
    }

    return true;
  }

  checkExchangeCode(value: string, options: PhoneOptions): ValidateFnResponse {
    const { validExchangeCodes, invalidExchangeCodes } = options;
    let key;
    let exchangeCodes;

    if (!validExchangeCodes && !invalidExchangeCodes) {
      return true;
    }

    const ec = getExchangeCode(value);
    if (validExchangeCodes && !validExchangeCodes.includes(ec)) {
      key = 'nrg.validation.phone.exchangeCode.valid';
      exchangeCodes = this.listToString(validExchangeCodes);
    }

    if (invalidExchangeCodes?.includes(ec)) {
      key = 'nrg.validation.phone.exchangeCode.invalid';
      exchangeCodes = this.listToString(invalidExchangeCodes);
    }

    if (key) {
      return {
        key,
        value,
        exchangeCodes,
      };
    }

    return true;
  }

  listToString(value: string[]): string {
    return this.intl.formatList(value);
  }
}
