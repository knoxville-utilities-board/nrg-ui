/** A phone number with a 1-4 digit line number */
export const lineNumberInput = /^(\d{1,4})$/;

/** A phone number with a 1-4 digit exchange code */
export const exchangeCodeInput = /^(\d{1,3})(\d{4})$/;

/** A phone number with a 1-3 digit area code */
export const areaCodeInput = /^(\d{1,3})(\d{3})(\d{4})$/;

/** A phone number with a 1-3 digit country code */
export const countryCodeInput = /^(\d{1,3})(\d{3})(\d{3})(\d{4})$/;

/** Format a 4 digit phone number */
export const lineNumberOutput = '$1';

/** Format a 7 digit phone number */
export const exchangeCodeOutput = '$1-$2';

/** Format a 10 digit phone number */
export const areaCodeOutput = '($1) $2-$3';

/** Format an 11 to 13 digit phone number */
export const countryCodeOutput = '+$1 ($2) $3-$4';

export default {
  lineNumberInput,
  exchangeCodeInput,
  areaCodeInput,
  countryCodeInput,
  lineNumberOutput,
  exchangeCodeOutput,
  areaCodeOutput,
  countryCodeOutput,
};
