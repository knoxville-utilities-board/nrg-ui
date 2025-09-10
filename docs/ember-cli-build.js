'use strict';
/* eslint-disable @typescript-eslint/no-require-imports */

const sideWatch = require('@embroider/broccoli-side-watch');
const { getTag } = require('@nrg-ui/version');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const version = getTag({ tagPattern: /v?(.+)-@nrg-ui\/core/ });

module.exports = async function (defaults) {
  const app = new EmberApp(defaults, {
    minifyCSS: {
      enabled: false,
    },
    emberData: {
      deprecations: {
        // New projects can safely leave this deprecation disabled.
        // If upgrading, to opt-into the deprecated behavior, set this to true and then follow:
        // https://deprecations.emberjs.com/id/ember-data-deprecate-store-extends-ember-object
        // before upgrading to Ember Data 6.0
        DEPRECATE_STORE_EXTENDS_EMBER_OBJECT: false,
      },
    },
    'ember-cli-babel': { enableTypeScriptTransform: true },
    trees: {
      app: sideWatch('app', {
        watching: ['@nrg-ui/core', '@nrg-ui/css'],
      }),
    },

    // Add options here
    '@embroider/macros': {
      setConfig: {
        'ember-css-transitions': {
          useTestWaiters: true,
        },
        '@nrg-ui/core': {
          appVersion: version,
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

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticEmberSource: true,
    staticAddonTrees: true,
    staticAddonTestSupportTrees: true,
    packagerOptions: {
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: 'asset/resource',
              generator: {
                filename: 'assets/fonts/[name].[hash][ext]',
              },
            },
            {
              test: /\.(svg)/,
              type: 'asset/resource',
              generator: {
                filename: 'assets/[name].[hash][ext][query]',
              },
            },
          ],
        },
      },
    },
    packageRules: [
      {
        package: 'ember-table',
        dependencies: {
          '@ember/string': '*',
        },
      },
    ],
  });
};
