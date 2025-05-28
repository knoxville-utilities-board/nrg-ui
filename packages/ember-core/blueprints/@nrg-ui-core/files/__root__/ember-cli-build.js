'use strict';

const { getVersion } = require('@nrg-ui/version');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    <% if (isTypeScriptProject) {%>'ember-cli-babel': { enableTypeScriptTransform: true },<% } %>

    // Add options here
    '@embroider/macros': {
      setConfig: {
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

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticInvokables: true,
    staticEmberSource: true,
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
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
          ],
        },
      },
    },
  });
};
