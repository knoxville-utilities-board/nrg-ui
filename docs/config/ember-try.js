'use strict';

module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      {
        name: 'ember-5.9',
        npm: {
          devDependencies: {
            'ember-source': '~5.9.0',
          },
        },
      },
      {
        name: 'ember-lts-5.12',
        npm: {
          devDependencies: {
            'ember-source': '~5.12.0',
          },
        },
      },
      {
        name: 'ember-6.0',
        npm: {
          devDependencies: {
            'ember-source': '~6.0.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': 'latest',
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': 'beta',
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': 'alpha',
          },
        },
      },
    ],
  };
};
