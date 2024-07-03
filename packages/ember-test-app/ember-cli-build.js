'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': { enableTypeScriptTransform: true },
    autoImport: {
      watchDependencies: ['ember-nrg-ui', 'design-system'],
    },
  });

  app.import('node_modules/design-system/dist/main.css');

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app);
};
