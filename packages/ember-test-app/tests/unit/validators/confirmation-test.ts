import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/ember/helpers/bind';
import {
  validator as buildValidator,
  ConfirmationValidator,
} from '@nrg-ui/ember/validation';
import { setupIntl } from 'ember-intl/test-support';
import { setupTest } from 'ember-test-app/tests/helpers';
import { module, test } from 'qunit';

import type { TestContext as TC } from '@ember/test-helpers';
import type { types } from '@nrg-ui/ember';

class Model {
  constructor() {
    this.password = 'password';
    this.passwordConfirmation = 'password';
  }

  @tracked
  password;

  @tracked
  passwordConfirmation;
}

declare type TestContext = {
  binding: types.Binding;
  model: Model;
} & TC;

module('Unit | Validator | confirmation', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.model = new Model();
    this.binding = bind(this.model, 'password');

    setOwner(this.model, this.owner);
  });

  test('`on` option is required', function (this: TestContext, assert) {
    assert.expect(1);

    assert.throws(() => {
      // @ts-expect-error Testing that the `on` option is required
      const validator = new ConfirmationValidator(this.binding, {}, this.model);
      const result = validator.result;

      assert.notOk(
        true,
        'Expected an error, but got a result instead: ' + result,
      );
    }, new Error('Assertion Failed: ConfirmationValidator requires a property name `on` to be provided'));
  });

  test('response is good when validation passes', function (this: TestContext, assert) {
    const validator = new ConfirmationValidator(
      this.binding,
      { on: 'passwordConfirmation' },
      this.model,
    );

    const result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('response is bad when validation fails', function (this: TestContext, assert) {
    let validator = new ConfirmationValidator(
      this.binding,
      { on: 'passwordConfirmation' },
      this.model,
    );

    this.model.passwordConfirmation = 'different';

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field does not match passwordConfirmation',
    });

    validator = new ConfirmationValidator(
      this.binding,
      { on: 'passwordConfirmation', label: 'Confirm Password' },
      this.model,
    );

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field does not match Confirm Password',
    });
  });

  test('works with `validator` function', function (this: TestContext, assert) {
    let builder = buildValidator('confirmation', {
      on: 'passwordConfirmation',
    });
    let validator = builder(this.binding, this.model);

    this.model.passwordConfirmation = 'different';

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field does not match passwordConfirmation',
    });

    builder = buildValidator('confirmation', {
      on: 'passwordConfirmation',
      label: 'Confirm Password',
    });
    validator = builder(this.binding, this.model);

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field does not match Confirm Password',
    });
  });
});
