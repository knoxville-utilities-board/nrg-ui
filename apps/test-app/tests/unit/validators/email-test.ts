import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/core';
import {
  validator as buildValidator,
  EmailValidator,
} from '@nrg-ui/core/validation';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupTest } from 'test-app/tests/helpers';

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

module('Unit | Validator | email', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.model = new Model();
    this.binding = bind(this.model, 'field');

    setOwner(this.model, this.owner);
  });

  test('no options work', function (this: TestContext, assert) {
    const validator = new EmailValidator(this.binding, {}, this.model);

    this.model.field = 'foo';

    assert.isInvalid(
      validator.result,
      'This field must be a valid email address',
    );

    this.model.field = 'foo@bar.com';

    assert.isValid(validator.result);
  });

  test('`invalidDomains` option works', function (this: TestContext, assert) {
    const validator = new EmailValidator(
      this.binding,
      { invalidDomains: ['kub.org'] },
      this.model,
    );

    this.model.field = 'foo@bar.com';

    assert.isValid(validator.result);

    this.model.field = 'foo@kub.org';

    assert.isInvalid(
      validator.result,
      'This email must not be from one of the following domains: kub.org',
    );
  });

  test('`validDomains` option works', function (this: TestContext, assert) {
    const validator = new EmailValidator(
      this.binding,
      { validDomains: ['kub.org'] },
      this.model,
    );

    this.model.field = 'foo@kub.org';

    assert.isValid(validator.result);

    this.model.field = 'foo@bar.com';

    assert.isInvalid(
      validator.result,
      'This email must be from one of the following domains: kub.org',
    );
  });

  test('works with `validator` function', function (this: TestContext, assert) {
    const builder = buildValidator('email', {});
    const validator = builder(this.binding, this.model);

    this.model.field = 'foo@bar.com';

    assert.isValid(validator.result);

    this.model.field = 'foo';

    assert.isInvalid(
      validator.result,
      'This field must be a valid email address',
    );
  });
});
