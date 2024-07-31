import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render, type TestContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { tracked } from '@glimmer/tracking';

class Model {
  @tracked
  value: string = 'Hello, world!';
}

interface Context extends TestContext {
  element: HTMLElement;
  model: Model;
  actionHandler: (text: string) => void;
}

module('Integration | components | text-field', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: Context) {
    this.model = new Model();
  });

  test('it renders (inline)', async function (this: Context, assert) {
    assert.expect(6);

    await render(hbs`
      <TextField @binding={{bind this.model "value"}} @onChange={{this.actionHandler}} />
    `);

    this.actionHandler = (text) => {
      assert.strictEqual(text, 'Foo bar');
    };

    assert
      .dom('input')
      .hasAttribute('type', 'text')
      .hasClass('form-control')
      .hasValue('Hello, world!');

    await fillIn('div > input', 'Foo bar');

    assert.dom('div > input').hasValue('Foo bar');

    await render(hbs`
      <TextField
        @binding={{bind this.model "value"}}
        @basic={{true}}
        @onChange={{this.actionHandler}}
      />
    `);

    assert.dom('div > input').hasClass('form-control-plaintext');
  });

  test('it renders (block)', async function (this: Context, assert) {
    assert.expect(6);
    this.model.value = 'Grace.Hopper';

    this.actionHandler = (text) => {
      assert.strictEqual(text, 'Foo bar');
    };

    await render(hbs`
      <TextField @binding={{bind this.model "value"}} @onChange={{this.actionHandler}} as |Input|>
        <div class="input-group">
          {{!-- template-lint-disable require-input-label --}}
          <Input />
          <span class="input-group-text">@kub.org</span>
        </div>
      </TextField>
    `);

    assert
      .dom('div > input')
      .hasAttribute('type', 'text')
      .hasClass('form-control')
      .hasValue('Grace.Hopper');

    await fillIn('div > input', 'Foo bar');

    assert.dom('div > input').hasValue('Foo bar');

    await render(hbs`
      <TextField @binding={{bind this.model "value"}} @basic={{true}} @onChange={{this.actionHandler}} as |Input|>
        <div class="input-group">
          {{!-- template-lint-disable require-input-label --}}
          <Input />
          <span class="input-group-text">@kub.org</span>
        </div>
      </TextField>
    `);

    assert.dom('div > input').hasClass('form-control-plaintext');
  });

  test('labels render', async function (this: Context, assert) {
    assert.expect(4);

    this.actionHandler = (text) => {
      assert.strictEqual(text, 'Foo bar');
    };

    await render(hbs`
      <TextField @binding={{bind this.model "value"}} @onChange={{this.actionHandler}}>
        <:left-label>$</:left-label>
        <:right-label>.00</:right-label>
      </TextField>
    `);

    assert
      .dom('div > input')
      .hasAttribute('type', 'text')
      .hasValue('Hello, world!');

    await fillIn('div > input', 'Foo bar');

    assert.dom('div > input').hasValue('Foo bar');
  });
});
