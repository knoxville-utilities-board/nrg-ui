import { render, click } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import RadioGroup from '@nrg-ui/ember/components/form/radio-group';
import bind from '@nrg-ui/ember/helpers/bind';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

class Model {
  @tracked
  value: string = '';
}

module('Integration | components | form | radio-group', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a radio group', async function (assert) {
    assert.expect(3);

    const model = new Model();
    const actionHandler = (value) => {
      assert.strictEqual(value, '1');
    };

    await render(<template>
      <RadioGroup
        @name="test"
        @binding={{bind model "value"}}
        @onChange={{actionHandler}}
        as |Group|
      >
        <Group.Radio @option="1" />
        <Group.Radio @option="2" />
      </RadioGroup>
    </template>);

    await click('input');

    assert.dom('div').hasClass('form-control');

    await render(<template>
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
    </template>);

    assert.dom('div').hasClass('form-control-plaintext');
  });

  test('when a radio option is selected updates the model', async function (assert) {
    assert.expect(2);

    const model = new Model();
    const actionHandler = (value) => {
      assert.strictEqual(value, '1');
    };

    await render(<template>
      <RadioGroup
        @binding={{bind model "value"}}
        @onChange={{actionHandler}}
        as |Group|
      >
        <Group.Radio @option="1" />
        <Group.Radio @option="2" />
      </RadioGroup>
    </template>);

    await click('input');

    assert.strictEqual(model.value, '1');
  });

  test('when the model aready has a value the radio button will be checked', async function (assert) {
    assert.expect(1);

    const model = new Model();

    model.value = '1';

    await render(<template>
      <RadioGroup @binding={{bind model "value"}} as |Group|>
        <Group.Radio @option="1" />
        <Group.Radio @option="2" />
      </RadioGroup>
    </template>);

    assert.dom('.form-check > input').isChecked();
  });
});
