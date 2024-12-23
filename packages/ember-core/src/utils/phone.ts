/** A phone number with a 1-4 digit line number */
export const lineNumberInput = /^(\d{1,4})$/;

/** A phone number with a 1-3 digit exchange code */
export const exchangeCodeInput = /^(\d{1,3})(\d{4})$/;

/** A phone number with a 1-3 digit area code */
export const areaCodeInput = /^(\d{1,3})(\d{3})(\d{4})$/;

/** A phone number with a 1-3 digit country code */
export const countryCodeInput = /^(\d{1,3})(\d{3})(\d{3})(\d{4})$/;

/** Any phone number longer than 13 digits */
export const invalidInput = /^(\d{3})(\d{3})(\d{3})(\d{4})(\d+)$/;

/** Format a 4 digit phone number */
export const lineNumberOutput = '$1';

/** Format a 7 digit phone number */
export const exchangeCodeOutput = '$1-$2';

/** Format a 10 digit phone number */
export const areaCodeOutput = '($1) $2-$3';

/** Format an 11 to 13 digit phone number */
export const countryCodeOutput = '+$1 ($2) $3-$4';

/** Format a phone number with an invalid length (over 13 digits) */
export const invalidOutput = '+$1 ($2) $3-$4 "$5"';

export function hasLineNumber(value: string): boolean {
  return lineNumberInput.test(value);
}

export function getLineNumber(value: string): string {
  return lineNumberInput.exec(value)?.[1] ?? '';
}

export function hasExchangeCode(value: string): boolean {
  return exchangeCodeInput.test(value);
}

export function getExchangeCode(value: string): string {
  return exchangeCodeInput.exec(value)?.[1] ?? '';
}

export function hasAreaCode(value: string): boolean {
  return areaCodeInput.test(value);
}

export function getAreaCode(value: string): string {
  return areaCodeInput.exec(value)?.[1] ?? '';
}

export function hasCountryCode(value: string): boolean {
  return countryCodeInput.test(value);
}

export function getCountryCode(value: string): string {
  return countryCodeInput.exec(value)?.[1] ?? '';
}

export function format(value: string) {
  const unformattedValue = value.replace(/\D/g, '');

  if (unformattedValue.length <= 7) {
    return unformattedValue.replace(exchangeCodeInput, exchangeCodeOutput);
  }

  if (unformattedValue.length <= 10) {
    return unformattedValue.replace(areaCodeInput, areaCodeOutput);
  }

  if (unformattedValue.length <= 13) {
    return unformattedValue.replace(countryCodeInput, countryCodeOutput);
  }

  return unformattedValue.replace(invalidInput, invalidOutput);
}

export default {
  lineNumberInput,
  exchangeCodeInput,
  areaCodeInput,
  countryCodeInput,
  lineNumberOutput,
  exchangeCodeOutput,
  areaCodeOutput,
  countryCodeOutput,
  hasLineNumber,
  getLineNumber,
  hasExchangeCode,
  getExchangeCode,
  hasAreaCode,
  getAreaCode,
  hasCountryCode,
  getCountryCode,
  format,
};
