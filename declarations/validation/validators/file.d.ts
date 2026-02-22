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
export default class FileValidator<Context extends object = Record<string, unknown>> extends BaseValidator<File | File[], Context, FileOptions> {
    defaultOptions: {};
    constructor(binding: Binding, options: Computable<Context, FileOptions>, context?: Context);
    validate(value: File | File[], options: FileOptions): ValidateFnResponse;
    extractFileExtension(file: File): string;
    checkMimeType(type: string, fileType: string): boolean;
    formatTypeValidations(types: string[]): string;
    fileIsAllowed(value: File, options: string[]): boolean;
    checkFileIsAccepted(value: File, options: FileOptions): ValidateFnResponse;
    checkFileIsUnaccepted(value: File, options: FileOptions): ValidateFnResponse;
}
