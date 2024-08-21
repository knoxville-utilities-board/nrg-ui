export default {
  localInput: /^(\d{3})(\d{0,4})$/g,
  withAreaCodeInput: /^(\d{0,3})(\d{3})(\d{4})$/g,
  withCountryCodeInput: /^(\d{0,3})(\d{3})(\d{3})(\d{4})$/g,
  localOutput: '$1-$2',
  withAreaCodeOutput: '($1) $2-$3',
  withCountryCodeOutput: '+$1 ($2) $3-$4',
};
