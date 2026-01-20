import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/core';
import { RegexValidator, validator as buildValidator } from '@nrg-ui/core/validation';
import { setupTest } from 'docs/tests/helpers';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

import type { TestContext as TC } from '@ember/test-helpers';
import type { Binding } from '@nrg-ui/core';

class Model {
  @tracked
  field?: string;
}

declare type TestContext = {
  binding: Binding<Model>;
  model: Model;
} & TC;

module('Unit | Validator | regex', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us', translationsForEnUs);

  hooks.beforeEach(function (this: TestContext) {
    this.model = new Model();
    this.binding = bind(this.model, 'field');

    setOwner(this.model, this.owner);
  });

  test('`pattern` is required', function (this: TestContext, assert) {
    assert.expect(2);

    assert.throws(() => {
      // @ts-expect-error Testing that the `pattern` option is required
      const validator = new RegexValidator(this.binding, {}, this.model);

      assert.notOk(true, 'Expected an error, but got a result instead: ' + validator.result);
    }, new Error('Assertion Failed: RegexValidator requires `pattern` to be provided'));

    assert.throws(() => {
      const validator = new RegexValidator(
        this.binding,
        // @ts-expect-error Testing that the `pattern` option is required
        { pattern: 42 },
        this.model,
      );

      assert.notOk(true, 'Expected an error, but got a result instead: ' + validator.result);
    }, new Error('Assertion Failed: RegexValidator requires the pattern to be of type string or RegExp'));
  });

  test('`pattern` option works', function (this: TestContext, assert) {
    const validator = new RegexValidator(this.binding, { pattern: /^Foo/ }, this.model);

    this.model.field = 'foo';

    assert.isInvalid(validator.result, 'This field is invalid');

    this.model.field = 'Foo';

    assert.isValid(validator.result);
  });

  test('`inverse` option works', function (this: TestContext, assert) {
    const validator = new RegexValidator(
      this.binding,
      { pattern: /^Foo/, inverse: true },
      this.model,
    );

    this.model.field = 'foo';

    assert.isValid(validator.result);

    this.model.field = 'Foo';

    assert.isInvalid(validator.result, 'This field is invalid');
  });

  test('works with `validator` function', function (this: TestContext, assert) {
    const builder = buildValidator('regex', { pattern: /^Foo/, inverse: true });
    const validator = builder(this.binding, this.model);

    this.model.field = 'foo';

    assert.isValid(validator.result);

    this.model.field = 'Foo';

    assert.isInvalid(validator.result, 'This field is invalid');
  });
});
