import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/ember/helpers/bind';
import {
  validator as buildValidator,
  RangeValidator,
} from '@nrg-ui/ember/validation';
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

module('Unit | Validator | range', function (hooks) {
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
      const validator = new RangeValidator(this.binding, {}, this.model);
      const result = validator.result;

      assert.notOk(
        true,
        'Expected an error, but got a result instead: ' + result,
      );
    }, new Error('Assertion Failed: RangeValidator requires at least one of `min` and `max` to be provided'));
  });

  test('`NaN` is detected', function (this: TestContext, assert) {
    const validator = new RangeValidator(this.binding, { min: 16 }, this.model);

    this.model.field = NaN;
    const result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be a number',
    });
  });

  test('`min` option works', function (this: TestContext, assert) {
    let validator = new RangeValidator(this.binding, { min: 16 }, this.model);

    this.model.field = 15;
    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be greater than or equal to 16',
    });

    this.model.field = 16;
    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    validator = new RangeValidator(
      this.binding,
      { min: 16, minInclusive: false },
      this.model,
    );

    this.model.field = 16;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be greater than 16',
    });
  });

  test('`max` option works', function (this: TestContext, assert) {
    let validator = new RangeValidator(this.binding, { max: 16 }, this.model);

    this.model.field = 17;
    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be less than or equal to 16',
    });

    this.model.field = 16;
    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    validator = new RangeValidator(
      this.binding,
      { max: 16, maxInclusive: false },
      this.model,
    );

    this.model.field = 16;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be less than 16',
    });
  });

  test('works with `validator` function', function (this: TestContext, assert) {
    let builder = buildValidator('range', {
      max: 16,
    });
    let validator = builder(this.binding, this.model);

    this.model.field = 17;
    let result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be less than or equal to 16',
    });

    this.model.field = 16;
    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    builder = buildValidator('range', {
      max: 16,
      maxInclusive: false,
    });
    validator = builder(this.binding, this.model);

    this.model.field = 16;

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field must be less than 16',
    });
  });
});
