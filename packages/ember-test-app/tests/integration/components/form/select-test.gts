import { click, find, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import Select from '@nrg-ui/ember/components/form/select';
import bind from '@nrg-ui/ember/helpers/bind';
import { tracked } from '@glimmer/tracking';

module('Integration | components | form/select', function (hooks) {
  setupRenderingTest(hooks);

  class Model {
    @tracked
    value: string = 'Hello, world!';
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
    await render(<template>
      <Select @binding={{bind model "value"}} />
    </template>);
    assert.dom('.form-select').hasText('Select an Option');
  });

  test('it renders custom empty block', async function (assert) {
    const model = new Model();
    await render(<template>
      <Select @binding={{bind model "value"}}>
        <:empty>
          Custom Empty Block
        </:empty>
      </Select>
    </template>);
    assert.dom('.form-select').hasText('Custom Empty Block');
  });

  test('it opens when clicked', async function (assert) {
    const model = new Model();
    await render(<template>
      <Select @binding={{bind model "value"}} />
    </template>);
    await click('.form-select');
    assert.dom('.dropdown-menu').hasClass('show');
  });
  test('it closes when selecting an option', async function (assert) {
    const model = new Model();
    await render(<template>
      <Select @binding={{bind model "value"}} @options={{stringOptions}} />
    </template>);
    await click('.form-select');
    assert.dom('.dropdown-menu').hasClass('show');
    await click(find('.dropdown-menu li'));
    assert.dom('.dropdown-menu').doesNotHaveClass('show');
  });

  test('it renders string options', async function (assert) {
    const model = new Model();
    await render(<template>
      <Select @binding={{bind model "value"}} @options={{stringOptions}} />
    </template>);

    assert.dom('.form-select').hasText('Select an Option');

    await click('.form-select');
    assert
      .dom('.dropdown-menu')
      .containsText('Option 1')
      .containsText('Option 2')
      .containsText('Option 3');

    await click(find('.dropdown-menu li'));
    assert.dom('.form-select').hasText('Option 1');
    assert.strictEqual(model.value, 'Option 1');
  });

  test('it renders label-value options', async function (assert) {
    const model = new Model();
    await render(<template>
      <Select @binding={{bind model "value"}} @options={{objectOptions}} />
    </template>);

    assert.dom('.form-select').hasText('Select an Option');

    await click('.form-select');
    assert
      .dom('.dropdown-menu')
      .containsText('label 1')
      .containsText('label 2')
      .containsText('label 3');

    await click(find('.dropdown-menu li'));
    assert.dom('.form-select').hasText('label 1');
    assert.strictEqual(model.value, 'value 1');
  });

  test('it renders custom object options', async function (assert) {
    const model = new Model();
    await render(<template>
      <Select
        @binding={{bind model "value"}}
        @options={{objectOptions}}
        @displayPath="key"
        @serializationPath="id"
      />
    </template>);

    assert.dom('.form-select').hasText('Select an Option');

    await click('.form-select');
    assert
      .dom('.dropdown-menu')
      .containsText('key 1')
      .containsText('key 2')
      .containsText('key 3');

    await click(find('.dropdown-menu li'));
    assert.dom('.form-select').hasText('key 1');
    assert.strictEqual(model.value, 1);
  });

  test('it renders yielded options', async function (assert) {
    const model = new Model();
    await render(<template>
      <Select @binding={{bind model "value"}} @options={{objectOptions}}>
        <:option as |option|>
          {{option.key}}
        </:option>
      </Select>
    </template>);

    assert.dom('.form-select').hasText('Select an Option');

    await click('.form-select');
    assert
      .dom('.dropdown-menu')
      .containsText('key 1')
      .containsText('key 2')
      .containsText('key 3');

    await click(find('.dropdown-menu li'));
    assert.dom('.form-select').hasText('key 1');
    assert.strictEqual(model.value, 'value 1');
  });

  test('it renders custom display', async function (assert) {
    const model = new Model();
    model.value = 'value 2';
    await render(<template>
      <Select @binding={{bind model "value"}} @options={{objectOptions}}>
        <:display as |option|>
          Custom Display
          {{option.id}}
        </:display>
      </Select>
    </template>);

    assert.dom('.form-select').hasText('Custom Display 2');

    await click('.form-select');
    assert
      .dom('.dropdown-menu')
      .containsText('label 1')
      .containsText('label 2')
      .containsText('label 3');
  });

  test('it renders active item', async function (assert) {
    const model = new Model();
    model.value = 'value 2';
    await render(<template>
      <Select @binding={{bind model "value"}} @options={{objectOptions}} />
    </template>);

    assert.dom('.dropdown-menu .dropdown-item.active').hasText('label 2');
  });
});
