import { click, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { RadioGroup, bind } from '@nrg-ui/core';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

import type { Optional } from '@nrg-ui/core';

class Model {
  [key: string]: unknown;

  @tracked
  value: string = '';
}

module('Integration | Component | form/radio-group', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a radio group', async function (assert) {
    assert.expect(3);

    const model = new Model();
    const actionHandler = (value: Optional<string>) => {
      assert.strictEqual(value, '1');
    };

    await render(
      <template>
        <RadioGroup
          @name="test"
          @binding={{bind model "value"}}
          @onChange={{actionHandler}}
          as |Group|
        >
          <Group.Radio @option="1" />
          <Group.Radio @option="2" />
        </RadioGroup>
      </template>,
    );

    await click('input');

    assert.dom('div').hasClass('form-control');

    await render(
      <template>
        <RadioGroup
          @name="test"
          @basic={{true}}
          @binding={{bind model "value"}}
          @onChange={{actionHandler}}
          as |Group|
        >
          <Group.Radio @option="1" />
          <Group.Radio @option="2" />
        </RadioGroup>
      </template>,
    );

    assert.dom('div').hasClass('form-control-plaintext');
  });

  test('when a radio option is selected updates the model', async function (assert) {
    assert.expect(2);

    const model = new Model();
    const actionHandler = (value: Optional<string>) => {
      assert.strictEqual(value, '1');
    };

    await render(
      <template>
        <RadioGroup
          @binding={{bind model "value"}}
          @onChange={{actionHandler}}
          as |Group|
        >
          <Group.Radio @option="1" />
          <Group.Radio @option="2" />
        </RadioGroup>
      </template>,
    );

    await click('input');

    assert.strictEqual(model.value, '1');
  });

  test('when the model aready has a value the radio button will be checked', async function (assert) {
    assert.expect(1);

    const model = new Model();

    model.value = '1';

    await render(
      <template>
        <RadioGroup @binding={{bind model "value"}} as |Group|>
          <Group.Radio @option="1" />
          <Group.Radio @option="2" />
        </RadioGroup>
      </template>,
    );

    assert.dom('.form-check > input').isChecked();
  });
});
