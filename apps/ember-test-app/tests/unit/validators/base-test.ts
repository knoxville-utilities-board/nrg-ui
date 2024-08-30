import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/ember/helpers/bind';
import { BaseValidator } from '@nrg-ui/ember/validation';
import { addTranslations, setupIntl } from 'ember-intl/test-support';
import { setupTest } from 'ember-test-app/tests/helpers';
import { module, test } from 'qunit';

import type Owner from '@ember/owner';
import type { TestContext as TC } from '@ember/test-helpers';
import type { Binding } from '@nrg-ui/ember';
import type { BaseOptions, ValidateFnResponse } from '@nrg-ui/ember/validation';

class Model {
  @tracked
  disabled: boolean = false;
}

type DummyOptions<T extends ValidateFnResponse> = BaseOptions & {
  response?: T;
};

class DummyValidator<T extends ValidateFnResponse> extends BaseValidator<
  T,
  Model,
  Model,
  DummyOptions<T>
> {
  validate(
    this: BaseValidator<T, Model, Model, DummyOptions<T>>,
    value: T,
    options: DummyOptions<T>,
  ) {
    return options.response ?? true;
  }
}

declare type TestContext = {
  binding: Binding<Model>;
  model: Model;
} & TC;

module('Unit | Validator | base', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.model = new Model();
    this.binding = bind(this.model, 'field');

    setOwner(this.model, this.owner);
  });

  test('`validate` function is required', function (this: TestContext, assert) {
    assert.expect(1);

    assert.throws(() => {
      // @ts-expect-error TS disallows instantiating an abstract class
      const validator = new BaseValidator(this.binding, {}, this.model);
      const result = validator.result;

      assert.notOk(
        true,
        'Expected an error, but got a result instead: ' + result,
      );
    }, new Error('Assertion Failed: BaseValidator requires the `validate` function to be implemented by subclasses'));
  });

  test('`binding` option is required', function (this: TestContext, assert) {
    assert.expect(1);

    assert.throws(() => {
      // @ts-expect-error Testing that the `binding` option is required
      const validator = new DummyValidator(null, {}, this.model);
      const result = validator.result;

      assert.notOk(
        true,
        'Expected an error, but got a result instead: ' + result,
      );
    }, new Error('Assertion Failed: You must provide a binding argument to DummyValidator'));
  });

  test('owner is required', function (this: TestContext, assert) {
    assert.expect(3);

    assert.throws(() => {
      setOwner(this.model, undefined as unknown as Owner);
      const validator = new DummyValidator(this.binding, {}, this.model);
      const result = validator.result;

      assert.notOk(
        true,
        'Expected an error, but got a result instead: ' + result,
      );
    }, new Error('Assertion Failed: The `context` or `model` must be have an owner. Usually this means the `context` or `model` is an EmberObject or GlimmerComponent, but this can be manually set up with `setOwner`'));

    try {
      setOwner(this.model, this.owner);
      const validator = new DummyValidator(this.binding, {}, this.model);
      const result = validator.result;

      assert.true(result.isValid);
    } catch (e) {
      assert.notOk(true, 'Expected no error, but got an error instead: ' + e);
    }

    try {
      const context = new Model();
      setOwner(context, this.owner);
      setOwner(this.model, null as unknown as Owner);
      const validator = new DummyValidator(this.binding, {}, context);
      const result = validator.result;

      assert.true(result.isValid);
    } catch (e) {
      assert.notOk(true, 'Expected no error, but got an error instead: ' + e);
    }
  });

  test('response can be a boolean', function (this: TestContext, assert) {
    let validator: DummyValidator<boolean> = new DummyValidator(
      this.binding,
      {
        response: true,
      },
      this.model,
    );

    let result = validator.result;

    assert.isValid(result);

    validator = new DummyValidator(
      this.binding,
      {
        response: false,
      },
      this.model,
    );

    result = validator.result;

    assert.isInvalid(result);

    validator = new DummyValidator(
      this.binding,
      {
        response: false,
        isWarning: true,
      },
      this.model,
    );

    result = validator.result;

    assert.isWarning(result);
  });

  test('response can be a string', function (this: TestContext, assert) {
    const errorMessage = 'This field is really invalid';
    const validator = new DummyValidator(
      this.binding,
      {
        response: errorMessage,
      },
      this.model,
    );

    const result = validator.result;

    assert.isInvalid(result, errorMessage);
  });

  test('response can include a message', function (this: TestContext, assert) {
    const errorMessage = 'This field is really invalid';
    let validator = new DummyValidator(
      this.binding,
      {
        response: false,
        message: errorMessage,
      },
      this.model,
    );

    let result = validator.result;

    assert.isInvalid(result, errorMessage);

    validator = new DummyValidator(
      this.binding,
      {
        response: false,
        message: errorMessage,
        isWarning: true,
      },
      this.model,
    );

    result = validator.result;

    assert.isWarning(result, errorMessage);
  });

  test('message from options supersedes response message', function (this: TestContext, assert) {
    let validator = new DummyValidator(
      this.binding,
      {
        response: {
          isValid: false,
          message: 'This is the response message',
        },
        message: 'This is the options message',
      },
      this.model,
    );

    let result = validator.result;

    assert.isInvalid(result, 'This is the options message');

    validator = new DummyValidator(
      this.binding,
      {
        response: {
          isValid: false,
          message: 'This is the response message',
        },
        message: 'This is the options message',
        isWarning: true,
      },
      this.model,
    );

    result = validator.result;

    assert.isWarning(result, 'This is the options message');
  });

  test('response can include a key', function (this: TestContext, assert) {
    let validator = new DummyValidator(
      this.binding,
      {
        response: false,
        key: 'greeting',
      },
      this.model,
    );

    let result = validator.result;

    assert.isInvalid(result, 'Hello, world!');

    validator = new DummyValidator(
      this.binding,
      {
        response: false,
        message: 'Hello, world!',
        isWarning: true,
      },
      this.model,
    );

    result = validator.result;

    assert.isWarning(result, 'Hello, world!');
  });

  test('key from options supersedes response key', async function (this: TestContext, assert) {
    await addTranslations('en-us', {
      'my.key': 'This is the correct message',
    });

    let validator = new DummyValidator(
      this.binding,
      {
        response: {
          isValid: false,
          key: 'greeting',
        },
        key: 'my.key',
      },
      this.model,
    );

    let result = validator.result;

    assert.isInvalid(result, 'This is the correct message');

    validator = new DummyValidator(
      this.binding,
      {
        response: {
          isValid: false,
          key: 'greeting',
        },
        key: 'my.key',
        isWarning: true,
      },
      this.model,
    );

    result = validator.result;

    assert.isWarning(result, 'This is the correct message');
  });

  test('key from options supersedes response message', async function (this: TestContext, assert) {
    await addTranslations('en-us', {
      'my.key': 'This is the correct message',
    });

    let validator = new DummyValidator(
      this.binding,
      {
        response: {
          isValid: false,
          message: 'This is the wrong message',
        },
        key: 'my.key',
      },
      this.model,
    );

    let result = validator.result;

    assert.isInvalid(result, 'This is the correct message');

    validator = new DummyValidator(
      this.binding,
      {
        response: {
          isValid: false,
          message: 'This is the wrong message',
        },
        key: 'my.key',
        isWarning: true,
      },
      this.model,
    );

    result = validator.result;

    assert.isWarning(result, 'This is the correct message');
  });

  test('message from options supersedes response key', async function (this: TestContext, assert) {
    let validator = new DummyValidator(
      this.binding,
      {
        response: {
          isValid: false,
          key: 'greeting',
        },
        message: 'This is the correct message',
      },
      this.model,
    );

    let result = validator.result;

    assert.isInvalid(result, 'This is the correct message');

    validator = new DummyValidator(
      this.binding,
      {
        response: {
          isValid: false,
          key: 'greeting',
        },
        message: 'This is the correct message',
        isWarning: true,
      },
      this.model,
    );

    result = validator.result;

    assert.isWarning(result, 'This is the correct message');
  });

  test('key from options supersedes options message', async function (this: TestContext, assert) {
    await addTranslations('en-us', {
      'my.key': 'This is the correct message',
    });

    let validator = new DummyValidator(
      this.binding,
      {
        response: {
          isValid: false,
        },
        message: 'This is the wrong message',
        key: 'my.key',
      },
      this.model,
    );

    let result = validator.result;

    assert.isInvalid(result, 'This is the correct message');

    validator = new DummyValidator(
      this.binding,
      {
        response: {
          isValid: false,
        },
        message: 'This is the wrong message',
        key: 'my.key',
        isWarning: true,
      },
      this.model,
    );

    result = validator.result;

    assert.isWarning(result, 'This is the correct message');
  });

  test('key from response supersedes response message', async function (this: TestContext, assert) {
    await addTranslations('en-us', {
      'my.key': 'This is the correct message',
    });

    let validator = new DummyValidator(
      this.binding,
      {
        response: {
          isValid: false,
          key: 'my.key',
          message: 'This is the wrong message',
        },
      },
      this.model,
    );

    let result = validator.result;

    assert.isInvalid(result, 'This is the correct message');

    validator = new DummyValidator(
      this.binding,
      {
        response: {
          isValid: false,
          key: 'my.key',
          message: 'This is the wrong message',
        },
        isWarning: true,
      },
      this.model,
    );

    result = validator.result;

    assert.isWarning(result, 'This is the correct message');
  });

  test('disabled option works', async function (this: TestContext, assert) {
    const validator = new DummyValidator(
      this.binding,
      {
        response: false,
        message: 'This field is bad',
        disabled() {
          return this.disabled;
        },
      },
      this.model,
    );

    let result = validator.result;

    assert.isInvalid(result, 'This field is bad');

    this.model.disabled = true;

    result = validator.result;

    assert.isDisabled(result);
  });
});
