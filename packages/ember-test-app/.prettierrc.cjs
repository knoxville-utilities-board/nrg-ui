'use strict';

module.exports = {
  plugins: ['prettier-plugin-ember-template-tag'],
  singleQuote: true,
  overrides: [
    {
      files: ['*.html', '*.hbs'],
      options: {
        singleQuote: false,
        parser: 'glimmer',
      },
    },
    {
      files: '*.{js,ts,gjs,gts}',
      options: {
        singleQuote: true,
        templateSingleQuote: false,
      },
    },
    {
      files: '*.{css,scss}',
      options: {
        singleQuote: false,
      },
    },
  ],
};
