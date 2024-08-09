import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/ember/helpers/bind';
import { NumberValidator } from '@nrg-ui/ember/validation/index';
import { setupIntl } from 'ember-intl/test-support';
import { setupTest } from 'ember-test-app/tests/helpers';
import { module, test } from 'qunit';

import type { TestContext as TC } from '@ember/test-helpers';
import type { types } from '@nrg-ui/ember';

class Model {
  @tracked
  field?: number | string | null;
}

declare type TestContext = {
  binding: types.Binding;
  model: Model;
} & TC;

module('Unit | Validator | number', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.model = new Model();
    this.binding = bind(this.model, 'field');

    setOwner(this.model, this.owner);
  });

  test('`allowBlank` option works', function (this: TestContext, assert) {
    let validator = new NumberValidator(
      this.binding,
      { allowBlank: false, allowNone: false },
      this.model,
    );

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be a number',
    });

    validator = new NumberValidator(
      this.binding,
      { allowBlank: false, allowNone: false },
      this.model,
    );

    this.model.field = '';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be a number',
    });

    validator = new NumberValidator(
      this.binding,
      { allowBlank: true, allowNone: false },
      this.model,
    );

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`allowNone` option works', function (this: TestContext, assert) {
    let validator = new NumberValidator(
      this.binding,
      { allowNone: false },
      this.model,
    );

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be a number',
    });

    validator = new NumberValidator(
      this.binding,
      { allowNone: false },
      this.model,
    );

    this.model.field = null;
    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be a number',
    });

    validator = new NumberValidator(
      this.binding,
      { allowNone: true },
      this.model,
    );

    this.model.field = null;
    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`allowString` option works', function (this: TestContext, assert) {
    let validator = new NumberValidator(
      this.binding,
      { allowString: false },
      this.model,
    );

    this.model.field = '5.4';

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be a number',
    });

    validator = new NumberValidator(
      this.binding,
      { allowString: true },
      this.model,
    );

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`integer` option works', function (this: TestContext, assert) {
    let validator = new NumberValidator(
      this.binding,
      { integer: true },
      this.model,
    );

    this.model.field = 17.5;

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be an integer',
    });

    this.model.field = 17;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    validator = new NumberValidator(
      this.binding,
      { integer: false },
      this.model,
    );

    this.model.field = 17.5;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = 17;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`positive` option works', function (this: TestContext, assert) {
    let validator = new NumberValidator(
      this.binding,
      { positive: true },
      this.model,
    );

    this.model.field = -17;

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be a positive number',
    });

    this.model.field = 17;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    validator = new NumberValidator(
      this.binding,
      { positive: false },
      this.model,
    );

    this.model.field = -17;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = 17;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`negative` option works', function (this: TestContext, assert) {
    let validator = new NumberValidator(
      this.binding,
      { negative: true },
      this.model,
    );

    this.model.field = 17;

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be a negative number',
    });

    this.model.field = -17;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    validator = new NumberValidator(
      this.binding,
      { negative: false },
      this.model,
    );

    this.model.field = 17;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = -17;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`even` option works', function (this: TestContext, assert) {
    let validator = new NumberValidator(
      this.binding,
      { even: true },
      this.model,
    );

    this.model.field = 17;

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be an even number',
    });

    this.model.field = 16;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    validator = new NumberValidator(this.binding, { even: false }, this.model);

    this.model.field = 17;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = 16;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`odd` option works', function (this: TestContext, assert) {
    let validator = new NumberValidator(
      this.binding,
      { odd: true },
      this.model,
    );

    this.model.field = 16;

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be an odd number',
    });

    this.model.field = 17;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    validator = new NumberValidator(this.binding, { odd: false }, this.model);

    this.model.field = 16;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = 17;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`multipleOf` option works', function (this: TestContext, assert) {
    const validator = new NumberValidator(
      this.binding,
      { multipleOf: 5 },
      this.model,
    );

    this.model.field = 16;

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be a multiple of 5',
    });

    this.model.field = 15;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });
});
