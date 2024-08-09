import { module, test } from 'qunit';
import { setupTest } from 'ember-test-app/tests/helpers';
import { bind } from '@nrg-ui/ember/helpers/bind';
import { ExclusionValidator } from '@nrg-ui/ember/validation/index';
import { setOwner } from '@ember/application';
import { setupIntl } from 'ember-intl/test-support';
import { tracked } from '@glimmer/tracking';

import type { types } from '@nrg-ui/ember';
import type { TestContext as TC } from '@ember/test-helpers';

class Model {
  @tracked
  field?: string;
}

declare type TestContext = {
  binding: types.Binding;
  model: Model;
} & TC;

module('Unit | Validator | exclusion', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.model = new Model();
    this.binding = bind(this.model, 'field');

    setOwner(this.model, this.owner);
  });

  test('`in` option is required', function (this: TestContext, assert) {
    assert.expect(1);

    assert.throws(() => {
      // @ts-expect-error Testing that the `in` option is required
      const validator = new ExclusionValidator(this.binding, {}, this);
      const result = validator.result;

      assert.notOk(
        true,
        'Expected an error, but got a result instead: ' + result,
      );
    }, new Error('Assertion Failed: ExclusionValidator requires an array of invalid values to be provided'));
  });

  test('response is good when validation passes', function (this: TestContext, assert) {
    const validator = new ExclusionValidator(
      this.binding,
      {
        in: ['A', 'B', 'C'],
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
    const validator = new ExclusionValidator(
      this.binding,
      {
        in: ['A', 'B', 'C', 'D'],
      },
      this.model,
    );

    this.model.field = 'D';

    const result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message:
        'This field is not a valid value. Value cannot be: A, B, C, and D',
    });
  });
});
