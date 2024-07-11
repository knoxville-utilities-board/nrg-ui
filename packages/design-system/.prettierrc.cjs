'use strict';

module.exports = {
  singleQuote: true,
  overrides: [
    {
      files: '*.{css,scss}',
      options: {
        singleQuote: false,
      },
    },
  ],
};
