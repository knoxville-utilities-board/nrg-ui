import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/ember/helpers/bind';
import {
  validator as buildValidator,
  LengthValidator,
} from '@nrg-ui/ember/validation';
import { setupIntl } from 'ember-intl/test-support';
import { setupTest } from 'ember-test-app/tests/helpers';
import { module, test } from 'qunit';

import type { TestContext as TC } from '@ember/test-helpers';
import type { Binding } from '@nrg-ui/ember';

class Model {
  @tracked
  field?: ArrayLike<unknown>;
}

declare type TestContext = {
  binding: Binding<Model>;
  model: Model;
} & TC;

module('Unit | Validator | length', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.model = new Model();
    this.binding = bind(this.model, 'field');

    setOwner(this.model, this.owner);
  });

  test('some option is required', function (this: TestContext, assert) {
    assert.expect(1);

    assert.throws(() => {
      const validator = new LengthValidator(this.binding, {}, this.model);
      const result = validator.result;

      assert.notOk(
        true,
        'Expected an error, but got a result instead: ' + result,
      );
    }, new Error('Assertion Failed: LengthValidator requires either `is`, `min`, `max`, or `between` to be provided'));
  });

  test('`allowBlank` option works', function (this: TestContext, assert) {
    let validator = new LengthValidator(
      this.binding,
      { allowBlank: true, is: 5 },
      this.model,
    );

    this.model.field = [];
    let result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    validator = new LengthValidator(
      this.binding,
      { allowNone: false, is: 5 },
      this.model,
    );

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must have 5 values (has 0)',
    });
  });

  test('`allowNone` option works', function (this: TestContext, assert) {
    let validator = new LengthValidator(
      this.binding,
      { allowNone: false, is: 5 },
      this.model,
    );

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field is invalid',
    });

    validator = new LengthValidator(
      this.binding,
      { allowNone: true, is: 5 },
      this.model,
    );

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`is` option works', function (this: TestContext, assert) {
    const validator = new LengthValidator(this.binding, { is: 5 }, this.model);

    this.model.field = Array.from(Array(10).keys());

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must have 5 values (has 10)',
    });

    this.model.field = Array.from(Array(5).keys());

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`min` option works', function (this: TestContext, assert) {
    const validator = new LengthValidator(
      this.binding,
      { min: 10 },
      this.model,
    );

    this.model.field = Array.from(Array(5).keys());

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must have at least 10 values (has 5)',
    });

    this.model.field = 'A'.repeat(5);

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be at least 10 characters (has 5)',
    });

    this.model.field = Array.from(Array(10).keys());

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = 'A'.repeat(10);

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`max` option works', function (this: TestContext, assert) {
    const validator = new LengthValidator(this.binding, { max: 5 }, this.model);

    this.model.field = Array.from(Array(10).keys());

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must have at most 5 values (has 10)',
    });

    this.model.field = 'A'.repeat(10);

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be at most 5 characters (has 10)',
    });

    this.model.field = Array.from(Array(5).keys());

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = 'A'.repeat(5);

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`between` option works', function (this: TestContext, assert) {
    const validator = new LengthValidator(
      this.binding,
      { between: [5, 10] },
      this.model,
    );

    this.model.field = Array.from(Array(4).keys());

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must have between 5 and 10 values (has 4)',
    });

    this.model.field = 'A'.repeat(4);

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be between 5 and 10 characters (has 4)',
    });

    this.model.field = Array.from(Array(11).keys());

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must have between 5 and 10 values (has 11)',
    });

    this.model.field = 'A'.repeat(11);

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be between 5 and 10 characters (has 11)',
    });

    this.model.field = Array.from(Array(5).keys());

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = 'A'.repeat(5);

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('works with `validator` function', function (this: TestContext, assert) {
    const builder = buildValidator('length', {
      between: [5, 10],
    });
    const validator = builder(this.binding, this.model);

    this.model.field = Array.from(Array(4).keys());

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must have between 5 and 10 values (has 4)',
    });

    this.model.field = 'A'.repeat(4);

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be between 5 and 10 characters (has 4)',
    });

    this.model.field = Array.from(Array(11).keys());

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must have between 5 and 10 values (has 11)',
    });

    this.model.field = 'A'.repeat(11);

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be between 5 and 10 characters (has 11)',
    });

    this.model.field = Array.from(Array(5).keys());

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = 'A'.repeat(5);

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });
});
