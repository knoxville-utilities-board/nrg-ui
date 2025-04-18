import { eslint, merge } from '@nrg-ui/standards';

export default await merge(
  eslint.rules.ignore(['/blueprints/*/files/']),
  eslint.rules.base(),
  eslint.rules.ember(),
  eslint.rules.js(),
  eslint.rules.ts({
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-nocheck': 'allow-with-description',
      },
    ],
  }),
  eslint.rules.gjs(),
  eslint.rules.gts(),
  eslint.rules.scripts([
    './.eslintrc.js',
    './.prettierrc.js',
    './.stylelintrc.js',
    './.template-lintrc.js',
    './ember-cli-build.js',
    './testem.js',
    './blueprints/*/index.js',
    './config/**/*.js',
    './lib/*/index.js',
    './server/**/*.js',
  ]),
  eslint.rules.tests(),
);
