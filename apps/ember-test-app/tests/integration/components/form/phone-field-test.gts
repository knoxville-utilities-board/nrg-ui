import { fillIn, render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import PhoneField from '@nrg-ui/ember/components/form/phone-field';
import bind from '@nrg-ui/ember/helpers/bind';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

class Model {
  @tracked
  value: string = '';
}

module('Integration | Component | form/phone-field', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const model = new Model();

    await render(<template>
      <PhoneField @binding={{bind model "value"}} />
    </template>);

    assert.dom('input').hasAttribute('type', 'tel').hasClass('form-control');
  });

  test('it displays formatted phone numbers', async function (assert) {
    const model = new Model();

    await render(<template>
      <PhoneField @binding={{bind model "value"}} />
    </template>);

    await fillIn('input', '11234567890');
    assert.dom('input').hasValue('+1 (123) 456-7890');

    await fillIn('input', '1234567890');
    assert.dom('input').hasValue('(123) 456-7890');

    await fillIn('input', '4567890');
    assert.dom('input').hasValue('456-7890');

    await fillIn('input', '7890');
    assert.dom('input').hasValue('7890');
  });

  test('it binds unformatted numbers', async function (assert) {
    const model = new Model();

    await render(<template>
      <PhoneField @binding={{bind model "value"}} />
    </template>);

    await fillIn('input', '+1 (123) 456-7890');
    assert.strictEqual(model.value, '11234567890');

    await fillIn('input', '(123) 456-7890');
    assert.strictEqual(model.value, '1234567890');

    await fillIn('input', '456-7890');
    assert.strictEqual(model.value, '4567890');
  });

  test('it unformats pasted inputs', async function (assert) {
    const model = new Model();

    await render(<template>
      <PhoneField @binding={{bind model "value"}} />
    </template>);

    await fillIn('input', '1-12a345(6)78_90 ');
    assert.dom('input').hasValue('+1 (123) 456-7890');
  });

  test('it reacts to changes in model', async function (assert) {
    const model = new Model();

    await render(<template>
      <PhoneField @binding={{bind model "value"}} />
    </template>);
    assert.dom('input').hasValue('');
    model.value = '11234567890';
    await settled();
    assert.dom('input').hasValue('+1 (123) 456-7890');
  });
});
