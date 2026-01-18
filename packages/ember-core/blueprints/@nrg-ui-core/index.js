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
    await this.removePackagesFromProject([
      // TODO: Remove before 1.0.0
      { name: 'ember-responsive' },
      { name: 'ember-welcome-page' },
    ]);
    await this.addPackagesToProject([
      { name: '@ember/string', target: '^4.0.0' },
      { name: '@embroider/legacy-inspector-support', target: '^0.1.3' },
      { name: '@embroider/macros' },
      { name: '@nrg-ui/css' },
      { name: '@nrg-ui/version' },
      { name: 'dayjs', target: '^1.11.13' },
      { name: 'ember-cli-deprecation-workflow', target: '^3.3.0' },
      { name: 'ember-concurrency', target: '^5.1.0' },
      { name: 'ember-css-transitions', target: '^4.4.0' },
      { name: 'ember-intl', target: '^8.0.0' },
      { name: 'ember-keyboard', target: '^9.0.2' },
      { name: 'ember-lifeline', target: '^7.0.0' },
      { name: 'ismobilejs', target: '^1.1.1' },
      { name: '@ember-intl/vite', target: '^0.4.0' },
    ]);

    this.ui.writeLine(prefix + chalk.green('Configuring ember-intl...'));

    await this.insertIntoFile(
      'vite.config.mjs',
      `import { loadTranslations } from '@ember-intl/vite';`,
    );
    await this.insertIntoFile('vite.config.mjs', `loadTranslations(),`, {
      after: 'plugins: [',
    });
    await this.insertIntoFile('tsconfig.json', `"@ember-intl/vite/virtual"`, {
      after: /"types": \[[^\]*]/,
    });

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

  locals({ isTypeScriptProject }) {
    const environment = require(join(cwd(), 'config', 'environment.js'));
    const { modulePrefix } = environment();

    return {
      isTypeScriptProject,
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
