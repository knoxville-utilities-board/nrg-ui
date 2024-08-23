/* eslint-env node */
'use strict';

const BUILD_CHUNK = `  app.import('node_modules/@nrg-ui/css/dist/main.css');
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
`;

module.exports = {
  description:
    'The default blueprint for @nrg-ui/ember. This runs when you run `ember install @nrg-ui/ember` in your project.',

  async afterInstall() {
    await this.addPackagesToProject([{ name: '@nrg-ui/css' }]);

    await this.insertIntoFile('ember-cli-build.js', BUILD_CHUNK, {
      before:
        / {2}const { maybeEmbroider } = require\('@embroider\/test-setup'\);/g,
    });
    await this.insertIntoFile('ember-cli-build.js', BUILD_CHUNK, {
      before: / {2}return app.toTree\(\);/g,
    });
  },
};
