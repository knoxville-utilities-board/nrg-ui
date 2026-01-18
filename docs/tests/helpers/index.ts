import { setupIntl } from 'ember-intl/test-support';
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
} from 'ember-qunit';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

import type { ValidateFnResponse } from '@nrg-ui/core/validation/types';
import type { SetupTestOptions } from 'ember-qunit';

declare global {
  interface Assert {
    isValid: (result: ValidateFnResponse, message?: string) => void;
    isWarning: (result: ValidateFnResponse, warning?: string, message?: string) => void;
    isInvalid: (result: ValidateFnResponse, error?: string, message?: string) => void;
    isDisabled: (result: ValidateFnResponse, message?: string) => void;
  }
}

// This file exists to provide wrappers around ember-qunit's
// test setup functions. This way, you can easily extend the setup that is
// needed per test type.

function setupApplicationTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupApplicationTest(hooks, options);

  // Additional setup for application tests can be done here.
  //
  // For example, if you need an authenticated session for each
  // application test, you could do:
  //
  // hooks.beforeEach(async function () {
  //   await authenticateSession(); // ember-simple-auth
  // });
  //
  // This is also a good place to call test setup functions coming
  // from other addons:
  //
  // setupIntl(hooks, 'en-us'); // ember-intl
  // setupMirage(hooks); // ember-cli-mirage
}

function setupRenderingTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupRenderingTest(hooks, options);

  // Additional setup for rendering tests can be done here.
  setupIntl(hooks, 'en-us', translationsForEnUs);
}

function setupTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupTest(hooks, options);

  hooks.beforeEach(function (assert) {
    assert.isValid = (result, message) => {
      assert.deepEqual(
        result,
        {
          isValid: true,
          isWarning: false,
          message: undefined,
        },
        message,
      );
    };

    assert.isWarning = (result, warning, message) => {
      assert.deepEqual(
        result,
        {
          isValid: false,
          isWarning: true,
          message: warning,
        },
        message,
      );
    };

    assert.isInvalid = (result, error, message) => {
      assert.deepEqual(
        result,
        {
          isValid: false,
          isWarning: false,
          message: error,
        },
        message,
      );
    };

    assert.isDisabled = (result, message) => {
      assert.deepEqual(
        result,
        {
          isValid: true,
        },
        message,
      );
    };
  });

  // Additional setup for unit tests can be done here.
}

export { setupApplicationTest, setupRenderingTest, setupTest };
