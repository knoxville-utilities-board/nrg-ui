import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/core';
import { CustomValidator, validator as buildValidator } from '@nrg-ui/core/validation';
import { setupTest } from 'docs/tests/helpers';
import { addTranslations, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

import type { TestContext as TC } from '@ember/test-helpers';
import type { Binding } from '@nrg-ui/core';

class Model {
  @tracked
  field?: string | string[];

  @tracked
  disabled: boolean = false;
}

declare type TestContext = {
  binding: Binding<Model>;
  model: Model;
} & TC;

module('Unit | Validator | custom', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us', translationsForEnUs);

  hooks.beforeEach(function (this: TestContext) {
    this.model = new Model();
    this.binding = bind(this.model, 'field');

    setOwner(this.model, this.owner);
  });

  test('`validate` option is required', function (this: TestContext, assert) {
    assert.expect(1);

    assert.throws(() => {
      // @ts-expect-error Testing that the `validate` option is required
      const validator = new CustomValidator(this.binding, {}, this.model);

      assert.notOk(true, 'Expected an error, but got a result instead: ' + validator.result);
    }, new Error('Assertion Failed: CustomValidator requires a `validate` function to be provided'));
  });

  test('response is good when validation passes', function (this: TestContext, assert) {
    const validator = new CustomValidator(
      this.binding,
      {
        validate() {
          return true;
        },
      },
      this.model,
    );

    assert.isValid(validator.result);
  });

  test('response is bad when validation fails', function (this: TestContext, assert) {
    const errorMessage = 'This field is really invalid';
    const validator = new CustomValidator(
      this.binding,
      {
        validate() {
          return false;
        },
        message() {
          return errorMessage;
        },
      },
      this.model,
    );

    assert.isInvalid(validator.result, errorMessage);
  });

  test('default error message when validation fails', function (this: TestContext, assert) {
    const validator = new CustomValidator(
      this.binding,
      {
        validate() {
          return false;
        },
      },
      this.model,
    );

    assert.isInvalid(validator.result, 'This field is invalid');
  });

  test('value is included in error message', async function (this: TestContext, assert) {
    const validator = new CustomValidator(
      this.binding,
      {
        validate() {
          return false;
        },
        key: 'nrg.validation.custom.invalid',
      },
      this.model,
    );

    await addTranslations('en-us', {
      'nrg.validation.custom.invalid': 'This field is invalid: {value}',
    });

    this.model.field = ['foo', 'bar'];

    assert.isInvalid(validator.result, 'This field is invalid: foo,bar');
  });

  test('disabled option works', async function (this: TestContext, assert) {
    const validator = new CustomValidator(
      this.binding,
      {
        validate() {
          return false;
        },
        disabled() {
          return this.disabled;
        },
      },
      this.model,
    );

    this.model.field = ['foo', 'bar'];

    assert.isInvalid(validator.result, 'This field is invalid');

    this.model.disabled = true;

    assert.isDisabled(validator.result);
  });

  test('works with `validator` function', function (this: TestContext, assert) {
    const builder = buildValidator('custom', {
      validate: () => {
        return false;
      },
    });
    const validator = builder(this.binding, this.model);

    assert.isInvalid(validator.result, 'This field is invalid');
  });
});
