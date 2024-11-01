import { render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { Bind as bind, Datetime } from '@nrg-ui/core';
import dayjs, { type Dayjs } from 'dayjs';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

class Model {
  @tracked
  value?: Dayjs = dayjs();
}

const testDate = new Date(2013, 2, 3, 4, 10);

module('Integration | Component | form/datetime', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.model = new Model();
  });

  test('it renders (empty)', async function (assert) {
    const { model } = this;

    model.value = undefined;

    await render(<template>
      <Datetime @binding={{bind model "value"}} />
    </template>);

    assert.dom('input').hasValue('');
  });

  test('it renders (with default value)', async function (assert) {
    const { model } = this;

    await render(<template>
      <Datetime @binding={{bind model "value"}} @useDefaultValue={{true}} />
    </template>);

    assert.dom('input').hasValue();

    assert.true(dayjs().isSame(model.value, 'day'));
  });

  test('it renders (datetime)', async function (assert) {
    const { model } = this;
    model.value = testDate;

    await render(<template>
      <Datetime @binding={{bind model "value"}} @type="datetime" />
    </template>);

    assert.dom('input').hasValue('March 3, 2013 4:10 AM');
  });

  test('it renders (date)', async function (assert) {
    const { model } = this;
    model.value = testDate;

    await render(<template>
      <Datetime @binding={{bind model "value"}} />
    </template>);

    assert.dom('input').hasValue('March 3, 2013');
  });

  test('it renders (time)', async function (assert) {
    const { model } = this;
    model.value = testDate;

    await render(<template>
      <Datetime @binding={{bind model "value"}} @type="time" />
    </template>);

    assert.dom('input').hasValue('4:10 AM');
  });

  test('it renders (block)', async function (assert) {
    const { model } = this;

    await render(<template>
      <Datetime @binding={{bind model "value"}}>
        <span>template block text</span>
      </Datetime>
    </template>);

    assert.dom().hasText('template block text');
  });

  test('field can be marked readonly', async function (assert) {
    const { model } = this;

    await render(<template>
      <Datetime @binding={{bind model "value"}} @readonly={{true}} />
    </template>);

    assert.dom('input').isNotDisabled();
    assert.dom('input').hasAttribute('readonly');
  });
});
