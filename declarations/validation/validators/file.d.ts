import BaseValidator from './base.ts';
import type { Binding } from '../../';
import type { BaseOptions, Computable, ValidateFnResponse } from '../types.ts';
export type FileOptions = {
    /**
     * Accepted file types, e.g. ['png', '.jpeg', 'image/*'].
     */
    acceptedTypes?: string[];
    /**
     * Unaccepted file types, e.g. ['png', '.jpeg', 'image/*'].
     */
    unacceptedTypes?: string[];
} & BaseOptions;
export default class FileValidator<T extends File[] | File, Model extends object, Context extends object = Record<string, unknown>> extends BaseValidator<T, Model, Context, FileOptions> {
    defaultOptions: {};
    constructor(binding: Binding<Model>, options: Computable<Context, FileOptions>, context: Context);
    validate(value: T, options: FileOptions): ValidateFnResponse;
    extractFileExtension(file: File): string;
    checkMimeType(type: string, fileType: string): boolean;
    formatTypeValidations(types: string[]): string;
    fileIsAllowed(value: File, options: string[]): boolean;
    checkFileIsAccepted(value: File, options: FileOptions): ValidateFnResponse;
    checkFileIsUnaccepted(value: File, options: FileOptions): ValidateFnResponse;
}
