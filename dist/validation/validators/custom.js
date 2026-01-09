import { assert } from '@ember/debug';
import { cached } from '@glimmer/tracking';
import { tKey } from 'ember-intl';
import BaseValidator from './base.js';
import { n } from 'decorator-transforms/runtime';

class CustomValidator extends BaseValidator {
  constructor(binding, options, context) {
    super(binding, options, context);
    const {
      validate
    } = options;
    assert('CustomValidator requires a `validate` function to be provided', validate);
  }
  get result() {
    const {
      context,
      value
    } = this;
    const {
      validate,
      ...options
    } = this.options;
    const computedOptions = this.computeOptions(options);
    if (computedOptions.disabled) {
      return {
        isValid: true
      };
    }
    let response = validate.apply(context, [value, computedOptions, context]);
    const stringValue = String(value);
    response = this.coalesceResponse(response, {
      ...computedOptions,
      // @ts-expect-error `value` is not an option defined on `CustomOptions`,
      // but it is a valid option for the `coalesceResponse` method (which is
      // is used for translations)
      value: stringValue
    });
    if (!response.isValid) {
      response.message ??= this.intl.t(tKey('nrg.validation.custom.invalid'), {
        value: stringValue
      });
      delete computedOptions.key;
    }
    return this.coalesceResponse(response, computedOptions);
  }
  static {
    n(this.prototype, "result", [cached]);
  }
  validate() {
    assert('[BUG] The `validate` method should never be called directly');
  }
}

export { CustomValidator as default };
//# sourceMappingURL=custom.js.map
