import { eslint, merge } from '@nrg-ui/standards';

export default await merge(
  eslint.rules.ignore([
    '/blueprints/*/files/',
    '/declarations/',
    '/dist/',
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
);
