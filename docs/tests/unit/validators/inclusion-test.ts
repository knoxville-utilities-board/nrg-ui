import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/core';
import { InclusionValidator, validator as buildValidator } from '@nrg-ui/core/validation';
import { setupTest } from 'docs/tests/helpers';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

import type { TestContext as TC } from '@ember/test-helpers';
import type { Binding } from '@nrg-ui/core';

class Model {
  @tracked
  field?: string | string[];
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

  test('`in` option is required', function (this: TestContext, assert) {
    assert.expect(1);

    assert.throws(() => {
      // @ts-expect-error Testing that the `in` option is required
      const validator = new InclusionValidator(this.binding, {}, this);

      assert.notOk(true, 'Expected an error, but got a result instead: ' + validator.result);
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

    assert.isValid(validator.result);
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

    assert.isInvalid(
      validator.result,
      'This field is not a valid value. Valid values are: A, B, and C',
    );
  });

  test('works with `validator` function', function (this: TestContext, assert) {
    const builder = buildValidator('inclusion', {
      in: ['A', 'B', 'C'],
    });
    const validator = builder(this.binding, this.model);

    this.model.field = 'D';

    assert.isInvalid(
      validator.result,
      'This field is not a valid value. Valid values are: A, B, and C',
    );
  });
});
