import { blur, fillIn, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { PhoneInput, bind } from '@nrg-ui/core';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

class Model {
  @tracked
  value: string = '';
}

module('Integration | Component | form/phone-input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const model = new Model();

    await render(<template>
      <PhoneInput @binding={{bind model "value"}} />
    </template>);

    assert.dom('input').hasAttribute('type', 'tel').hasClass('form-control');
  });

  test('it formats (default)', async function (assert) {
    const model = new Model();

    await render(<template>
      <PhoneInput @binding={{bind model "value"}} />
    </template>);

    await fillIn('input', '1111234567890123456789');
    await blur('input');

    assert.dom('input').hasValue('+111 (123) 456-7890 "123456789"');
    assert.strictEqual(model.value, '1111234567890123456789');

    await fillIn('input', '11234567890');
    await blur('input');

    assert.dom('input').hasValue('+1 (123) 456-7890');
    assert.strictEqual(model.value, '11234567890');

    await fillIn('input', '1234567890');
    await blur('input');

    assert.dom('input').hasValue('(123) 456-7890');
    assert.strictEqual(model.value, '1234567890');

    await fillIn('input', '4567890');
    await blur('input');

    assert.dom('input').hasValue('456-7890');
    assert.strictEqual(model.value, '4567890');

    await fillIn('input', '7890');
    await blur('input');

    assert.dom('input').hasValue('7890');
    assert.strictEqual(model.value, '7890');
  });

  test('it formats (custom)', async function (assert) {
    const model = new Model();

    const format = (value: string) => {
      return value.replace(/(\d)(\d+)/, '$1 $2');
    };

    await render(<template>
      <PhoneInput @binding={{bind model "value"}} @format={{format}} />
    </template>);

    await fillIn('input', '1111234567890123456789');
    await blur('input');

    assert.dom('input').hasValue('1 111234567890123456789');
    assert.strictEqual(model.value, '1111234567890123456789');

    await fillIn('input', '11234567890');
    await blur('input');

    assert.dom('input').hasValue('1 1234567890');
    assert.strictEqual(model.value, '11234567890');

    await fillIn('input', '1234567890');
    await blur('input');

    assert.dom('input').hasValue('1 234567890');
    assert.strictEqual(model.value, '1234567890');

    await fillIn('input', '4567890');
    await blur('input');

    assert.dom('input').hasValue('4 567890');
    assert.strictEqual(model.value, '4567890');

    await fillIn('input', '7890');
    await blur('input');

    assert.dom('input').hasValue('7 890');
    assert.strictEqual(model.value, '7890');
  });

  test('it allows unformatted input', async function (assert) {
    const model = new Model();

    await render(<template>
      <PhoneInput @binding={{bind model "value"}} />
    </template>);

    await fillIn('input', '1-12a345(6)78_90 ');
    await blur('input');

    assert.dom('input').hasValue('+1 (123) 456-7890');
    assert.strictEqual(model.value, '11234567890');
  });
});
