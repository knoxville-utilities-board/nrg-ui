import setupDeprecationWorkflow from 'ember-cli-deprecation-workflow';

/**
 * Docs: https://github.com/ember-cli/ember-cli-deprecation-workflow
 */
setupDeprecationWorkflow({
  /**
    false by default, but if a developer / team wants to be more aggressive about being proactive with
    handling their deprecations, this should be set to "true"
  */
  throwOnUnhandled: false,
  workflow: [
    {
      // ember-freestyle still uses `import { inject as service } from '@ember/service';`
      handler: 'silence',
      matchId: 'importing-inject-from-ember-service',
    },
  ],
});
