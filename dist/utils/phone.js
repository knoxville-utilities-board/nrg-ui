/** A phone number with a 1-4 digit line number */
const lineNumberInput = /^(\d{1,4})$/;

/** A phone number with a 1-3 digit exchange code */
const exchangeCodeInput = /^(\d{1,3})(\d{4})$/;

/** A phone number with a 1-3 digit area code */
const areaCodeInput = /^(\d{1,3})(\d{3})(\d{4})$/;

/** A phone number with a 1-3 digit country code */
const countryCodeInput = /^(\d{1,3})(\d{3})(\d{3})(\d{4})$/;

/** Any phone number longer than 13 digits */
const invalidInput = /^(\d{3})(\d{3})(\d{3})(\d{4})(\d+)$/;

/** Format a 4 digit phone number */
const lineNumberOutput = '$1';

/** Format a 7 digit phone number */
const exchangeCodeOutput = '$1-$2';

/** Format a 10 digit phone number */
const areaCodeOutput = '($1) $2-$3';

/** Format an 11 to 13 digit phone number */
const countryCodeOutput = '+$1 ($2) $3-$4';

/** Format a phone number with an invalid length (over 13 digits) */
const invalidOutput = '+$1 ($2) $3-$4 "$5"';
function hasLineNumber(value) {
  return lineNumberInput.test(value);
}
function getLineNumber(value) {
  return /(\d{1,4})$/.exec(value)?.[1] ?? '';
}
function hasExchangeCode(value) {
  return exchangeCodeInput.test(value);
}
function getExchangeCode(value) {
  return /(\d{1,3})(?:\d{4})$/.exec(value)?.[1] ?? '';
}
function hasAreaCode(value) {
  return areaCodeInput.test(value);
}
function getAreaCode(value) {
  return /(\d{1,3})(?:\d{3})(?:\d{4})$/.exec(value)?.[1] ?? '';
}
function hasCountryCode(value) {
  return countryCodeInput.test(value);
}
function getCountryCode(value) {
  return /(\d{1,3})(?:\d{3})(?:\d{3})(?:\d{4})$/.exec(value)?.[1] ?? '';
}
var phone = {
  lineNumberInput,
  exchangeCodeInput,
  areaCodeInput,
  countryCodeInput,
  lineNumberOutput,
  exchangeCodeOutput,
  areaCodeOutput,
  countryCodeOutput
};

export { areaCodeInput, areaCodeOutput, countryCodeInput, countryCodeOutput, phone as default, exchangeCodeInput, exchangeCodeOutput, getAreaCode, getCountryCode, getExchangeCode, getLineNumber, hasAreaCode, hasCountryCode, hasExchangeCode, hasLineNumber, invalidInput, invalidOutput, lineNumberInput, lineNumberOutput };
//# sourceMappingURL=phone.js.map
