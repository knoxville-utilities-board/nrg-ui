import BaseValidator from './base.ts';
import type { BaseOptions, ValidateFnResponse } from '../types';
export type EmailOptions = {
    /**
     * If `true`, the value can be an empty string, null, or undefined.
     */
    allowBlank?: boolean;
    /**
     * If provided, the value must not use any of the domains in the list.
     *
     * Note that subdomains are not supported.
     */
    invalidDomains?: string[];
    /**
     * If provided, the value must use one of the domains in the list.
     *
     * Note that subdomains are not supported.
     */
    validDomains?: string[];
} & BaseOptions;
/** TODO Add support for subdomains */
export default class EmailValidator<Context extends object = Record<string, unknown>> extends BaseValidator<string | null | undefined, Context, EmailOptions> {
    validate(value: string | null | undefined, options: EmailOptions): ValidateFnResponse;
    listToString(value: string[]): string;
}
