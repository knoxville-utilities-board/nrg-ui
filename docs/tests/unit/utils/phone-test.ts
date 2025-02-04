import {
  areaCodeInput,
  areaCodeOutput,
  countryCodeInput,
  countryCodeOutput,
  exchangeCodeInput,
  exchangeCodeOutput,
  format,
  getAreaCode,
  getCountryCode,
  getExchangeCode,
  getLineNumber,
  hasAreaCode,
  hasCountryCode,
  hasExchangeCode,
  hasLineNumber,
  lineNumberInput,
  lineNumberOutput,
} from '@nrg-ui/core/utils/phone';
import { setupTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Utility | phone', function (hooks) {
  setupTest(hooks);

  test('line number functions', function (assert) {
    const withLineNumber = '123';
    const withoutLineNumber = '';

    assert.true(lineNumberInput.test(withLineNumber));
    assert.false(lineNumberInput.test(withoutLineNumber));

    assert.strictEqual(
      withLineNumber.replace(lineNumberInput, lineNumberOutput),
      '123',
    );
    assert.strictEqual(
      withoutLineNumber.replace(lineNumberInput, lineNumberOutput),
      '',
    );

    assert.true(hasLineNumber(withLineNumber));
    assert.false(hasLineNumber(withoutLineNumber));

    assert.strictEqual(getLineNumber(withLineNumber), '123');
    assert.strictEqual(getLineNumber(withoutLineNumber), '');
  });

  test('exchange code functions', function (assert) {
    const withExchangeCode = '12345';
    const withoutExchangeCode = '1234';

    assert.true(exchangeCodeInput.test(withExchangeCode));
    assert.false(exchangeCodeInput.test(withoutExchangeCode));

    assert.strictEqual(
      withExchangeCode.replace(exchangeCodeInput, exchangeCodeOutput),
      '1-2345',
    );
    assert.strictEqual(
      withoutExchangeCode.replace(exchangeCodeInput, exchangeCodeOutput),
      '1234',
    );

    assert.true(hasExchangeCode(withExchangeCode));
    assert.false(hasExchangeCode(withoutExchangeCode));

    assert.strictEqual(getExchangeCode(withExchangeCode), '1');
    assert.strictEqual(getExchangeCode(withoutExchangeCode), '');
  });

  test('area code functions', function (assert) {
    const withAreaCode = '1234567890';
    const withoutAreaCode = '1234567';

    assert.true(areaCodeInput.test(withAreaCode));
    assert.false(areaCodeInput.test(withoutAreaCode));

    assert.strictEqual(
      withAreaCode.replace(areaCodeInput, areaCodeOutput),
      '(123) 456-7890',
    );
    assert.strictEqual(
      withoutAreaCode.replace(areaCodeInput, areaCodeOutput),
      '1234567',
    );

    assert.true(hasAreaCode(withAreaCode));
    assert.false(hasAreaCode(withoutAreaCode));

    assert.strictEqual(getAreaCode(withAreaCode), '123');
    assert.strictEqual(getAreaCode(withoutAreaCode), '');
  });

  test('country code functions', function (assert) {
    const withCountryCode = '1234567890123';
    const withoutCountryCode = '1234567890';

    assert.true(countryCodeInput.test(withCountryCode));
    assert.false(countryCodeInput.test(withoutCountryCode));

    assert.strictEqual(
      withCountryCode.replace(countryCodeInput, countryCodeOutput),
      '+123 (456) 789-0123',
    );
    assert.strictEqual(
      withoutCountryCode.replace(countryCodeInput, countryCodeOutput),
      '1234567890',
    );

    assert.true(hasCountryCode(withCountryCode));
    assert.false(hasCountryCode(withoutCountryCode));

    assert.strictEqual(getCountryCode(withCountryCode), '123');
    assert.strictEqual(getCountryCode(withoutCountryCode), '');
  });

  test('format', function (assert) {
    // Line number
    assert.strictEqual(format('1'), '1');
    assert.strictEqual(format('12'), '12');
    assert.strictEqual(format('123'), '123');
    assert.strictEqual(format('1234'), '1234');

    // Exchange code
    assert.strictEqual(format('12345'), '1-2345');
    assert.strictEqual(format('123456'), '12-3456');
    assert.strictEqual(format('1234567'), '123-4567');

    // Area code
    assert.strictEqual(format('12345678'), '(1) 234-5678');
    assert.strictEqual(format('123456789'), '(12) 345-6789');
    assert.strictEqual(format('1234567890'), '(123) 456-7890');

    // Country code
    assert.strictEqual(format('1234567890'), '(123) 456-7890');
    assert.strictEqual(format('12345678901'), '+1 (234) 567-8901');
    assert.strictEqual(format('123456789012'), '+12 (345) 678-9012');
    assert.strictEqual(format('1234567890123'), '+123 (456) 789-0123');

    // Invalid
    assert.strictEqual(format('12345678901234'), '+123 (456) 789-0123 "4"');
    assert.strictEqual(format('123456789012345'), '+123 (456) 789-0123 "45"');
    assert.strictEqual(format('1234567890123456'), '+123 (456) 789-0123 "456"');
  });
});
