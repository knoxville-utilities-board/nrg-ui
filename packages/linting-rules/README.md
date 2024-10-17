# @nrg-ui/lint

This package contains the linting rules for the NRG UI project. It can be imported into any project to enforce the same linting rules.

A sample `.eslintrc.js` file is provided below:

```js
const config = require('@nrg-ui/lint');

module.exports = {
  ...config.init(),
  rules: {
    ...config.rules.base(),
  },
  overrides: [
    config.overrides.js(),
    config.overrides.ts(),
    config.overrides.gjs(),
    config.overrides.gts(),
    config.overrides.scripts([
      './.eslintrc.cjs',
      './.prettierrc.cjs',
      './.template-lintrc.cjs',
      './addon-main.cjs',
    ]),
  },
};
```
