import { eslint, merge } from '@nrg-ui/standards';

export default await merge(
  eslint.rules.ignore(),
  eslint.rules.base(),
  eslint.rules.js(),
  eslint.rules.ts(),
);
