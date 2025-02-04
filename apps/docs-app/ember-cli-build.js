'use strict';
/* eslint-disable @typescript-eslint/no-require-imports */

const sideWatch = require('@embroider/broccoli-side-watch');
const { getVersion } = require('@nrg-ui/version');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = async function (defaults) {
  const app = new EmberApp(defaults, {
    minifyCSS: {
      enabled: false,
    },
    'ember-cli-babel': { enableTypeScriptTransform: true },
    trees: {
      app: sideWatch('app', {
        watching: ['@nrg-ui/core', '@nrg-ui/css'],
      }),
    },
    '@embroider/macros': {
      setConfig: {
        'ember-css-transitions': {
          useTestWaiters: true,
        },
        '@nrg-ui/core': {
          appVersion: getVersion(),
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

  if (app.env !== 'production') {
    app.options['@embroider/macros']['setConfig']['@nrg-ui/core'][
      'appVersion'
    ] = 'version-v1';
  }

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

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack);
};
