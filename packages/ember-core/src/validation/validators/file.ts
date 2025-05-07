import { assert } from '@ember/debug';
import { isEmpty } from '@ember/utils';

import BaseValidator from './base.ts';

import type { Binding } from '../../';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types.ts';
import type EmberArray from '@ember/array';

export type FileOptions = {
  /**
   * Accepted file types, e.g. ['png', 'jpeg'].
   */
  allowed?: string[] | EmberArray<string>;
  /**
   * Unaccepted file types, e.g. ['png', 'jpeg'].
   */
  notAllowed?: string[] | EmberArray<string>;
} & BaseOptions;

export default class FileValidator<
  T extends File[] | File,
  Model extends object,
  Context extends object = Record<string, unknown>,
> extends BaseValidator<T, Model, Context, FileOptions> {
  defaultOptions = {};

  constructor(
    binding: Binding<Model>,
    options: Computable<Context, FileOptions>,
    context: Context,
  ) {
    super(binding, options, context);

    const { allowed, notAllowed } = options;

    if (isEmpty(allowed) && isEmpty(notAllowed)) {
      assert(
        'FileValidator requires either `allowed` or `notAllowed` to be provided',
      );
    }
  }

  validate(value: T, options: FileOptions): ValidateFnResponse {
    const { allowed, notAllowed } = options;
    if (!isEmpty(allowed)) {
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

    if (!isEmpty(notAllowed)) {
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
    return false;
  }

  checkFileIsAccepted(value: File, options: FileOptions): ValidateFnResponse {
    const { allowed } = options;
    const allowedFiles = allowed as string[];
    const fileExtension = this.extractFileExtension(value);

    if (
      !allowedFiles?.some(
        (allowedType) =>
          allowedType.toLowerCase() === fileExtension ||
          this.checkMimeType(allowedType, value.type),
      )
    ) {
      const types = allowedFiles?.join(', ');
      return { key: 'nrg.validation.file.acceptedTypes', types };
    }

    return true;
  }

  checkFileIsUnaccepted(value: File, options: FileOptions): ValidateFnResponse {
    const { notAllowed } = options;
    const notAllowedFiles = notAllowed as string[];
    const fileExtension = this.extractFileExtension(value);

    if (
      notAllowedFiles?.some(
        (notAllowedType) => notAllowedType.toLowerCase() === fileExtension || this.checkMimeType(notAllowedType, value.type)
      )
    ) {
      const types = notAllowedFiles.join(', ');
      return { key: 'nrg.validation.file.unacceptedTypes', types };
    }

    return true;
  }
}
