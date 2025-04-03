'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-bare-strings': true,
    'require-valid-named-block-naming-format': 'kebab-case',
    'require-presentational-children': {
      additionalNonSemanticTags: ['i', 'TextInput', 'DatetimeCalendar'],
    },
  },
};
