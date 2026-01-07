import { click, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import MultiSelect from '@nrg-ui/core/components/form/multi-select';
import { bind } from '@nrg-ui/core/helpers/bind';
import { setupIntl } from 'ember-intl/test-support';
// @ts-expect-error Ember keyboard doesn't currently ship types
// https://github.com/adopted-ember-addons/ember-keyboard/issues/464
import { triggerKeyDown } from 'ember-keyboard';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | form/multi-select', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  class Model {
    @tracked
    value: unknown[] = [];
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

    await render(<template><MultiSelect @binding={{bind model "value"}} /></template>);

    assert.dom('.selected-display').hasText('Select at least one option');
  });

  test('it renders custom empty block', async function (assert) {
    const model = new Model();
    model.value = [];

    await render(
      <template>
        <MultiSelect @binding={{bind model "value"}}>
          <:empty>
            Custom Empty Block
          </:empty>
        </MultiSelect>
      </template>,
    );

    assert.dom('.selected-display').hasText('Custom Empty Block');
  });

  test('it opens when clicked', async function (assert) {
    const model = new Model();

    await render(
      <template>
        <MultiSelect @binding={{bind model "value"}} @options={{stringOptions}} />
      </template>,
    );

    await click('button');
    assert.dom('.dropdown-menu').doesNotHaveClass('hidden');
  });

  test('it renders string options', async function (assert) {
    const model = new Model();
    await render(
      <template>
        <MultiSelect @binding={{bind model "value"}} @options={{stringOptions}} />
      </template>,
    );

    assert.dom('.selected-display').hasText('Select at least one option');

    await click('button');
    assert
      .dom('.dropdown-menu')
      .containsText('Option 1')
      .containsText('Option 2')
      .containsText('Option 3');

    await click('.dropdown-menu li');
    assert.dom('.selected-display > span:first-child').hasText('Option 1');
    assert.deepEqual(model.value, ['Option 1']);
  });

  test('it renders label-value options', async function (assert) {
    const model = new Model();
    await render(
      <template>
        <MultiSelect @binding={{bind model "value"}} @options={{objectOptions}} />
      </template>,
    );

    assert.dom('.selected-display').hasText('Select at least one option');

    await click('button');
    assert
      .dom('.dropdown-menu')
      .containsText('label 1')
      .containsText('label 2')
      .containsText('label 3');

    await click('.dropdown-menu li');
    assert.dom('.selected-display > span:first-child').hasText('label 1');
    assert.deepEqual(model.value, ['value 1']);
  });

  test('it renders custom object options', async function (assert) {
    const model = new Model();
    await render(
      <template>
        <MultiSelect
          @binding={{bind model "value"}}
          @options={{objectOptions}}
          @displayPath="key"
          @serializationPath="id"
        />
      </template>,
    );

    assert.dom('.selected-display').hasText('Select at least one option');

    await click('button');
    assert.dom('.dropdown-menu').containsText('key 1').containsText('key 2').containsText('key 3');

    await click('.dropdown-menu li');
    assert.dom('.selected-display > span:first-child').hasText('key 1');
    assert.deepEqual(model.value, [1]);
  });

  test('it renders yielded options', async function (assert) {
    const model = new Model();
    await render(
      <template>
        <MultiSelect @binding={{bind model "value"}} @options={{objectOptions}}>
          <:option as |option|>
            {{option.key}}
          </:option>
        </MultiSelect>
      </template>,
    );

    assert.dom('.selected-display').hasText('Select at least one option');

    await click('button');
    assert.dom('.dropdown-menu').containsText('key 1').containsText('key 2').containsText('key 3');

    await click('.dropdown-menu li');
    assert.dom('.selected-display > span:first-child').hasText('label 1');
    assert.deepEqual(model.value, ['value 1']);
  });

  test('it renders custom display', async function (assert) {
    const model = new Model();
    model.value = [objectOptions[1]];
    await render(
      <template>
        <MultiSelect @binding={{bind model "value"}} @options={{objectOptions}}>
          <:display as |option|>
            {{#each option as |o|}}
              Custom Display
              {{o.id}}
            {{/each}}
          </:display>
        </MultiSelect>
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

  test('it opens and closes via keyboard when focused', async function (assert) {
    const model = new Model();
    await render(
      <template>
        <MultiSelect @binding={{bind model "value"}} @options={{objectOptions}} />
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
        <MultiSelect @binding={{bind model "value"}} @options={{objectOptions}} />
      </template>,
    );
    assert.dom('.selected-display').hasText('Select at least one option');

    await click('button');
    await triggerKeyDown('ArrowDown');
    assert.dom('.dropdown-item.active').hasText('label 1');

    await triggerKeyDown('ArrowDown');
    assert.dom('.dropdown-item.active').hasText('label 2');

    await triggerKeyDown('Enter');
    assert.dom('.dropdown-menu').doesNotHaveClass('show');

    assert.deepEqual(model.value, ['value 2']);
    assert.dom('.selected-display > span:first-child').hasText('label 2');
  });
});
