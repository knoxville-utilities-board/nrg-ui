import BaseValidator from './base.ts';
import type { BaseOptions, ValidateFnResponse } from '../types';
export type PhoneOptions = {
    /**
     * If `true`, the value can be an empty string, null, or undefined.
     */
    allowBlank?: boolean;
    /**
     * If `allow`, the number may contain an area code.
     * If `disallow`, the number must not contain an area code.
     * If `require`, the number must contain an area code.
     * @default 'allow'
     */
    areaCode?: 'allow' | 'disallow' | 'require';
    /**
     * If `allow`, the number may contain a country code.
     * If `disallow`, the number must not contain a country code.
     * If `require`, the number must contain a country code.
     * @default 'allow'
     */
    countryCode?: 'allow' | 'disallow' | 'require';
    /**
     * If provided, the area code of the number must not match any of the provided area codes.
     */
    invalidAreaCodes?: string[];
    /**
     * If provided, the country code of the number must not match any of the provided country codes.
     */
    invalidCountryCodes?: string[];
    /**
     * If provided, the exchange code of the number must not match any of the provided exchange codes.
     */
    invalidExchangeCodes?: string[];
    /**
     * If provided, the area code of the number must match one of the provided area codes.
     */
    validAreaCodes?: string[];
    /**
     * If provided, the country code of the number must match one of the provided country codes.
     */
    validCountryCodes?: string[];
    /**
     * If provided, the exchange code of the number must match one of the provided exchange codes.
     */
    validExchangeCodes?: string[];
} & BaseOptions;
export default class PhoneValidator<Context extends object = Record<string, unknown>> extends BaseValidator<string | null | undefined, Context, PhoneOptions> {
    defaultOptions: {
        areaCode: "allow";
        countryCode: "allow";
    };
    validate(value: string | null | undefined, options: PhoneOptions): ValidateFnResponse;
    checkCountryCode(value: string, options: PhoneOptions): ValidateFnResponse;
    checkAreaCode(value: string, options: PhoneOptions): ValidateFnResponse;
    checkExchangeCode(value: string, options: PhoneOptions): ValidateFnResponse;
    listToString(value: string[]): string;
}
