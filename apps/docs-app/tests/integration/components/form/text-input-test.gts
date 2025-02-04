import { fillIn, render, triggerEvent } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { TextInput, bind } from '@nrg-ui/core';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

import type { Optional } from '@nrg-ui/core';

class Model {
  @tracked
  value: string = 'Hello, world!';
}

module('Integration | Component | form/text-input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(6);
    const model = new Model();

    const actionHandler = (text: Optional<string>) => {
      assert.strictEqual(text, 'Foo bar');
    };

    await render(<template>
      <TextInput @binding={{bind model "value"}} @onChange={{actionHandler}} />
    </template>);

    assert
      .dom('input')
      .hasAttribute('type', 'text')
      .hasClass('form-control')
      .hasValue('Hello, world!');

    await fillIn('div > input', 'Foo bar');

    assert.dom('div > input').hasValue('Foo bar');

    await render(<template>
      <TextInput
        @binding={{bind model "value"}}
        @basic={{true}}
        @onChange={{actionHandler}}
      />
    </template>);

    assert.dom('div > input').hasClass('form-control-plaintext');
  });

  test('it uses a custom format', async function (assert) {
    const model = new Model();

    const format = (value: string) => value.toUpperCase();

    await render(<template>
      <TextInput @binding={{bind model "value"}} @format={{format}} />
    </template>);

    assert
      .dom('input')
      .hasAttribute('type', 'text')
      .hasClass('form-control')
      .hasValue('HELLO, WORLD!');

    await triggerEvent('div > input', 'focus');

    assert.dom('input').hasValue('Hello, world!');

    await triggerEvent('div > input', 'blur');
    await fillIn('div > input', 'Foo bar');

    assert.dom('div > input').hasValue('Foo bar');

    await triggerEvent('div > input', 'focus');

    assert.dom('input').hasValue('Foo bar');

    await triggerEvent('div > input', 'blur');

    assert.dom('input').hasValue('FOO BAR');
  });
});
