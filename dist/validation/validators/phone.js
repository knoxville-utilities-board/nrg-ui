import { isEmpty, isNone } from '@ember/utils';
import { tKey } from 'ember-intl';
import BaseValidator from './base.js';
import { getCountryCode, getAreaCode, getExchangeCode } from '../../utils/phone.js';

class PhoneValidator extends BaseValidator {
  defaultOptions = {
    areaCode: 'allow',
    countryCode: 'allow'
  };
  validate(value, options) {
    const {
      allowBlank
    } = options;
    const key = tKey('nrg.validation.phone.invalid');
    if (isEmpty(value) || isNone(value)) {
      if (allowBlank) {
        return true;
      }
      return {
        key,
        value
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
          value
        };
      }
    }
    return result;
  }
  checkCountryCode(value, options) {
    const {
      countryCode,
      validCountryCodes,
      invalidCountryCodes
    } = options;
    const cc = getCountryCode(value);
    if (cc && countryCode === 'disallow') {
      return {
        key: tKey('nrg.validation.phone.countryCode.notAllowed'),
        value
      };
    }
    if (!cc && countryCode === 'require') {
      return {
        key: tKey('nrg.validation.phone.countryCode.required'),
        value
      };
    }
    if (cc && validCountryCodes && !validCountryCodes.includes(cc)) {
      return {
        key: tKey('nrg.validation.phone.countryCode.valid'),
        value,
        countryCodes: this.listToString(validCountryCodes)
      };
    }
    if (cc && invalidCountryCodes?.includes(cc)) {
      return {
        key: tKey('nrg.validation.phone.countryCode.invalid'),
        value,
        countryCodes: this.listToString(invalidCountryCodes)
      };
    }
    return true;
  }
  checkAreaCode(value, options) {
    const {
      areaCode,
      validAreaCodes,
      invalidAreaCodes
    } = options;
    const ac = getAreaCode(value);
    if (ac && areaCode === 'disallow') {
      return {
        key: tKey('nrg.validation.phone.areaCode.notAllowed'),
        value
      };
    } else if (!ac && areaCode === 'require') {
      return {
        key: tKey('nrg.validation.phone.areaCode.required'),
        value
      };
    }
    if (ac && validAreaCodes && !validAreaCodes.includes(ac)) {
      return {
        key: tKey('nrg.validation.phone.areaCode.valid'),
        value,
        areaCodes: this.listToString(validAreaCodes)
      };
    }
    if (ac && invalidAreaCodes?.includes(ac)) {
      return {
        key: tKey('nrg.validation.phone.areaCode.invalid'),
        value,
        areaCodes: this.listToString(invalidAreaCodes)
      };
    }
    return true;
  }
  checkExchangeCode(value, options) {
    const {
      validExchangeCodes,
      invalidExchangeCodes
    } = options;
    let key;
    let exchangeCodes;
    if (!validExchangeCodes && !invalidExchangeCodes) {
      return true;
    }
    const ec = getExchangeCode(value);
    if (validExchangeCodes && !validExchangeCodes.includes(ec)) {
      key = tKey('nrg.validation.phone.exchangeCode.valid');
      exchangeCodes = this.listToString(validExchangeCodes);
    }
    if (invalidExchangeCodes?.includes(ec)) {
      key = tKey('nrg.validation.phone.exchangeCode.invalid');
      exchangeCodes = this.listToString(invalidExchangeCodes);
    }
    if (key) {
      return {
        key,
        value,
        exchangeCodes
      };
    }
    return true;
  }
  listToString(value) {
    return this.intl.formatList(value);
  }
}

export { PhoneValidator as default };
//# sourceMappingURL=phone.js.map
