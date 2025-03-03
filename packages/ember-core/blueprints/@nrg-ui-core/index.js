/* eslint-env node */
'use strict';
/* eslint-disable @typescript-eslint/no-require-imports */

const { existsSync, readFileSync } = require('fs');
const { join } = require('path');

const EMBROIDER_CONFIG_CHUNK = `'@embroider/macros': {
      setConfig: {`;

module.exports = {
  description:
    'The default blueprint for @nrg-ui/core. This runs when you run `ember install @nrg-ui/core` in your project.',

  fileContents: {},

  getFileContents(fileName, options = {}) {
    Object.assign(options, {
      root: this.project.root,
      force: false,
    });

    const filePath = join(options.root, fileName);

    if (this.fileContents[filePath] && !options.force) {
      return this.fileContents[filePath];
    }

    if (!existsSync(filePath)) {
      return null;
    }

    const contents = readFileSync(filePath, { encoding: 'utf8' });
    return (this.fileContents[filePath] = contents);
  },

  async setupAppVersion() {
    const buildFileName = 'ember-cli-build.js';
    const buildFile = this.getFileContents(buildFileName);

    await this.insertIntoFile(
      'ember-cli-build.js',
      "\nconst { getVersion } = require('@nrg-ui/version');",
      {
        before: "const EmberApp = require('ember-cli/lib/broccoli/ember-app');",
      },
    );

    if (!buildFile.matches(new RegExp(EMBROIDER_CONFIG_CHUNK))) {
      await this.insertIntoFile(
        buildFileName,
        `'@embroider/macros': {
      setConfig: {`,
        {
          before: `});`,
        },
      );
    }
    await this.insertIntoFile(
      buildFileName,
      `'@nrg-ui/core': {
        appVersion: getVersion(),
      },`,
      {
        after: EMBROIDER_CONFIG_CHUNK,
      },
    );
  },

  async afterInstall() {
    await this.removePackagesFromProject([{ name: 'ember-welcome-page' }]);
    await this.addPackagesToProject([{ name: '@nrg-ui/css' }]);

    await this.setupAppVersion();

    // Dummy/test apps in addons that might use Embroider
    await this.insertIntoFile('ember-cli-build.js', BUILD_CHUNK, {
      before:
        / {2}const { maybeEmbroider } = require\('@embroider\/test-setup'\);/g,
    });

    // Apps using the classic build system
    await this.insertIntoFile('ember-cli-build.js', BUILD_CHUNK, {
      before: / {2}return app.toTree\(\);/g,
    });

    // Apps using Embroider as the build system
    await this.insertIntoFile('ember-cli-build.js', BUILD_CHUNK, {
      before: / {2}const \{ Webpack \} = require\('@embroider\/webpack'\);/g,
    });
  },

  /* The blueprint base verifies that an entity name is passed to the
   * blueprint. This is not necessary for this blueprint, so we want
   * to bypass it.
   */
  normalizeEntityName() {},
};
