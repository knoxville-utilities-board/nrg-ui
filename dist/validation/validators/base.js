import ArrayProxy from '@ember/array/proxy';
import { assert } from '@ember/debug';
import { get } from '@ember/object';
import ObjectProxy from '@ember/object/proxy';
import { getOwner } from '@ember/owner';
import { cached } from '@glimmer/tracking';
import { n } from 'decorator-transforms/runtime';

function isProxy(value) {
  return value instanceof ObjectProxy || value instanceof ArrayProxy;
}
function unwrapProxy(value) {
  if (isProxy(value)) {
    return unwrapProxy(value.content);
  }
  return value;
}
class BaseValidator {
  defaultOptions = {};
  owner;
  binding;
  options;
  context;
  constructor(binding, options, context) {
    this.binding = binding;
    this.options = options;
    this.context = context ?? binding.model;
    assert(`You must provide a binding argument to ${this.constructor.name}`, binding);
    assert('BaseValidator requires the `validate` function to be implemented by subclasses', typeof this.validate === 'function');
    const owner = getOwner(this.context);
    assert('The `context` or `model` must be have an owner. Usually this means the `context` or `model` is an EmberObject or GlimmerComponent, but this can be manually set up with `setOwner`', owner !== undefined);
    this.owner = owner;
  }
  get intl() {
    return this.owner.lookup('service:intl');
  }
  get value() {
    const {
      model,
      valuePath
    } = this.binding;
    const value = get(model, valuePath);
    return unwrapProxy(value);
  }
  get result() {
    const {
      context,
      options,
      validate,
      value
    } = this;
    const computedOptions = this.computeOptions(options);
    if (computedOptions.disabled) {
      return {
        isValid: true
      };
    }
    const response = validate.apply(this, [value, computedOptions, context]);
    return this.coalesceResponse(response, computedOptions);
  }
  static {
    n(this.prototype, "result", [cached]);
  }
  coalesceResponse(response, options) {
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
      const translationOptions = {
        ...options
      };
      if (typeof response === 'object') {
        Object.assign(translationOptions, response);
      }
      message = this.translateMessage({
        ...translationOptions,
        key: options.key
      });
    } else if (options.message) {
      message = options.message;
    } else if (typeof response === 'object') {
      message = response.message;
      if ('key' in response && response.key) {
        message = this.translateMessage({
          ...options,
          ...response
        });
      }
    }
    if (isValid && !isWarning) {
      message = undefined;
    }
    return {
      isValid,
      isWarning,
      message
    };
  }
  translateMessage(message) {
    const {
      key,
      ...options
    } = message;
    return this.intl.t(key, options);
  }
  computeOptions(options) {
    const {
      defaultOptions
    } = this;
    const computed = {};
    for (const key of Object.keys(options)) {
      computed[key] = this.compute(options[key]);
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
      computed[key] = this.compute(defaultOptions[key]);
    }
    return {
      ...computed
    };
  }
  compute(value) {
    if (typeof value === 'function') {
      return value.apply(this.context);
    }
    return value;
  }
}

export { BaseValidator as default, isProxy, unwrapProxy };
//# sourceMappingURL=base.js.map
