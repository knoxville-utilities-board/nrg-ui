import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/core';
import { FileValidator } from '@nrg-ui/core/validation';
import { setupTest } from 'docs/tests/helpers';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';

import type { TestContext as TC } from '@ember/test-helpers';
import type { Binding } from '@nrg-ui/core';

class Model {
  @tracked
  field?: ArrayLike<unknown>;
}

declare type TestContext = {
  binding: Binding<Model>;
  model: Model;
} & TC;

module('Unit | Validator | file', function (hooks) {
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
      const validator = new FileValidator(this.binding, {}, this.model);

      assert.notOk(
        true,
        'Expected an error, but got a result instead: ' + validator.result,
      );
    }, new Error('Assertion Failed: FileValidator requires either `allowed` or `notAllowed` to be provided'));
  });

  test('`allowed` option works', function (this: TestContext, assert) {
    const validator = new FileValidator(
      this.binding,
      { allowed: ['png'] },
      this.model,
    );

    this.model.field = [new File([''], 'test.png', { type: 'image/png' })];

    assert.isValid(validator.result);

    this.model.field = [new File([''], 'test.jpg', { type: 'image/jpeg' })];

    assert.isInvalid(
      validator.result,
      'Only files of the following types are accepted: png',
    );
  });

  test('`notAllowed` option works', function (this: TestContext, assert) {
    const validator = new FileValidator(
      this.binding,
      { notAllowed: ['png'] },
      this.model,
    );

    this.model.field = [new File([''], 'test.jpeg', { type: 'image/jpeg' })];

    assert.isValid(validator.result);

    this.model.field = [new File([''], 'test.png', { type: 'image/png' })];

    assert.isInvalid(
      validator.result,
      'Files of the following types are not accepted: png',
    );
  });
});
