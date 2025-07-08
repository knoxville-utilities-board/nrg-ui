import { click, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { Select, bind } from '@nrg-ui/core';
import { setupIntl } from 'ember-intl/test-support';
// @ts-expect-error Ember keyboard doesn't currently ship types
// https://github.com/adopted-ember-addons/ember-keyboard/issues/464
import { triggerKeyDown } from 'ember-keyboard';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | form/select', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  class Model {
    @tracked
    value: unknown = 'Hello, world!';
  }

  const stringOptions = ['Option 1', 'Option 2', 'Option 3'];
  const objectOptions = [
    {
      id: 1,
      key: 'key 1',
      label: 'label 1',
      value: 'value 1',
    },
    {
      id: 2,
      key: 'key 2',
      label: 'label 2',
      value: 'value 2',
    },
    {
      id: 3,
      key: 'key 3',
      label: 'label 3',
      value: 'value 3',
    },
  ];

  test('it renders when empty', async function (assert) {
    const model = new Model();
    await render(
      <template><Select @binding={{bind model "value"}} /></template>,
    );
    assert.dom('.selected-display').hasText('Select an Option');
  });

  test('it renders custom empty block', async function (assert) {
    const model = new Model();
    await render(
      <template>
        <Select @binding={{bind model "value"}}>
          <:empty>
            Custom Empty Block
          </:empty>
        </Select>
      </template>,
    );
    assert.dom('.selected-display').hasText('Custom Empty Block');
  });

  test('it opens when clicked', async function (assert) {
    const model = new Model();
    await render(
      <template>
        <Select @binding={{bind model "value"}} @options={{stringOptions}} />
      </template>,
    );
    await click('button');
    assert.dom('.dropdown-menu').doesNotHaveClass('hidden');
  });

  test('it closes when selecting an option', async function (assert) {
    const model = new Model();
    await render(
      <template>
        <Select @binding={{bind model "value"}} @options={{stringOptions}} />
      </template>,
    );
    await click('button');
    assert.dom('.dropdown-menu').doesNotHaveClass('hidden');
    await click('.dropdown-menu li');
    assert.dom('.dropdown-menu').hasClass('hidden');
  });

  test('it renders string options', async function (assert) {
    const model = new Model();
    await render(
      <template>
        <Select @binding={{bind model "value"}} @options={{stringOptions}} />
      </template>,
    );

    assert.dom('.selected-display').hasText('Select an Option');

    await click('button');
    assert
      .dom('.dropdown-menu')
      .containsText('Option 1')
      .containsText('Option 2')
      .containsText('Option 3');

    await click('.dropdown-menu li');
    assert.dom('.selected-display').hasText('Option 1');
    assert.strictEqual(model.value, 'Option 1');
  });

  test('it renders label-value options', async function (assert) {
    const model = new Model();
    await render(
      <template>
        <Select @binding={{bind model "value"}} @options={{objectOptions}} />
      </template>,
    );

    assert.dom('.selected-display').hasText('Select an Option');

    await click('button');
    assert
      .dom('.dropdown-menu')
      .containsText('label 1')
      .containsText('label 2')
      .containsText('label 3');

    await click('.dropdown-menu li');
    assert.dom('.selected-display').hasText('label 1');
    assert.strictEqual(model.value, 'value 1');
  });

  test('it renders custom object options', async function (assert) {
    const model = new Model();
    await render(
      <template>
        <Select
          @binding={{bind model "value"}}
          @options={{objectOptions}}
          @displayPath="key"
          @serializationPath="id"
        />
      </template>,
    );

    assert.dom('.selected-display').hasText('Select an Option');

    await click('button');
    assert
      .dom('.dropdown-menu')
      .containsText('key 1')
      .containsText('key 2')
      .containsText('key 3');

    await click('.dropdown-menu li');
    assert.dom('.selected-display').hasText('key 1');
    assert.strictEqual(model.value, 1);
  });

  test('it renders yielded options', async function (assert) {
    const model = new Model();
    await render(
      <template>
        <Select @binding={{bind model "value"}} @options={{objectOptions}}>
          <:option as |option|>
            {{option.key}}
          </:option>
        </Select>
      </template>,
    );

    assert.dom('.selected-display').hasText('Select an Option');

    await click('button');
    assert
      .dom('.dropdown-menu')
      .containsText('key 1')
      .containsText('key 2')
      .containsText('key 3');

    await click('.dropdown-menu li');
    assert.dom('.selected-display').hasText('key 1');
    assert.strictEqual(model.value, 'value 1');
  });

  test('it renders custom display', async function (assert) {
    const model = new Model();
    model.value = 'value 2';
    await render(
      <template>
        <Select @binding={{bind model "value"}} @options={{objectOptions}}>
          <:display as |option|>
            Custom Display
            {{option.id}}
          </:display>
        </Select>
      </template>,
    );

    assert.dom('.selected-display').hasText('Custom Display 2');

    await click('button');
    assert
      .dom('.dropdown-menu')
      .containsText('label 1')
      .containsText('label 2')
      .containsText('label 3');
  });

  test('it renders active item', async function (assert) {
    const model = new Model();
    model.value = 'value 2';
    await render(
      <template>
        <Select @binding={{bind model "value"}} @options={{objectOptions}} />
      </template>,
    );

    assert.dom('.dropdown-item.active').hasText('label 2');
  });

  test('it opens and closes via keyboard when focused', async function (assert) {
    const model = new Model();
    await render(
      <template>
        <Select @binding={{bind model "value"}} @options={{objectOptions}} />
      </template>,
    );

    await click('button');
    assert.dom('.dropdown-menu').doesNotHaveClass('hidden');

    await triggerKeyDown('Escape');
    assert.dom('.dropdown-menu').hasClass('hidden');

    await triggerKeyDown('Space');
    assert.dom('.dropdown-menu').doesNotHaveClass('hidden');

    await triggerKeyDown('Tab');
    assert.dom('.dropdown-menu').hasClass('hidden');

    await triggerKeyDown('Enter');
    assert.dom('.dropdown-menu').doesNotHaveClass('hidden');

    await triggerKeyDown('Enter');
    assert.dom('.dropdown-menu').hasClass('hidden');
  });

  test('it allows items to be selected via keyboard', async function (assert) {
    const model = new Model();
    await render(
      <template>
        <Select @binding={{bind model "value"}} @options={{objectOptions}} />
      </template>,
    );
    assert.dom('.selected-display').hasText('Select an Option');

    await click('button');
    await triggerKeyDown('ArrowDown');
    assert.dom('.dropdown-item.active').hasText('label 1');

    await triggerKeyDown('ArrowDown');
    assert.dom('.dropdown-item.active').hasText('label 2');

    await triggerKeyDown('Enter');
    assert.dom('.dropdown-menu').doesNotHaveClass('show');

    assert.strictEqual(model.value, 'value 2');
    assert.dom('.selected-display').hasText('label 2');
  });

  test('it displays currently active item when reopening', async function (assert) {
    const model = new Model();
    model.value = 'value 2';
    await render(
      <template>
        <Select @binding={{bind model "value"}} @options={{objectOptions}} />
      </template>,
    );
    assert.dom('.selected-display').hasText('label 2');

    await click('button');
    assert.dom('.dropdown-item.active').hasText('label 2');

    await triggerKeyDown('ArrowUp');
    assert.dom('.dropdown-item.active').hasText('label 1');

    await triggerKeyDown('Space');
    assert.strictEqual(model.value, 'value 1');
    assert.dom('.selected-display').hasText('label 1');
  });

  test('it disallows arrow up from first item', async function (assert) {
    const model = new Model();
    model.value = 'value 1';
    await render(
      <template>
        <Select @binding={{bind model "value"}} @options={{objectOptions}} />
      </template>,
    );

    assert.dom('.selected-display').hasText('label 1');

    await click('button');
    assert.dom('.dropdown-item.active').hasText('label 1');

    await triggerKeyDown('ArrowUp');
    assert.dom('.dropdown-item.active').hasText('label 1');

    await triggerKeyDown('Tab');
    assert.strictEqual(model.value, 'value 1');
    assert.dom('.selected-display').hasText('label 1');
  });

  test('it disallows arrow down from last item', async function (assert) {
    const model = new Model();
    model.value = 'value 3';
    await render(
      <template>
        <Select @binding={{bind model "value"}} @options={{objectOptions}} />
      </template>,
    );
    assert.dom('.selected-display').hasText('label 3');

    await click('button');
    assert.dom('.dropdown-item.active').hasText('label 3');

    await triggerKeyDown('ArrowDown');
    assert.dom('.dropdown-item.active').hasText('label 3');

    await triggerKeyDown('Tab');
    assert.strictEqual(model.value, 'value 3');
    assert.dom('.selected-display').hasText('label 3');
  });
});
