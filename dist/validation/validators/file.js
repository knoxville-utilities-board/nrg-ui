import { assert } from '@ember/debug';
import { isEmpty } from '@ember/utils';
import { tKey } from 'ember-intl';
import BaseValidator from './base.js';

class FileValidator extends BaseValidator {
  defaultOptions = {};
  constructor(binding, options, context) {
    super(binding, options, context);
    const {
      acceptedTypes,
      unacceptedTypes
    } = options;
    if (isEmpty(acceptedTypes) && isEmpty(unacceptedTypes)) {
      assert('FileValidator requires either `acceptedTypes` or `unacceptedTypes` to be provided');
    }
  }
  validate(value, options) {
    const {
      acceptedTypes,
      unacceptedTypes
    } = options;
    if (!isEmpty(acceptedTypes)) {
      if (Array.isArray(value)) {
        for (const file of value) {
          const acceptedResponse = this.checkFileIsAccepted(file, options);
          if (acceptedResponse !== true) {
            return acceptedResponse;
          }
        }
      } else if (value instanceof File) {
        const acceptedResponse = this.checkFileIsAccepted(value, options);
        if (acceptedResponse !== true) {
          return acceptedResponse;
        }
      }
    }
    if (!isEmpty(unacceptedTypes)) {
      if (Array.isArray(value)) {
        for (const file of value) {
          const unacceptedResponse = this.checkFileIsUnaccepted(file, options);
          if (unacceptedResponse !== true) {
            return unacceptedResponse;
          }
        }
      } else if (value instanceof File) {
        const unacceptedResponse = this.checkFileIsUnaccepted(value, options);
        if (unacceptedResponse !== true) {
          return unacceptedResponse;
        }
      }
    }
    return true;
  }
  extractFileExtension(file) {
    return file.name.split('.').pop()?.toLowerCase() ?? '';
  }
  checkMimeType(type, fileType) {
    if (type.endsWith('/*')) {
      return type.split('/')[0] === fileType.split('/')[0];
    }
    return type === fileType;
  }
  formatTypeValidations(types) {
    const typePrefixes = [];
    for (const type of types) {
      if (type.includes('/')) {
        const prefix = type.split('/')[0];
        typePrefixes.push(this.intl.t(`nrg.validation.file.${prefix}`));
      } else {
        typePrefixes.push(type);
      }
    }
    return this.intl.formatList(typePrefixes, {
      style: 'narrow'
    });
  }
  fileIsAllowed(value, options) {
    const fileExtension = this.extractFileExtension(value);
    return options.some(option => option.split('.').pop()?.toLowerCase() === fileExtension || option.toLowerCase() === fileExtension || this.checkMimeType(option, value.type));
  }
  checkFileIsAccepted(value, options) {
    let acceptedTypes = options.acceptedTypes;
    const typeIsAllowed = this.fileIsAllowed(value, acceptedTypes);
    if (!typeIsAllowed) {
      for (const acceptedType of acceptedTypes) {
        if (acceptedType.endsWith('/*')) {
          acceptedTypes = acceptedTypes.filter(type => type !== acceptedType);
          acceptedTypes.push(acceptedType);
        }
      }
      const types = this.formatTypeValidations(acceptedTypes);
      return {
        key: tKey('nrg.validation.file.acceptedTypes'),
        types
      };
    }
    return true;
  }
  checkFileIsUnaccepted(value, options) {
    let unacceptedTypes = options.unacceptedTypes;
    const typeIsNotAllowed = this.fileIsAllowed(value, unacceptedTypes);
    if (typeIsNotAllowed) {
      for (const unacceptedType of unacceptedTypes) {
        if (unacceptedType.endsWith('/*')) {
          unacceptedTypes = unacceptedTypes.filter(type => type !== unacceptedType);
          unacceptedTypes.push(unacceptedType);
        }
      }
      const types = this.formatTypeValidations(unacceptedTypes);
      return {
        key: tKey('nrg.validation.file.unacceptedTypes'),
        types
      };
    }
    return true;
  }
}

export { FileValidator as default };
//# sourceMappingURL=file.js.map
