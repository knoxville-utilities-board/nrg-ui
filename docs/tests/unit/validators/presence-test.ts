import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/core';
import { PresenceValidator, validator as buildValidator } from '@nrg-ui/core/validation';
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

module('Unit | Validator | inclusion', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us', translationsForEnUs);

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

      assert.notOk(true, 'Expected an error, but got a result instead: ' + validator.result);
    }, new Error('Assertion Failed: PresenceValidator requires `presence` to be provided'));
  });

  test('`presence` option works', function (this: TestContext, assert) {
    let validator = new PresenceValidator(this.binding, { presence: true }, this);

    assert.isInvalid(validator.result, 'This field cannot be blank');

    this.model.field = 'test';

    assert.isValid(validator.result);

    this.model.field = ' ';

    assert.isInvalid(validator.result, 'This field cannot be blank');

    validator = new PresenceValidator(this.binding, { presence: false }, this);

    this.model.field = 'test';

    assert.isInvalid(validator.result, 'This field must be blank');

    this.model.field = ' ';

    assert.isValid(validator.result);

    this.model.field = '';

    assert.isValid(validator.result);
  });

  test('`ignoreBlank` option works', function (this: TestContext, assert) {
    let validator = new PresenceValidator(
      this.binding,
      { ignoreBlank: true, presence: true },
      this,
    );

    assert.isInvalid(validator.result, 'This field cannot be blank');

    this.model.field = ' ';

    assert.isInvalid(validator.result, 'This field cannot be blank');

    this.model.field = 'test';

    assert.isValid(validator.result);

    validator = new PresenceValidator(this.binding, { ignoreBlank: false, presence: false }, this);

    assert.isInvalid(validator.result, 'This field must be blank');

    this.model.field = ' ';

    assert.isInvalid(validator.result, 'This field must be blank');

    this.model.field = 'test';

    assert.isInvalid(validator.result, 'This field must be blank');
  });

  test('works with `validator` function', function (this: TestContext, assert) {
    let builder = buildValidator('presence', {
      ignoreBlank: true,
      presence: true,
    });
    let validator = builder(this.binding, this.model);

    assert.isInvalid(validator.result, 'This field cannot be blank');

    this.model.field = ' ';

    assert.isInvalid(validator.result, 'This field cannot be blank');

    this.model.field = 'test';

    assert.isValid(validator.result);

    builder = buildValidator('presence', {
      ignoreBlank: false,
      presence: false,
    });
    validator = builder(this.binding, this.model);

    assert.isInvalid(validator.result, 'This field must be blank');

    this.model.field = ' ';

    assert.isInvalid(validator.result, 'This field must be blank');

    this.model.field = 'test';

    assert.isInvalid(validator.result, 'This field must be blank');
  });
});
