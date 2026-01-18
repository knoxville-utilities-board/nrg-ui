import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/core';
import { NumberValidator, validator as buildValidator } from '@nrg-ui/core/validation';
import { setupTest } from 'docs/tests/helpers';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

import type { TestContext as TC } from '@ember/test-helpers';
import type { Binding } from '@nrg-ui/core';

class Model {
  @tracked
  field?: number | string | null;
}

declare type TestContext = {
  binding: Binding<Model>;
  model: Model;
} & TC;

module('Unit | Validator | number', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us', translationsForEnUs);

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

    assert.isInvalid(validator.result, 'This field must be a number');

    validator = new NumberValidator(
      this.binding,
      { allowBlank: false, allowNone: false },
      this.model,
    );

    this.model.field = '';

    assert.isInvalid(validator.result, 'This field must be a number');

    validator = new NumberValidator(
      this.binding,
      { allowBlank: true, allowNone: false },
      this.model,
    );

    assert.isValid(validator.result);
  });

  test('`allowNone` option works', function (this: TestContext, assert) {
    let validator = new NumberValidator(this.binding, { allowNone: false }, this.model);

    assert.isInvalid(validator.result, 'This field must be a number');

    validator = new NumberValidator(this.binding, { allowNone: false }, this.model);

    this.model.field = null;

    assert.isInvalid(validator.result, 'This field must be a number');

    validator = new NumberValidator(this.binding, { allowNone: true }, this.model);

    this.model.field = null;

    assert.isValid(validator.result);
  });

  test('`allowString` option works', function (this: TestContext, assert) {
    let validator = new NumberValidator(this.binding, { allowString: false }, this.model);

    this.model.field = '5.4';

    assert.isInvalid(validator.result, 'This field must be a number');

    validator = new NumberValidator(this.binding, { allowString: true }, this.model);

    assert.isValid(validator.result);
  });

  test('`integer` option works', function (this: TestContext, assert) {
    let validator = new NumberValidator(this.binding, { integer: true }, this.model);

    this.model.field = 17.5;

    assert.isInvalid(validator.result, 'This field must be an integer');

    this.model.field = 17;

    assert.isValid(validator.result);

    validator = new NumberValidator(this.binding, { integer: false }, this.model);

    this.model.field = 17.5;

    assert.isValid(validator.result);

    this.model.field = 17;

    assert.isValid(validator.result);
  });

  test('`positive` option works', function (this: TestContext, assert) {
    let validator = new NumberValidator(this.binding, { positive: true }, this.model);

    this.model.field = -17;

    assert.isInvalid(validator.result, 'This field must be a positive number');

    this.model.field = 17;

    assert.isValid(validator.result);

    validator = new NumberValidator(this.binding, { positive: false }, this.model);

    this.model.field = -17;

    assert.isValid(validator.result);

    this.model.field = 17;

    assert.isValid(validator.result);
  });

  test('`negative` option works', function (this: TestContext, assert) {
    let validator = new NumberValidator(this.binding, { negative: true }, this.model);

    this.model.field = 17;

    assert.isInvalid(validator.result, 'This field must be a negative number');

    this.model.field = -17;

    assert.isValid(validator.result);

    validator = new NumberValidator(this.binding, { negative: false }, this.model);

    this.model.field = 17;

    assert.isValid(validator.result);

    this.model.field = -17;

    assert.isValid(validator.result);
  });

  test('`even` option works', function (this: TestContext, assert) {
    let validator = new NumberValidator(this.binding, { even: true }, this.model);

    this.model.field = 17;

    assert.isInvalid(validator.result, 'This field must be an even number');

    this.model.field = 16;

    assert.isValid(validator.result);

    validator = new NumberValidator(this.binding, { even: false }, this.model);

    this.model.field = 17;

    assert.isValid(validator.result);

    this.model.field = 16;

    assert.isValid(validator.result);
  });

  test('`odd` option works', function (this: TestContext, assert) {
    let validator = new NumberValidator(this.binding, { odd: true }, this.model);

    this.model.field = 16;

    assert.isInvalid(validator.result, 'This field must be an odd number');

    this.model.field = 17;

    assert.isValid(validator.result);

    validator = new NumberValidator(this.binding, { odd: false }, this.model);

    this.model.field = 16;

    assert.isValid(validator.result);

    this.model.field = 17;

    assert.isValid(validator.result);
  });

  test('`multipleOf` option works', function (this: TestContext, assert) {
    const validator = new NumberValidator(this.binding, { multipleOf: 5 }, this.model);

    this.model.field = 16;

    assert.isInvalid(validator.result, 'This field must be a multiple of 5');

    this.model.field = 15;

    assert.isValid(validator.result);
  });

  test('`maxPrecision` option works', function (this: TestContext, assert) {
    const validator = new NumberValidator(this.binding, { maxPrecision: 2 }, this.model);

    this.model.field = 3.1415;

    assert.isInvalid(validator.result, 'This field must have at most 2 decimal places');

    this.model.field = 3.14;

    assert.isValid(validator.result);

    this.model.field = 3;

    assert.isValid(validator.result);
  });

  test('works with `validator` function', function (this: TestContext, assert) {
    const builder = buildValidator('number', { multipleOf: 5 });
    const validator = builder(this.binding, this.model);

    this.model.field = 16;

    assert.isInvalid(validator.result, 'This field must be a multiple of 5');

    this.model.field = 15;

    assert.isValid(validator.result);
  });
});
