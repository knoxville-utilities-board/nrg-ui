import { click, render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { Bind as bind, Checkbox } from '@nrg-ui/core';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | form/checkbox', function (hooks) {
  setupRenderingTest(hooks);

  class Model {
    @tracked
    value: boolean = false;
  }

  test('it renders', async function (assert) {
    const model = new Model();
    await render(<template>
      <Checkbox
        @binding={{bind model "value"}}
        @id="my-id"
        @label="This is a checkbox"
      />
    </template>);

    assert
      .dom('.form-check > input')
      .hasAttribute('role', 'checkbox')
      .hasAttribute('type', 'checkbox')
      .hasClass('form-check-input')
      .hasValue('false')
      .isNotChecked();

    const labelId = this.element.querySelector('.form-check > input').id;

    assert
      .dom('.form-check > label')
      .hasAttribute('for', labelId)
      .hasText('This is a checkbox');

    model.value = true;
    await settled();

    assert.dom('.form-check > input').hasValue('true').isChecked();
  });

  test('it renders (block)', async function (assert) {
    const model = new Model();
    await render(<template>
      <Checkbox @binding={{bind model "value"}} @id="my-id">
        <span>This is a checkbox</span>
      </Checkbox>
    </template>);

    assert
      .dom('.form-check > input')
      .hasAttribute('role', 'checkbox')
      .hasAttribute('type', 'checkbox')
      .hasClass('form-check-input')
      .hasValue('false')
      .isNotChecked();

    const labelId = this.element.querySelector('.form-check > input').id;

    assert.dom('.form-check > label').hasAttribute('for', labelId);
    assert.dom('.form-check > label > span').hasText('This is a checkbox');

    model.value = true;
    await settled();

    assert.dom('.form-check > input').hasValue('true').isChecked();
  });

  test('it renders (switch)', async function (assert) {
    const model = new Model();
    await render(<template>
      <Checkbox
        @binding={{bind model "value"}}
        @id="my-id"
        @label="This is a checkbox"
        @type="switch"
      />
    </template>);

    assert.dom('div').hasClass('form-switch');

    assert
      .dom('.form-check > input')
      .hasAttribute('role', 'switch')
      .hasAttribute('type', 'checkbox')
      .hasClass('form-check-input')
      .hasValue('false')
      .isNotChecked();

    const labelId = this.element.querySelector('.form-check > input').id;

    assert
      .dom('.form-check > label')
      .hasAttribute('for', labelId)
      .hasText('This is a checkbox');

    model.value = true;
    await settled();

    assert.dom('.form-check > input').hasValue('true').isChecked();
  });

  test('it works', async function (assert) {
    const model = new Model();
    await render(<template>
      <Checkbox @binding={{bind model "value"}} @label="This is a checkbox" />
    </template>);

    assert.dom('.form-check > input').hasValue('false').isNotChecked();

    model.value = true;
    await settled();

    assert.dom('.form-check > input').hasValue('true').isChecked();

    await click('.form-check > input');

    assert.dom('.form-check > input').hasValue('false').isNotChecked();
    assert.false(model.value);

    await click('.form-check > input');

    assert.dom('.form-check > input').hasValue('true').isChecked();
    assert.true(model.value);
  });
});
