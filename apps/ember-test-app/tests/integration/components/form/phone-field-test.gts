import { fillIn, render, settled, click } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import PhoneField from '@nrg-ui/ember/components/form/phone-field';
import bind from '@nrg-ui/ember/helpers/bind';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

class Model {
  @tracked
  value: string = '';
}

async function clickAt(element: HTMLInputElement, position: number) {
  element.setSelectionRange(position, position);
  await click(element);
}

async function simulateBackspace(element: HTMLInputElement) {
  const cursorPosition = element.selectionStart ?? -1;
  const value = element.value;
  element.value =
    value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
  element.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
  element.dispatchEvent(
    new InputEvent('input', {
      key: 'Backspace',
      inputType: 'deleteContentBackward',
    }),
  );
  await settled();
}

async function simulateDelete(element: HTMLInputElement) {
  const cursorPosition = element.selectionStart ?? -1;
  const value = element.value;
  element.value =
    value.slice(0, cursorPosition) + value.slice(cursorPosition + 1);
  element.setSelectionRange(cursorPosition, cursorPosition);
  element.dispatchEvent(
    new InputEvent('input', {
      key: 'Delete',
      inputType: 'deleteContentForward',
    }),
  );
  await settled();
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
    assert.strictEqual(model.value, '11234567890');
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

  test('it allows for backspacing from end of string', async function (assert) {
    const model = new Model();
    model.value = '11234567890';
    await render(<template>
      <PhoneField @binding={{bind model "value"}} />
    </template>);
    const element = this.element.querySelector('input') as HTMLInputElement;
    await clickAt(element, element.value.length);
    for (let i = 0; i < 4; i++) {
      await simulateBackspace(element);
    }
    assert.strictEqual(model.value, '1123456');
    for (let i = 0; i < 3; i++) {
      await simulateBackspace(element);
    }
    assert.strictEqual(model.value, '1123');
    for (let i = 0; i < 3; i++) {
      await simulateBackspace(element);
    }
    assert.strictEqual(model.value, '1');
  });

  test('it allows for deleting from beginning of string', async function (assert) {
    const model = new Model();
    model.value = '1234567890123';
    await render(<template>
      <PhoneField @binding={{bind model "value"}} />
    </template>);
    const element = this.element.querySelector('input') as HTMLInputElement;
    await clickAt(element, 0);
    for (let i = 0; i < 4; i++) {
      await simulateDelete(element);
    }
    assert.strictEqual(model.value, '567890123');
    for (let i = 0; i < 3; i++) {
      await simulateDelete(element);
    }
    assert.strictEqual(model.value, '890123');
    for (let i = 0; i < 3; i++) {
      await simulateDelete(element);
    }
    assert.strictEqual(model.value, '123');
    for (let i = 0; i < 3; i++) {
      await simulateDelete(element);
    }
    assert.strictEqual(model.value, '');
  });

  test('it allows for backspacing from after special characters', async function (assert) {
    const model = new Model();
    model.value = '1234567890123';
    await render(<template>
      <PhoneField @binding={{bind model "value"}} />
    </template>);
    const element = this.element.querySelector('input') as HTMLInputElement;
    await clickAt(element, 11);
    await simulateBackspace(element);
    assert.strictEqual(model.value, '123457890123');
    assert.strictEqual(element.selectionStart, 10);

    await simulateBackspace(element);
    await simulateBackspace(element);
    assert.strictEqual(model.value, '1237890123');
    assert.strictEqual(element.selectionStart, 6);

    await simulateBackspace(element);
    await simulateBackspace(element);
    await simulateBackspace(element);
    assert.strictEqual(model.value, '7890123');
    assert.strictEqual(element.selectionStart, 0);
  });

  test('it allows for deleting from before special characters', async function (assert) {
    const model = new Model();
    model.value = '1234567890123';
    await render(<template>
      <PhoneField @binding={{bind model "value"}} />
    </template>);
    const element = this.element.querySelector('input') as HTMLInputElement;
    await clickAt(element, 4);
    await simulateDelete(element);
    assert.strictEqual(model.value, '123567890123');
    assert.strictEqual(element.selectionStart, 6);

    await clickAt(element, 0);
    await simulateDelete(element);
    assert.strictEqual(model.value, '23567890123');
    assert.strictEqual(element.selectionStart, 1);
  });
});
