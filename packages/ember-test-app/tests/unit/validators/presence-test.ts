import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/ember/helpers/bind';
import { PresenceValidator } from '@nrg-ui/ember/validation/index';
import { setupIntl } from 'ember-intl/test-support';
import { setupTest } from 'ember-test-app/tests/helpers';
import { module, test } from 'qunit';

import type { TestContext as TC } from '@ember/test-helpers';
import type { types } from '@nrg-ui/ember';

class Model {
  @tracked
  field?: unknown;
}

declare type TestContext = {
  binding: types.Binding;
  model: Model;
} & TC;

module('Unit | Validator | inclusion', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.model = new Model();
    this.binding = bind(this.model, 'field');

    setOwner(this.model, this.owner);
  });

  test('`presence` option is required', function (this: TestContext, assert) {
    assert.expect(1);

    assert.throws(() => {
      // @ts-expect-error Testing that the `in` option is required
      const validator = new PresenceValidator(this.binding, {}, this);
      const result = validator.result;

      assert.notOk(
        true,
        'Expected an error, but got a result instead: ' + result,
      );
    }, new Error('Assertion Failed: PresenceValidator requires `presence` to be provided'));
  });

  test('`presence` option works', function (this: TestContext, assert) {
    let validator = new PresenceValidator(
      this.binding,
      { presence: true },
      this,
    );
    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field cannot be blank',
    });

    this.model.field = 'test';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = ' ';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    validator = new PresenceValidator(this.binding, { presence: false }, this);

    this.model.field = 'test';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be blank',
    });

    this.model.field = ' ';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be blank',
    });

    this.model.field = '';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`ignoreBlank` option works', function (this: TestContext, assert) {
    let validator = new PresenceValidator(
      this.binding,
      { ignoreBlank: true, presence: true },
      this,
    );
    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field cannot be blank',
    });

    this.model.field = ' ';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field cannot be blank',
    });

    this.model.field = 'test';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    validator = new PresenceValidator(
      this.binding,
      { ignoreBlank: false, presence: false },
      this,
    );

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be blank',
    });

    this.model.field = ' ';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be blank',
    });

    this.model.field = 'test';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be blank',
    });
  });
});
