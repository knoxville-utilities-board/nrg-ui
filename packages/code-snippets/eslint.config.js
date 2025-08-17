import { eslint, merge } from '@nrg-ui/standards';

export default await merge(
  eslint.rules.ignore(['coverage', 'tests/fixtures']),
  eslint.rules.base(),
  eslint.rules.js(),
  eslint.rules.ts(),
);
