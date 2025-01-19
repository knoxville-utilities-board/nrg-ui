'use strict';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    minifyCSS: {
      enabled: false,
    },
    'ember-cli-babel': { enableTypeScriptTransform: true },
    autoImport: {
      watchDependencies: ['@nrg-ui/core', '@nrg-ui/css'],
    },
    '@embroider/macros': {
      setConfig: {
        'ember-css-transitions': {
          useTestWaiters: true,
        },
        '@nrg-ui/core': {
          appVersion: 'version-v1',
        },
      },
    },
    babel: {
      plugins: [
        // ... any other plugins
        require.resolve('ember-concurrency/async-arrow-task-transform'),

        // NOTE: put any code coverage plugins last, after the transform.
      ],
    },
  });

  app.import('node_modules/@nrg-ui/css/dist/main.css');
  app.import(
    'node_modules/@nrg-ui/css/dist/assets/icons/fonts/bootstrap-icons.woff',
    {
      destDir: 'assets/fonts',
    },
  );
  app.import(
    'node_modules/@nrg-ui/css/dist/assets/icons/fonts/bootstrap-icons.woff2',
    {
      destDir: 'assets/fonts',
    },
  );

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app);
};
