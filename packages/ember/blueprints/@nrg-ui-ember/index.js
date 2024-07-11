/* eslint-env node */
'use strict';

module.exports = {
  description:
    'The default blueprint for @nrg-ui/ember. This runs when you run `ember install @nrg-ui/ember` in your project.',

  async afterInstall() {
    // TODO Add version once it's released
    // await this.addPackagesToProject([
    //   { name: '@nrg-ui/css' },
    // ]);

    await this.insertIntoFile(
      'ember-cli-build.js',
      `  app.import('node_modules/@nrg-ui/css/dist/main.css');\n`,
      {
        before:
          / {2}const { maybeEmbroider } = require\('@embroider\/test-setup'\);/g,
      },
    );
    await this.insertIntoFile(
      'ember-cli-build.js',
      `  app.import('node_modules/@nrg-ui/css/dist/main.css');\n\n`,
      {
        before: / {2}return app.toTree\(\);/g,
      },
    );
  },
};
