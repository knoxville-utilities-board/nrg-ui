import { eslint, merge } from '@nrg-ui/standards';

export default await merge(
  eslint.rules.ignore([
    '/blueprints/*/files/',
    '/coverage/',
    '!.*',
    '.*/',
    '/.node_modules.ember-try/',
  ]),
  eslint.rules.base(),
  eslint.rules.js(),
  eslint.rules.ts(),
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
