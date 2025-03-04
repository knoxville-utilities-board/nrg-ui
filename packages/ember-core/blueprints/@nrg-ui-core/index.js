/* eslint-env node */
'use strict';

module.exports = {
  description:
    'The default blueprint for @nrg-ui/core. This runs when you run `ember install @nrg-ui/core` in your project.',
  shouldTransformTypeScript: true,

  async afterInstall() {
    await this.removePackagesFromProject([{ name: 'ember-welcome-page' }]);
    await this.addPackagesToProject([
      { name: '@nrg-ui/css' },
      { name: '@nrg-ui/version' },
      { name: 'ember-concurrency', target: '^4.0.3' },
    ]);
  },

  /* The blueprint base verifies that an entity name is passed to the
   * blueprint. This is not necessary for this blueprint, so we want
   * to bypass it.
   */
  normalizeEntityName() {},

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
