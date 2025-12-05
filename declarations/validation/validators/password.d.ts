import BaseValidator from './base.ts';
import type { BaseOptions, ValidateFnResponse } from '../types.ts';
declare const CommonTests: {
    alpha: RegExp;
    upper: RegExp;
    lower: RegExp;
    numeral: RegExp;
    special: RegExp;
};
export type PasswordOptions = {
    /**
     * A list of tests to run against the password.
     * Each test must be either a regular expression or one of the following values: "alpha", "upper", "lower", "numeral", "special".
     */
    tests: (RegExp | keyof typeof CommonTests)[];
    /**
     * The minimum number of character types required from the list of `tests`.
     */
    minClasses: number;
} & BaseOptions;
export default class PasswordValidator<Context extends object = Record<string, unknown>> extends BaseValidator<string, Context, PasswordOptions> {
    defaultOptions: {
        tests: (keyof typeof CommonTests)[];
        minClasses: number;
    };
    validate(value: string, options: PasswordOptions): ValidateFnResponse;
}
export {};
