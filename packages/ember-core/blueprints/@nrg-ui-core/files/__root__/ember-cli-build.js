'use strict';
/* eslint-disable @typescript-eslint/no-require-imports */

const { compatBuild } = require('@embroider/compat');
const { getVersion } = require('@nrg-ui/version');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = async function (defaults) {
  const { buildOnce } = await import('@embroider/vite');

  const app = new EmberApp(defaults, {
    emberData: {
      deprecations: {
        // New projects can safely leave this deprecation disabled.
        // If upgrading, to opt-into the deprecated behavior, set this to true and then follow:
        // https://deprecations.emberjs.com/id/ember-data-deprecate-store-extends-ember-object
        // before upgrading to Ember Data 6.0
        DEPRECATE_STORE_EXTENDS_EMBER_OBJECT: false,
      },
    },
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

  return compatBuild(app, buildOnce, {
    staticInvokables: true,
  });
};
