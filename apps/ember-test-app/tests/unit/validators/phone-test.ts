import { setOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import { bind } from '@nrg-ui/ember/helpers/bind';
import {
  validator as buildValidator,
  PhoneValidator,
} from '@nrg-ui/ember/validation';
import { setupIntl } from 'ember-intl/test-support';
import { setupTest } from 'ember-test-app/tests/helpers';
import { module, test } from 'qunit';

import type { TestContext as TC } from '@ember/test-helpers';
import type { Binding } from '@nrg-ui/ember';

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
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.model = new Model();
    this.binding = bind(this.model, 'field');

    setOwner(this.model, this.owner);
  });

  test('`allowBlank` option works', function (this: TestContext, assert) {
    const validator = new PhoneValidator(
      this.binding,
      { allowBlank: true },
      this.model,
    );

    this.model.field = '';
    let result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = null;
    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = undefined;
    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`areaCode` option works', function (this: TestContext, assert) {
    let validator = new PhoneValidator(this.binding, {}, this.model);

    this.model.field = '5557890';

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '1235557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    validator = new PhoneValidator(
      this.binding,
      { areaCode: 'disallow' },
      this.model,
    );

    this.model.field = '5557890';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '1235557890';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This phone number must not include an area code',
    });

    validator = new PhoneValidator(
      this.binding,
      { areaCode: 'require' },
      this.model,
    );

    this.model.field = '5557890';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This phone number must include an area code',
    });

    this.model.field = '1235557890';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`countryCode` option works', function (this: TestContext, assert) {
    let validator = new PhoneValidator(this.binding, {}, this.model);

    this.model.field = '1235557890';

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '121235557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    validator = new PhoneValidator(
      this.binding,
      { countryCode: 'disallow' },
      this.model,
    );

    this.model.field = '1235557890';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '121235557890';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This phone number must not include a country code',
    });

    validator = new PhoneValidator(
      this.binding,
      { countryCode: 'require' },
      this.model,
    );

    this.model.field = '1235557890';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This phone number must include a country code',
    });

    this.model.field = '121235557890';
    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });

  test('`invalidAreaCodes` option works', function (this: TestContext, assert) {
    let validator = new PhoneValidator(
      this.binding,
      { invalidAreaCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '7895557890';

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '4565557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message:
        'This phone number must not include one of the following area codes: 123 and 456',
    });

    validator = new PhoneValidator(
      this.binding,
      { areaCode: 'require', invalidAreaCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '5557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This phone number must include an area code',
    });

    this.model.field = '7895557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '4565557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message:
        'This phone number must not include one of the following area codes: 123 and 456',
    });
  });

  test('`invalidCountryCodes` option works', function (this: TestContext, assert) {
    let validator = new PhoneValidator(
      this.binding,
      { invalidCountryCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '7897895557890';

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '4561235557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message:
        'This phone number must not include one of the following country codes: 123 and 456',
    });

    validator = new PhoneValidator(
      this.binding,
      { countryCode: 'require', invalidCountryCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '5557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This phone number must include a country code',
    });

    this.model.field = '7891235557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '4561235557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message:
        'This phone number must not include one of the following country codes: 123 and 456',
    });
  });

  test('`invalidExchangeCodes` option works', function (this: TestContext, assert) {
    const validator = new PhoneValidator(
      this.binding,
      { invalidExchangeCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '5557890';

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '4567890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message:
        'This phone number must not include one of the following exchange codes: 123 and 456',
    });
  });

  test('`validAreaCodes` option works', function (this: TestContext, assert) {
    let validator = new PhoneValidator(
      this.binding,
      { validAreaCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '4565557890';

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '5557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '7895557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This phone number must include a valid area code: 123 and 456',
    });

    validator = new PhoneValidator(
      this.binding,
      { areaCode: 'require', validAreaCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '5557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This phone number must include an area code',
    });

    this.model.field = '4565557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '7895557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This phone number must include a valid area code: 123 and 456',
    });
  });

  test('`validCountryCodes` option works', function (this: TestContext, assert) {
    let validator = new PhoneValidator(
      this.binding,
      { validCountryCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '4561235557890';

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '1235557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '7891235557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message:
        'This phone number must include a valid country code: 123 and 456',
    });

    validator = new PhoneValidator(
      this.binding,
      { countryCode: 'require', validCountryCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '1235557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message: 'This phone number must include a country code',
    });

    this.model.field = '4561235557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '7891235557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message:
        'This phone number must include a valid country code: 123 and 456',
    });
  });

  test('`validExchangeCodes` option works', function (this: TestContext, assert) {
    const validator = new PhoneValidator(
      this.binding,
      { validExchangeCodes: ['123', '456'] },
      this.model,
    );

    this.model.field = '4567890';

    let result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '5557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: false,
      isWarning: false,
      message:
        'This phone number must include a valid exchange code: 123 and 456',
    });
  });

  test('works with `validator` function', function (this: TestContext, assert) {
    const builder = buildValidator('phone', {});
    const validator = builder(this.binding, this.model);

    this.model.field = '11111235557890';

    let result = validator.result;

    assert.deepEqual(
      result,
      {
        isValid: false,
        isWarning: false,
        message: 'This field must be a valid phone number',
      },
      'Phone number longer than 13 digits is invalid',
    );

    this.model.field = '555789';

    result = validator.result;

    assert.deepEqual(
      result,
      {
        isValid: false,
        isWarning: false,
        message: 'This field must be a valid phone number',
      },
      'Phone number shorter than 7 digits is invalid',
    );

    this.model.field = '1235557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });

    this.model.field = '11235557890';

    result = validator.result;

    assert.deepEqual(result, {
      isValid: true,
      isWarning: false,
      message: undefined,
    });
  });
});
