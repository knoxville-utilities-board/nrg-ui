import { eslint, merge } from '@nrg-ui/standards';

export default await merge(
  eslint.rules.ignore(),
  eslint.rules.base(),
  eslint.rules.js(),
  eslint.rules.ts(),
  eslint.rules.gjs(),
  eslint.rules.gts(),
  eslint.rules.scripts([
    './.prettierrc.cjs',
    './.template-lintrc.cjs',
    './addon-main.cjs',
    './eslint.config.mjs',
  ]),
);
