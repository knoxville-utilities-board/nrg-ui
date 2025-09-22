import { eslint, merge } from '@nrg-ui/standards';

export default await merge(
  eslint.rules.ignore(['blueprints/*/files/']),
  eslint.rules.base(),
  eslint.rules.ember(),
  eslint.rules.js(),
  eslint.rules.ts(),
);
