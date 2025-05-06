import { assert } from '@ember/debug';
import { isEmpty } from '@ember/utils';

import BaseValidator from './base.ts';

import type { Binding } from '../../';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types.ts';

export type FileOptions = {
  /**
   * If `true`, the value can be an empty string, null, or undefined.
   */
  allowBlank?: boolean;
  /**
   * Accepted file types, e.g. ['png', 'jpeg'].
   */
  acceptedFileTypes?: string[];
  /**
   * Unaccepted file types, e.g. ['png', 'jpeg'].
   */
  unacceptedFileTypes?: string[];
} & BaseOptions;

export default class FileValidator<
  T extends File[] | File,
  Model extends object,
  Context extends object = Record<string, unknown>,
> extends BaseValidator<T, Model, Context, FileOptions> {
  defaultOptions = {
    allowBlank: true,
    presence: true,
  };

  constructor(
    binding: Binding<Model>,
    options: Computable<Context, FileOptions>,
    context: Context,
  ) {
    super(binding, options, context);

    const { acceptedFileTypes, unacceptedFileTypes } = options;

    if (isEmpty(acceptedFileTypes) && isEmpty(unacceptedFileTypes)) {
      assert(
        'FileValidator requires either `acceptedFileTypes` or `unacceptedFileTypes` to be provided',
      );
    }
  }

  validate(value: T, options: FileOptions): ValidateFnResponse {
    const { allowBlank, acceptedFileTypes, unacceptedFileTypes } = options;

    if (isEmpty(value)) {
      if (allowBlank) {
        return true;
      }
      return { key: 'nrg.validation.file.required' };
    }

    if (!isEmpty(acceptedFileTypes)) {
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

    if (!isEmpty(unacceptedFileTypes)) {
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

  extractFileType(file: File): string {
    return file.name.split('.').pop()?.toLowerCase() ?? '';
  }

  checkFileIsAccepted(value: File, options: FileOptions): ValidateFnResponse {
    const { acceptedFileTypes } = options;
    const fileType = this.extractFileType(value);

    if (!acceptedFileTypes?.some(type => type.toLowerCase() === fileType)) {
      const types = acceptedFileTypes?.join(', ');
      return { key: 'nrg.validation.file.acceptedTypes', types };
    }

    return true;
  }

  checkFileIsUnaccepted(value: File, options: FileOptions): ValidateFnResponse {
    const { unacceptedFileTypes } = options;
    const fileType = this.extractFileType(value);

    if (unacceptedFileTypes?.some(type => type.toLowerCase() === fileType)) {
      const types = unacceptedFileTypes.join(', ');
      return { key: 'nrg.validation.file.unacceptedTypes', types };
    }

    return true;
  }
}
