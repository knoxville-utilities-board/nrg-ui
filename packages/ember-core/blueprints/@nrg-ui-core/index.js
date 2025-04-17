'use strict';

/* eslint-disable @typescript-eslint/no-require-imports */
const chalk = require('chalk');
const { existsSync, mkdirSync, renameSync, rmdirSync } = require('node:fs');
const { join } = require('node:path');
const { cwd } = require('node:process');

const APP = 'app';
const prefix = chalk.blue('[@nrg-ui/core] ');

module.exports = {
  description:
    'The default blueprint for @nrg-ui/core. This runs when you run `ember install @nrg-ui/core` in your project.',
  shouldTransformTypeScript: true,

  async afterInstall() {
    await this.removePackagesFromProject([{ name: 'ember-welcome-page' }]);
    await this.addPackagesToProject([
      { name: '@ember/string', target: '^3.1.1' },
      { name: '@embroider/macros' },
      { name: '@nrg-ui/css' },
      { name: '@nrg-ui/version' },
      { name: 'dayjs', target: '^1.11.13' },
      { name: 'ember-concurrency', target: '^4.0.0' },
      { name: 'ember-css-transitions', target: '^4.4.0' },
      { name: 'ember-intl', target: '^7.0.0' },
      { name: 'ember-keyboard', target: '^8.2.0' },
      { name: 'ember-lifeline', target: '^7.0.0' },
      { name: 'ember-responsive', target: '^5.0.0' },
      { name: 'ismobilejs', target: '^1.1.1' },
    ]);

    this.ui.writeLine(prefix + chalk.green('Configuring assets...'));

    const stylesDir = join(APP, 'styles');
    const assetsDir = join(APP, 'assets');
    const cssDir = join(assetsDir, 'css');
    const defaultCss = join(stylesDir, 'app.css');

    mkdirSync(cssDir, { recursive: true });
    if (existsSync(defaultCss)) {
      renameSync(defaultCss, join(cssDir, 'app.css'));
    }

    try {
      rmdirSync(stylesDir);
    } catch {
      // The directory isn't empty or we don't have permission
    }
  },

  /* The blueprint base verifies that an entity name is passed to the
   * blueprint. This is not necessary for this blueprint, so we want
   * to bypass it.
   */
  normalizeEntityName() {},

  locals() {
    const environment = require(join(cwd(), 'config', 'environment.js'));
    const { modulePrefix } = environment();

    return {
      modulePrefix,
    };
  },

  fileMapTokens() {
    return {
      __root__() {
        return '/';
      },
      __app__() {
        return '/app/';
      },
    };
  },
};
