import { assert } from '@ember/debug';
import { isEmpty } from '@ember/utils';

import BaseValidator from './base.ts';

import type { Binding } from '../../index.ts';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types.ts';

export type FileOptions = {
  /**
   * Accepted file types, e.g. `['png', '.jpeg', 'image/*']`.
   */
  acceptedTypes?: string[];
  /**
   * Unaccepted file types, e.g. `['png', '.jpeg', 'image/*']`.
   */
  unacceptedTypes?: string[];
} & BaseOptions;

export default class FileValidator<
  Context extends object = Record<string, unknown>,
> extends BaseValidator<File | File[], Context, FileOptions> {
  defaultOptions = {};

  constructor(
    binding: Binding,
    options: Computable<Context, FileOptions>,
    context?: Context,
  ) {
    super(binding, options, context);

    const { acceptedTypes, unacceptedTypes } = options;

    if (isEmpty(acceptedTypes) && isEmpty(unacceptedTypes)) {
      assert(
        'FileValidator requires either `acceptedTypes` or `unacceptedTypes` to be provided',
      );
    }
  }

  validate(value: File | File[], options: FileOptions): ValidateFnResponse {
    const { acceptedTypes, unacceptedTypes } = options;
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

  extractFileExtension(file: File): string {
    return file.name.split('.').pop()?.toLowerCase() ?? '';
  }

  checkMimeType(type: string, fileType: string): boolean {
    if (type.endsWith('/*')) {
      return type.split('/')[0] === fileType.split('/')[0];
    }
    return type === fileType;
  }

  formatTypeValidations(types: string[]): string {
    const typePrefixes = [];
    for (const type of types) {
      if (type.includes('/')) {
        const prefix = type.split('/')[0];
        typePrefixes.push(this.intl.t(`nrg.validation.file.${prefix}`));
      } else {
        typePrefixes.push(type);
      }
    }
    return this.intl.formatList(typePrefixes, { style: 'narrow' });
  }

  fileIsAllowed(value: File, options: string[]): boolean {
    const fileExtension = this.extractFileExtension(value);
    return options.some(
      (option) =>
        option.split('.').pop()?.toLowerCase() === fileExtension ||
        option.toLowerCase() === fileExtension ||
        this.checkMimeType(option, value.type),
    );
  }

  checkFileIsAccepted(value: File, options: FileOptions): ValidateFnResponse {
    let acceptedTypes = options.acceptedTypes as string[];
    const typeIsAllowed = this.fileIsAllowed(value, acceptedTypes);

    if (!typeIsAllowed) {
      for (const acceptedType of acceptedTypes) {
        if (acceptedType.endsWith('/*')) {
          acceptedTypes = acceptedTypes.filter((type) => type !== acceptedType);
          acceptedTypes.push(acceptedType);
        }
      }
      const types = this.formatTypeValidations(acceptedTypes);
      return { key: 'nrg.validation.file.acceptedTypes', types };
    }
    return true;
  }

  checkFileIsUnaccepted(value: File, options: FileOptions): ValidateFnResponse {
    let unacceptedTypes = options.unacceptedTypes as string[];
    const typeIsNotAllowed = this.fileIsAllowed(value, unacceptedTypes);

    if (typeIsNotAllowed) {
      for (const unacceptedType of unacceptedTypes) {
        if (unacceptedType.endsWith('/*')) {
          unacceptedTypes = unacceptedTypes.filter(
            (type) => type !== unacceptedType,
          );
          unacceptedTypes.push(unacceptedType);
        }
      }
      const types = this.formatTypeValidations(unacceptedTypes);
      return { key: 'nrg.validation.file.unacceptedTypes', types };
    }

    return true;
  }
}
