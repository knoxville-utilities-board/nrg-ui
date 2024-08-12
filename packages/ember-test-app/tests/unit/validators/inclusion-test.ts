import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/ember/helpers/bind';
import {
  validator as buildValidator,
  InclusionValidator,
} from '@nrg-ui/ember/validation';
import { setupIntl } from 'ember-intl/test-support';
import { setupTest } from 'ember-test-app/tests/helpers';
import { module, test } from 'qunit';

import type { TestContext as TC } from '@ember/test-helpers';
import type { types } from '@nrg-ui/ember';

class Model {
  @tracked
  field?: string | string[];
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

  test('`in` option is required', function (this: TestContext, assert) {
    assert.expect(1);

    assert.throws(() => {
      // @ts-expect-error Testing that the `in` option is required
      const validator = new InclusionValidator(this.binding, {}, this);
      const result = validator.result;

      assert.notOk(
        true,
        'Expected an error, but got a result instead: ' + result,
      );
    }, new Error('Assertion Failed: InclusionValidator requires an array of valid values to be provided'));
  });

  test('response is good when validation passes', function (this: TestContext, assert) {
    const validator = new InclusionValidator(
      this.binding,
      {
        in: ['A', 'B', 'C'],
      },
      this.model,
    );

    this.model.field = 'B';

    const result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('response is bad when validation fails', function (this: TestContext, assert) {
    const validator = new InclusionValidator(
      this.binding,
      {
        in: ['A', 'B', 'C'],
      },
      this.model,
    );

    this.model.field = 'D';

    const result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field is not a valid value. Valid values are: A, B, and C',
    });
  });

  test('works with `validator` function', function (this: TestContext, assert) {
    const builder = buildValidator('inclusion', {
      in: ['A', 'B', 'C'],
    });
    const validator = builder(this.binding, this.model);

    this.model.field = 'D';

    const result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This field is not a valid value. Valid values are: A, B, and C',
    });
  });
});
