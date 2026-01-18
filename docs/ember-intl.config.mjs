export default {
  addonPaths: ['node_modules/@nrg-ui/core'],
  lintRules: {
    'no-unused-keys': {
      // This key is used in testing
      ignores: ['greeting'],
    },
  },
};
