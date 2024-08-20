import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/ember/helpers/bind';
import {
  validator as buildValidator,
  CustomValidator,
} from '@nrg-ui/ember/validation';
import { addTranslations, setupIntl } from 'ember-intl/test-support';
import { setupTest } from 'ember-test-app/tests/helpers';
import { module, test } from 'qunit';

import type { TestContext as TC } from '@ember/test-helpers';
import type { Binding } from '@nrg-ui/ember';

class Model {
  @tracked
  field?: string | string[];
}

declare type TestContext = {
  binding: Binding<Model>;
  model: Model;
} & TC;

module('Unit | Validator | custom', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.model = new Model();
    this.binding = bind(this.model, 'field');

    setOwner(this.model, this.owner);
  });

  test('`on` option is required', function (this: TestContext, assert) {
    assert.expect(1);

    assert.throws(() => {
      const validator = new CustomValidator(this.binding, {}, this.model);
      const result = validator.result;

      assert.notOk(
        true,
        'Expected an error, but got a result instead: ' + result,
      );
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

    const result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
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

    const result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: errorMessage,
    });
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

    const result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field is invalid',
    });
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

    const result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field is invalid: foo,bar',
    });
  });

  test('works with `validator` function', function (this: TestContext, assert) {
    const builder = buildValidator('custom', {
      validate: () => {
        return false;
      },
    });
    const validator = builder(this.binding, this.model);

    const result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field is invalid',
    });
  });
});
