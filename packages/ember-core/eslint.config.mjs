import config from '@nrg-ui/lint';

const builtConfig = {
  // ...config.init(),
  rules: {
    ...config.rules.base(),
  },
  overrides: [
    ...config.overrides.js(),
    ...config.overrides.ts(),
    ...config.overrides.gjs(),
    ...config.overrides.gts(),
    ...config.overrides.scripts([
      './.eslintrc.cjs',
      './.prettierrc.cjs',
      './.template-lintrc.cjs',
      './addon-main.cjs',
    ]),
  ],
};

console.log(builtConfig);

export default builtConfig;
