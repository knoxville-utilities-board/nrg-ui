import { isEmpty, isNone } from '@ember/utils';
import { tKey } from 'ember-intl';
import BaseValidator from './base.js';
import { regex } from '../../utils/email.js';

/** TODO Add support for subdomains */
class EmailValidator extends BaseValidator {
  validate(value, options) {
    const {
      allowBlank,
      invalidDomains,
      validDomains
    } = options;
    const key = tKey('nrg.validation.email.invalid');
    if (isEmpty(value) || isNone(value)) {
      if (allowBlank) {
        return true;
      }
      return {
        key,
        value
      };
    }
    const matches = regex.exec(value);
    if (matches === null) {
      return {
        key,
        value
      };
    }
    const [,, domainPart] = matches;
    if (invalidDomains?.includes(domainPart)) {
      return {
        key: tKey('nrg.validation.email.domain.invalid'),
        value,
        domains: this.listToString(invalidDomains)
      };
    }
    if (validDomains && !validDomains.includes(domainPart)) {
      return {
        key: tKey('nrg.validation.email.domain.valid'),
        value,
        domains: this.listToString(validDomains)
      };
    }
    return true;
  }
  listToString(value) {
    return this.intl.formatList(value);
  }
}

export { EmailValidator as default };
//# sourceMappingURL=email.js.map
