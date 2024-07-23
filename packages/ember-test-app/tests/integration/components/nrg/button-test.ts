import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, findAll, render, type TestContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

interface Context extends TestContext {
  clickHandler: (evt: MouseEvent) => void;
}

module('Integration | components | nrg/button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (this: Context, assert) {
    assert.expect(12);

    this.clickHandler = (evt: MouseEvent) => {
      assert.ok(evt, 'action is fired with event');
    };

    await render(
      hbs`<Nrg::Button @text="Foo bar" @onClick={{this.clickHandler}} />`,
    );

    assert
      .dom('button')
      .containsText('Foo bar')
      .doesNotHaveAria('disabled')
      .doesNotHaveClass('disabled')
      .hasAttribute('type', 'button')
      .hasClass('btn');

    await click('button');

    await render(hbs`
      <Nrg::Button @onClick={{this.clickHandler}}>
        <div>Inner content</div>
      </Nrg::Button>
    `);

    assert
      .dom('button')
      .doesNotHaveAria('disabled')
      .doesNotHaveClass('disabled')
      .hasAttribute('type', 'button')
      .hasClass('btn');

    assert.dom('button > div').containsText('Inner content');

    await click('button');
  });

  test('it can be disabled', async function (this: Context, assert) {
    assert.expect(4);

    this.clickHandler = (evt: MouseEvent) => {
      assert.notOk(evt, 'action is fired with event');
    };

    await render(
      hbs`<Nrg::Button @disabled={{true}} @onClick={{this.clickHandler}} />`,
    );

    assert
      .dom('button')
      .hasAria('disabled', 'true')
      .hasAttribute('disabled')
      .hasClass('disabled');

    try {
      // Clicking on a disabled element throws an exception
      await click('button');
    } catch {
      assert.true(true);
    }
  });

  test('it can be loading', async function (this: Context, assert) {
    assert.expect(10);

    this.clickHandler = (evt: MouseEvent) => {
      assert.notOk(evt, 'action is fired with event');
    };

    await render(
      hbs`<Nrg::Button @loading={{true}} @onClick={{this.clickHandler}} />`,
    );

    assert
      .dom('button')
      .hasAria('disabled', 'true')
      .hasAttribute('disabled')
      .doesNotHaveClass('disabled');

    const [spinner, ariaLabel] = findAll('button > span');

    assert
      .dom(spinner)
      .hasAria('hidden', 'true')
      .hasClass('spinner-border')
      .hasClass('spinner-border-sm');

    assert
      .dom(ariaLabel)
      .containsText('Loading...')
      .hasAttribute('role')
      .hasClass('visually-hidden');

    try {
      // Clicking on a disabled element throws an exception
      await click('button');
    } catch {
      assert.true(true);
    }
  });

  test('it can have an icon', async function (assert) {
    assert.expect(7);

    await render(hbs`
      <Nrg::Button @icon="bi-suitcase">
        <span>Text</span>
      </Nrg::Button>
    `);

    assert.dom('button > i:first-child').hasClass('bi-suitcase');
    assert.dom('button > span:last-child').containsText('Text');

    await render(hbs`
      <Nrg::Button @icon="bi-suitcase" @iconPosition="right">
        <span>Text</span>
      </Nrg::Button>
    `);

    assert.dom('button > span:first-child').containsText('Text');
    assert.dom('button > i:last-child').hasClass('bi-suitcase');

    await render(hbs`
      <Nrg::Button @icon="bi-suitcase" @iconLabel="Suitcase">
        <span>Text</span>
      </Nrg::Button>
    `);

    assert
      .dom('button > i:first-child')
      .hasClass('bi-suitcase')
      .hasAria('label', 'Suitcase');
    assert.dom('button > span:last-child').containsText('Text');
  });
});
