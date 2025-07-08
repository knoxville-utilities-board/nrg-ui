'use strict';
/* eslint-disable @typescript-eslint/no-require-imports */

const sideWatch = require('@embroider/broccoli-side-watch');
const { compatBuild } = require('@embroider/compat');
const { getTag } = require('@nrg-ui/version');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const version = getTag({ tagPattern: /v?(.+)-@nrg-ui\/core/ });

module.exports = async function (defaults) {
  const { buildOnce } = await import('@embroider/vite');

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

  return compatBuild(app, buildOnce, {
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
  });
};
