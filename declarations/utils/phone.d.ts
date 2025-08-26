/** A phone number with a 1-4 digit line number */
export declare const lineNumberInput: RegExp;
/** A phone number with a 1-3 digit exchange code */
export declare const exchangeCodeInput: RegExp;
/** A phone number with a 1-3 digit area code */
export declare const areaCodeInput: RegExp;
/** A phone number with a 1-3 digit country code */
export declare const countryCodeInput: RegExp;
/** Any phone number longer than 13 digits */
export declare const invalidInput: RegExp;
/** Format a 4 digit phone number */
export declare const lineNumberOutput = "$1";
/** Format a 7 digit phone number */
export declare const exchangeCodeOutput = "$1-$2";
/** Format a 10 digit phone number */
export declare const areaCodeOutput = "($1) $2-$3";
/** Format an 11 to 13 digit phone number */
export declare const countryCodeOutput = "+$1 ($2) $3-$4";
/** Format a phone number with an invalid length (over 13 digits) */
export declare const invalidOutput = "+$1 ($2) $3-$4 \"$5\"";
export declare function hasLineNumber(value: string): boolean;
export declare function getLineNumber(value: string): string;
export declare function hasExchangeCode(value: string): boolean;
export declare function getExchangeCode(value: string): string;
export declare function hasAreaCode(value: string): boolean;
export declare function getAreaCode(value: string): string;
export declare function hasCountryCode(value: string): boolean;
export declare function getCountryCode(value: string): string;
export declare function format(value: string): string;
declare const _default: {
    lineNumberInput: RegExp;
    exchangeCodeInput: RegExp;
    areaCodeInput: RegExp;
    countryCodeInput: RegExp;
    lineNumberOutput: string;
    exchangeCodeOutput: string;
    areaCodeOutput: string;
    countryCodeOutput: string;
    hasLineNumber: typeof hasLineNumber;
    getLineNumber: typeof getLineNumber;
    hasExchangeCode: typeof hasExchangeCode;
    getExchangeCode: typeof getExchangeCode;
    hasAreaCode: typeof hasAreaCode;
    getAreaCode: typeof getAreaCode;
    hasCountryCode: typeof hasCountryCode;
    getCountryCode: typeof getCountryCode;
    format: typeof format;
};
export default _default;
