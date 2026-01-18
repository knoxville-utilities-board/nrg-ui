import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/core';
import { PasswordValidator } from '@nrg-ui/core/validation';
import { setupTest } from 'docs/tests/helpers';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

import type { TestContext as TC } from '@ember/test-helpers';
import type { Binding } from '@nrg-ui/core';

class Model {
  @tracked
  field?: unknown;
}

declare type TestContext = {
  binding: Binding<Model>;
  model: Model;
} & TC;

module('Unit | Validator | password', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us', translationsForEnUs);

  hooks.beforeEach(function (this: TestContext) {
    this.model = new Model();
    this.binding = bind(this.model, 'field');

    setOwner(this.model, this.owner);
  });

  test('`minClasses` cannot be greater than `tests` length', function (this: TestContext, assert) {
    assert.expect(1);

    assert.throws(() => {
      const validator = new PasswordValidator(
        this.binding,
        {
          tests: [],
          minClasses: 5,
        },
        this.model,
      );

      assert.notOk(true, 'Expected an error, but got a result instead: ' + validator.result);
    }, new Error('Assertion Failed: PasswordValidator requires `minClasses` to be less than or equal to the number of tests provided'));
  });

  test('`tests` option works', function (this: TestContext, assert) {
    assert.expect(2);

    const commonTests = {
      symbol: /[^a-zA-Z0-9]/,
      upper: /[A-Z]/,
      lower: /[a-z]/,
      numeral: /\d/,
    };

    const symbolValidator = new PasswordValidator(
      this.binding,
      {
        tests: [commonTests.symbol],
        minClasses: 1,
      },
      this.model,
    );

    this.model.field = '!@#$';
    assert.isValid(symbolValidator.result);

    const numeralValidator = new PasswordValidator(
      this.binding,
      {
        tests: [commonTests.numeral],
        minClasses: 1,
      },
      this.model,
    );

    this.model.field = 'password';
    assert.isInvalid(
      numeralValidator.result,
      'Password does not meet the minimum strength requirements',
    );
  });

  test('`minClasses` option works', function (this: TestContext, assert) {
    assert.expect(4);

    const commonTests = {
      symbol: /[^a-zA-Z0-9]/,
      upper: /[A-Z]/,
      lower: /[a-z]/,
      numeral: /\d/,
    };

    const validator = new PasswordValidator(
      this.binding,
      {
        tests: Object.values(commonTests),
        minClasses: 3,
      },
      this.model,
    );
    this.model.field = 'password';

    assert.isInvalid(validator.result, 'Password does not meet the minimum strength requirements');

    this.model.field = 'Password';

    assert.isInvalid(validator.result, 'Password does not meet the minimum strength requirements');

    this.model.field = 'Passw0rd';

    assert.isValid(validator.result);

    this.model.field = 'Passw0rd!';

    assert.isValid(validator.result);
  });
});
