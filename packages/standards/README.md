# @nrg-ui/standards

This package contains the standards followed by the NRG UI project. It can be imported into any project to enforce the same standards.

## Usage

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

## Compatibility

Since this package uses ESLint v9, various plugins have a minimum version requirement. The following table lists the compatibility of the plugins:

| Plugin                             | Version    |
| ---------------------------------- | ---------- |
| `eslint-plugin-decorator-position` | `^5.0.2`\* |
| `eslint-plugin-ember`              | `^12.2.0`  |
| `eslint-plugin-import`             | `^2.31.0`  |
| `eslint-plugin-n`                  | `^16.0.0`  |
| `eslint-plugin-qunit`              | `^8.1.2`   |

\* The `eslint-plugin-decorator-position` does not currently have formal support for ESLint v9. However, it is still compatible with this package. As new versions are released, the compatibility will be updated.
