import { click, render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { Bind as bind, CheckboxGroup } from '@nrg-ui/core';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | form/checkbox-group', function (hooks) {
  setupRenderingTest(hooks);

  class Model {
    @tracked
    v1: boolean = false;

    @tracked
    v2: boolean = false;
  }

  test('it renders', async function (assert) {
    const model = new Model();
    await render(<template>
      <CheckboxGroup as |Item|>
        <Item
          @binding={{bind model "v1"}}
          @id="my-id-1"
          @label="This is checkbox 1"
        />
        <Item
          @binding={{bind model "v2"}}
          @id="my-id-2"
          @label="This is checkbox 2"
        />
      </CheckboxGroup>
    </template>);

    const [cb1, cb2] = this.element.querySelectorAll(
      '.form-control > .form-check > input',
    );

    assert
      .dom(cb1)
      .hasAttribute('role', 'checkbox')
      .hasAttribute('type', 'checkbox')
      .hasClass('form-check-input')
      .hasValue('false')
      .isNotChecked();

    assert
      .dom(cb2)
      .hasAttribute('role', 'checkbox')
      .hasAttribute('type', 'checkbox')
      .hasClass('form-check-input')
      .hasValue('false')
      .isNotChecked();

    let labelId = cb1.id;
    assert.dom(`[for=${labelId}]`).hasText('This is checkbox 1');

    labelId = cb2.id;
    assert.dom(`[for=${labelId}]`).hasText('This is checkbox 2');

    model.v1 = true;
    await settled();

    assert.dom(cb1).hasValue('true').isChecked();
    assert.dom(cb2).hasValue('false').isNotChecked();

    model.v2 = true;
    await settled();

    assert.dom(cb1).hasValue('true').isChecked();
    assert.dom(cb2).hasValue('true').isChecked();

    model.v1 = false;
    await settled();

    assert.dom(cb1).hasValue('false').isNotChecked();
    assert.dom(cb2).hasValue('true').isChecked();
  });

  test('it renders (block)', async function (assert) {
    const model = new Model();
    await render(<template>
      <CheckboxGroup as |Item|>
        <Item @binding={{bind model "v1"}} @id="my-id-1">
          <span>This is checkbox 1</span>
        </Item>
        <Item @binding={{bind model "v2"}} @id="my-id-2">
          <span>This is checkbox 2</span>
        </Item>
      </CheckboxGroup>
    </template>);

    const [cb1, cb2] = this.element.querySelectorAll(
      '.form-control > .form-check > input',
    );

    assert
      .dom(cb1)
      .hasAttribute('role', 'checkbox')
      .hasAttribute('type', 'checkbox')
      .hasClass('form-check-input')
      .hasValue('false')

      .isNotChecked();

    assert
      .dom(cb2)
      .hasAttribute('role', 'checkbox')
      .hasAttribute('type', 'checkbox')
      .hasClass('form-check-input')
      .hasValue('false')
      .isNotChecked();

    let labelId = cb1.id;
    assert.dom(`[for=${labelId}] > span`).hasText('This is checkbox 1');

    labelId = cb2.id;
    assert.dom(`[for=${labelId}] > span`).hasText('This is checkbox 2');

    model.v1 = true;
    await settled();

    assert.dom(cb1).hasValue('true').isChecked();
    assert.dom(cb2).hasValue('false').isNotChecked();

    model.v2 = true;
    await settled();

    assert.dom(cb1).hasValue('true').isChecked();
    assert.dom(cb2).hasValue('true').isChecked();

    model.v1 = false;
    await settled();

    assert.dom(cb1).hasValue('false').isNotChecked();
  });

  test('it renders (switch)', async function (assert) {
    const model = new Model();
    await render(<template>
      <CheckboxGroup @type="switch" as |Item|>
        <Item
          @binding={{bind model "v1"}}
          @id="my-id-1"
          @label="This is checkbox 1"
        />
        <Item
          @binding={{bind model "v2"}}
          @id="my-id-2"
          @label="This is checkbox 2"
        />
      </CheckboxGroup>
    </template>);

    assert.dom('.form-control > div').hasClass('form-switch');

    const [cb1, cb2] = this.element.querySelectorAll(
      '.form-control > .form-check > input',
    );

    assert
      .dom(cb1)
      .hasAttribute('role', 'switch')
      .hasAttribute('type', 'checkbox')
      .hasClass('form-check-input')
      .hasValue('false')
      .isNotChecked();

    assert
      .dom(cb2)
      .hasAttribute('role', 'switch')
      .hasAttribute('type', 'checkbox')
      .hasClass('form-check-input')
      .hasValue('false')
      .isNotChecked();

    let labelId = cb1.id;
    assert.dom(`[for=${labelId}]`).hasText('This is checkbox 1');

    labelId = cb2.id;
    assert.dom(`[for=${labelId}]`).hasText('This is checkbox 2');

    model.v1 = true;
    await settled();

    assert.dom(cb1).hasValue('true').isChecked();
    assert.dom(cb2).hasValue('false').isNotChecked();

    model.v2 = true;
    await settled();

    assert.dom(cb1).hasValue('true').isChecked();
    assert.dom(cb2).hasValue('true').isChecked();

    model.v1 = false;
    await settled();

    assert.dom(cb1).hasValue('false').isNotChecked();
    assert.dom(cb2).hasValue('true').isChecked();
  });

  test('it works', async function (assert) {
    const model = new Model();
    await render(<template>
      <CheckboxGroup as |Item|>
        <Item
          @binding={{bind model "v1"}}
          @id="my-id-1"
          @label="This is checkbox 1"
        />
        <Item
          @binding={{bind model "v2"}}
          @id="my-id-2"
          @label="This is checkbox 2"
        />
      </CheckboxGroup>
    </template>);

    const [cb1, cb2] = this.element.querySelectorAll(
      '.form-control > .form-check > input',
    );

    assert.dom(cb1).hasValue('false').isNotChecked();

    model.v1 = true;
    await settled();

    assert.dom(cb1).hasValue('true').isChecked();

    await click(cb1);

    assert.dom(cb1).hasValue('false').isNotChecked();
    assert.false(model.v1);

    await click(cb1);

    assert.dom(cb1).hasValue('true').isChecked();
    assert.true(model.v1);

    model.v2 = true;
    await settled();

    assert.dom(cb2).hasValue('true').isChecked();

    await click(cb2);

    assert.dom(cb2).hasValue('false').isNotChecked();
    assert.false(model.v2);

    await click(cb2);

    assert.dom(cb2).hasValue('true').isChecked();
    assert.true(model.v2);
  });
});
