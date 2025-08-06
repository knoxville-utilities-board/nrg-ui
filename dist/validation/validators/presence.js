
import { assert } from '@ember/debug';
import { isPresent, isEmpty } from '@ember/utils';
import BaseValidator from './base.js';

class PresenceValidator extends BaseValidator {
  defaultOptions = {
    presence: true,
    ignoreBlank: true
  };
  constructor(binding, options, context) {
    super(binding, options, context);
    assert('PresenceValidator requires `presence` to be provided', options.presence !== undefined);
  }
  validate(value, options) {
    const {
      presence,
      ignoreBlank
    } = options;
    const hasValue = ignoreBlank ? isPresent(value) : !isEmpty(value);
    if (presence === true && !hasValue) {
      return {
        key: 'nrg.validation.presence.blank'
      };
    }
    if (presence === false && hasValue) {
      return {
        key: 'nrg.validation.presence.notBlank'
      };
    }
    return true;
  }
}

export { PresenceValidator as default };
//# sourceMappingURL=presence.js.map
