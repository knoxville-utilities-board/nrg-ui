# @nrg-ui/standards

This package contains the standards followed by the NRG UI project. It can be imported into any project to enforce the same standards.

A sample `eslint.config.mjs` file is provided below (it's actually the config used for this package!):

```mjs
import { eslint, merge } from '@nrg-ui/standards';

export default await merge(
  eslint.rules.ignore(),
  eslint.rules.base(),
  eslint.rules.js(),
  eslint.rules.ts(),
);
```
