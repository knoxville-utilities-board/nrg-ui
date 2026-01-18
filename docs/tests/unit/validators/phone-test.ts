import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/core';
import { PhoneValidator, validator as buildValidator } from '@nrg-ui/core/validation';
import { setupTest } from 'docs/tests/helpers';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

import type { TestContext as TC } from '@ember/test-helpers';
import type { Binding } from '@nrg-ui/core';

class Model {
  @tracked
  field?: string | null;
}

declare type TestContext = {
  binding: Binding<Model>;
  model: Model;
} & TC;

module('Unit | Validator | phone', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us', translationsForEnUs);

  hooks.beforeEach(function (this: TestContext) {
    this.model = new Model();
    this.binding = bind(this.model, 'field');

    setOwner(this.model, this.owner);
  });

  test('`allowBlank` option works', function (this: TestContext, assert) {
    const validator = new PhoneValidator(this.binding, { allowBlank: true }, this.model);

    this.model.field = '';

    assert.isValid(validator.result);

    this.model.field = null;

    assert.isValid(validator.result);

    this.model.field = undefined;

    assert.isValid(validator.result);
  });

  test('`areaCode` option works', function (this: TestContext, assert) {
    let validator = new PhoneValidator(this.binding, {}, this.model);

    this.model.field = '5557890';

    assert.isValid(validator.result);

    this.model.field = '1235557890';

    assert.isValid(validator.result);

    validator = new PhoneValidator(this.binding, { areaCode: 'disallow' }, this.model);

    this.model.field = '5557890';

    assert.isValid(validator.result);

    this.model.field = '1235557890';

    assert.isInvalid(validator.result, 'This phone number must not include an area code');

    validator = new PhoneValidator(this.binding, { areaCode: 'require' }, this.model);

    this.model.field = '5557890';

    assert.isInvalid(validator.result, 'This phone number must include an area code');

    this.model.field = '1235557890';

    assert.isValid(validator.result);
  });

  test('`countryCode` option works', function (this: TestContext, assert) {
    let validator = new PhoneValidator(this.binding, {}, this.model);

    this.model.field = '1235557890';

    assert.isValid(validator.result);

    this.model.field = '121235557890';

    assert.isValid(validator.result);

    validator = new PhoneValidator(this.binding, { countryCode: 'disallow' }, this.model);

    this.model.field = '1235557890';

    assert.isValid(validator.result);

    this.model.field = '121235557890';

    assert.isInvalid(validator.result, 'This phone number must not include a country code');

    validator = new PhoneValidator(this.binding, { countryCode: 'require' }, this.model);

    this.model.field = '1235557890';

    assert.isInvalid(validator.result, 'This phone number must include a country code');

    this.model.field = '121235557890';

    assert.isValid(validator.result);
  });

  test('`invalidAreaCodes` option works', function (this: TestContext, assert) {
    let validator = new PhoneValidator(
      this.binding,
      { invalidAreaCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '7895557890';

    assert.isValid(validator.result);

    this.model.field = '4565557890';

    assert.isInvalid(
      validator.result,
      'This phone number must not include one of the following area codes: 123 and 456',
    );

    validator = new PhoneValidator(
      this.binding,
      { areaCode: 'require', invalidAreaCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '5557890';

    assert.isInvalid(validator.result, 'This phone number must include an area code');

    this.model.field = '7895557890';

    assert.isValid(validator.result);

    this.model.field = '4565557890';

    assert.isInvalid(
      validator.result,
      'This phone number must not include one of the following area codes: 123 and 456',
    );
  });

  test('`invalidCountryCodes` option works', function (this: TestContext, assert) {
    let validator = new PhoneValidator(
      this.binding,
      { invalidCountryCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '7897895557890';

    assert.isValid(validator.result);

    this.model.field = '4561235557890';

    assert.isInvalid(
      validator.result,
      'This phone number must not include one of the following country codes: 123 and 456',
    );

    validator = new PhoneValidator(
      this.binding,
      { countryCode: 'require', invalidCountryCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '5557890';

    assert.isInvalid(validator.result, 'This phone number must include a country code');

    this.model.field = '7891235557890';

    assert.isValid(validator.result);

    this.model.field = '4561235557890';

    assert.isInvalid(
      validator.result,
      'This phone number must not include one of the following country codes: 123 and 456',
    );
  });

  test('`invalidExchangeCodes` option works', function (this: TestContext, assert) {
    const validator = new PhoneValidator(
      this.binding,
      { invalidExchangeCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '5557890';

    assert.isValid(validator.result);

    this.model.field = '4567890';

    assert.isInvalid(
      validator.result,
      'This phone number must not include one of the following exchange codes: 123 and 456',
    );
  });

  test('`validAreaCodes` option works', function (this: TestContext, assert) {
    let validator = new PhoneValidator(
      this.binding,
      { validAreaCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '4565557890';

    assert.isValid(validator.result);

    this.model.field = '5557890';

    assert.isValid(validator.result);

    this.model.field = '7895557890';

    assert.isInvalid(
      validator.result,
      'This phone number must include a valid area code: 123 and 456',
    );

    validator = new PhoneValidator(
      this.binding,
      { areaCode: 'require', validAreaCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '5557890';

    assert.isInvalid(validator.result, 'This phone number must include an area code');

    this.model.field = '4565557890';

    assert.isValid(validator.result);

    this.model.field = '7895557890';

    assert.isInvalid(
      validator.result,
      'This phone number must include a valid area code: 123 and 456',
    );
  });

  test('`validCountryCodes` option works', function (this: TestContext, assert) {
    let validator = new PhoneValidator(
      this.binding,
      { validCountryCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '4561235557890';

    assert.isValid(validator.result);

    this.model.field = '1235557890';

    assert.isValid(validator.result);

    this.model.field = '7891235557890';

    assert.isInvalid(
      validator.result,
      'This phone number must include a valid country code: 123 and 456',
    );

    validator = new PhoneValidator(
      this.binding,
      { countryCode: 'require', validCountryCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '1235557890';

    assert.isInvalid(validator.result, 'This phone number must include a country code');

    this.model.field = '4561235557890';

    assert.isValid(validator.result);

    this.model.field = '7891235557890';

    assert.isInvalid(
      validator.result,
      'This phone number must include a valid country code: 123 and 456',
    );
  });

  test('`validExchangeCodes` option works', function (this: TestContext, assert) {
    const validator = new PhoneValidator(
      this.binding,
      { validExchangeCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '4567890';

    assert.isValid(validator.result);

    this.model.field = '5557890';

    assert.isInvalid(
      validator.result,
      'This phone number must include a valid exchange code: 123 and 456',
    );
  });

  test('works with `validator` function', function (this: TestContext, assert) {
    const builder = buildValidator('phone', {});
    const validator = builder(this.binding, this.model);

    this.model.field = '11111235557890';

    assert.isInvalid(validator.result, 'This field must be a valid phone number');

    this.model.field = '555789';

    assert.isInvalid(
      validator.result,
      'This field must be a valid phone number',
      'Phone number shorter than 7 digits is invalid',
    );

    this.model.field = '1235557890';

    assert.isValid(validator.result);

    this.model.field = '11235557890';

    assert.isValid(validator.result);
  });
});
