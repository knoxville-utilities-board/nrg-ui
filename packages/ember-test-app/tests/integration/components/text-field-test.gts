import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import TextField from '@nrg-ui/ember/components/text-field';
import bind from '@nrg-ui/ember/helpers/bind';

class Model {
  @tracked
  value: string = 'Hello, world!';
}

module('Integration | components | text-field', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders (inline)', async function (assert) {
    assert.expect(6);
    const model = new Model();

    const actionHandler = (text) => {
      assert.strictEqual(text, 'Foo bar');
    };

    await render(<template>
      <TextField @binding={{bind model "value"}} @onChange={{actionHandler}} />
    </template>);

    assert
      .dom('input')
      .hasAttribute('type', 'text')
      .hasClass('form-control')
      .hasValue('Hello, world!');

    await fillIn('div > input', 'Foo bar');

    assert.dom('div > input').hasValue('Foo bar');

    await render(<template>
      <TextField
        @binding={{bind model "value"}}
        @basic={{true}}
        @onChange={{actionHandler}}
      />
    </template>);

    assert.dom('div > input').hasClass('form-control-plaintext');
  });
});
