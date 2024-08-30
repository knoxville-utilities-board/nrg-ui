import { blur, fillIn, focus, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import NumberInput from '@nrg-ui/ember/components/form/number-input';
import bind from '@nrg-ui/ember/helpers/bind';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

class Model {
  @tracked
  value: number = 42;
}

module('Integration | Component | form/number-input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(7);
    const model = new Model();

    const actionHandler = (num) => {
      assert.strictEqual(num, 36);
    };

    await render(<template>
      <NumberInput
        @binding={{bind model "value"}}
        @onChange={{actionHandler}}
      />
    </template>);

    assert
      .dom('input')
      .hasAttribute('type', 'text')
      .hasClass('form-control')
      .hasValue('42');

    await fillIn('div > input', '36');

    assert.dom('div > input').hasValue('36');

    await render(<template>
      <NumberInput
        @binding={{bind model "value"}}
        @basic={{true}}
        @onChange={{actionHandler}}
      />
    </template>);

    assert.dom('div > input').hasClass('form-control-plaintext');

    await focus('div > input');

    assert.dom('div > input').hasAttribute('type', 'number');
  });

  test('it formats (number)', async function (assert) {
    assert.expect(8);
    const model = new Model();

    const actionHandler = (num) => {
      assert.strictEqual(num, 3600);
    };

    await render(<template>
      <NumberInput
        @binding={{bind model "value"}}
        @onChange={{actionHandler}}
      />
    </template>);

    assert
      .dom('input')
      .hasAttribute('type', 'text')
      .hasClass('form-control')
      .hasValue('42');

    await fillIn('div > input', '3600');
    await blur('div > input');

    assert.dom('div > input').hasValue('3,600');

    await focus('div > input');

    assert.dom('div > input').hasValue('3600');

    await render(<template>
      <NumberInput
        @binding={{bind model "value"}}
        @formatPrecision={{2}}
        @onChange={{actionHandler}}
      />
    </template>);

    assert.dom('div > input').hasValue('3,600.00');

    await focus('div > input');

    assert.dom('div > input').hasValue('3600');
  });

  test('it formats (currency)', async function (assert) {
    assert.expect(8);
    const model = new Model();

    const actionHandler = (num) => {
      assert.strictEqual(num, 3600);
    };

    await render(<template>
      <NumberInput
        @binding={{bind model "value"}}
        @format="currency"
        @onChange={{actionHandler}}
      />
    </template>);

    assert
      .dom('input')
      .hasAttribute('type', 'text')
      .hasClass('form-control')
      .hasValue('$42.00');

    await fillIn('div > input', '3600');
    await blur('div > input');

    assert.dom('div > input').hasValue('$3,600.00');

    await focus('div > input');

    assert.dom('div > input').hasValue('3600');

    await render(<template>
      <NumberInput
        @binding={{bind model "value"}}
        @format="currency"
        @formatPrecision={{6}}
        @onChange={{actionHandler}}
      />
    </template>);

    assert.dom('div > input').hasValue('$3,600.000000');

    await focus('div > input');

    assert.dom('div > input').hasValue('3600');
  });

  test('it formats (percent)', async function (assert) {
    assert.expect(8);
    const model = new Model();

    const actionHandler = (num) => {
      assert.strictEqual(num, 36);
    };

    await render(<template>
      <NumberInput
        @binding={{bind model "value"}}
        @format="percent"
        @onChange={{actionHandler}}
      />
    </template>);

    assert
      .dom('input')
      .hasAttribute('type', 'text')
      .hasClass('form-control')
      .hasValue('42%');

    await fillIn('div > input', '36');
    await blur('div > input');

    assert.dom('div > input').hasValue('36%');

    await focus('div > input');

    assert.dom('div > input').hasValue('36');

    await render(<template>
      <NumberInput
        @binding={{bind model "value"}}
        @format="percent"
        @formatPrecision={{3}}
        @onChange={{actionHandler}}
      />
    </template>);

    assert.dom('div > input').hasValue('36.000%');

    await focus('div > input');

    assert.dom('div > input').hasValue('36');
  });

  test('it formats (custom)', async function (assert) {
    assert.expect(8);
    const model = new Model();

    const format = (value) => {
      return `#${value} units`;
    };

    const actionHandler = (num) => {
      assert.strictEqual(num, 36);
    };

    await render(<template>
      <NumberInput
        @binding={{bind model "value"}}
        @format={{format}}
        @onChange={{actionHandler}}
      />
    </template>);

    assert
      .dom('input')
      .hasAttribute('type', 'text')
      .hasClass('form-control')
      .hasValue('#42 units');

    await fillIn('div > input', '36');
    await blur('div > input');

    assert.dom('div > input').hasValue('#36 units');

    await focus('div > input');

    assert.dom('div > input').hasValue('36');

    await render(<template>
      <NumberInput
        @binding={{bind model "value"}}
        @format={{format}}
        @formatPrecision={{3}}
        @onChange={{actionHandler}}
      />
    </template>);

    assert.dom('div > input').hasValue('#36 units');

    await focus('div > input');

    assert.dom('div > input').hasValue('36');
  });
});
