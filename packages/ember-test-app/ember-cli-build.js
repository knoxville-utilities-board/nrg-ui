'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': { enableTypeScriptTransform: true },
    autoImport: {
      watchDependencies: ['@nrg-ui/ember', '@nrg-ui/css'],
    },
  });

  app.import('node_modules/@nrg-ui/css/dist/main.css');

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app);
};
