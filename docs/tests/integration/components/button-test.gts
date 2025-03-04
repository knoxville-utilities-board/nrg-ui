import { click, findAll, render } from '@ember/test-helpers';
import { Button } from '@nrg-ui/core';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

import type { TestContext } from '@ember/test-helpers';

interface Context extends TestContext {
  clickHandler: (evt: MouseEvent) => void;
}

module('Integration | Component | button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (this: Context, assert) {
    assert.expect(12);

    const clickHandler = (evt: MouseEvent) => {
      assert.ok(evt, 'action is fired with event');
    };

    await render(<template>
      <Button @text="Foo bar" @onClick={{clickHandler}} />
    </template>);

    assert
      .dom('button')
      .containsText('Foo bar')
      .doesNotHaveAria('disabled')
      .doesNotHaveClass('disabled')
      .hasAttribute('type', 'button')
      .hasClass('btn');

    await click('button');

    await render(<template>
      <Button @onClick={{clickHandler}}>
        <div>Inner content</div>
      </Button>
    </template>);

    assert
      .dom('button')
      .doesNotHaveAria('disabled')
      .doesNotHaveClass('disabled')
      .hasAttribute('type', 'button')
      .hasClass('btn');

    assert.dom('button > .content > div').containsText('Inner content');

    await click('button');
  });

  test('it can be disabled', async function (this: Context, assert) {
    assert.expect(4);

    const clickHandler = (evt: MouseEvent) => {
      assert.notOk(evt, 'action is fired with event');
    };

    await render(<template>
      <Button @disabled={{true}} @onClick={{clickHandler}} />
    </template>);

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

    const clickHandler = (evt: MouseEvent) => {
      assert.notOk(evt, 'action is fired with event');
    };

    await render(<template>
      <Button @loading={{true}} @onClick={{clickHandler}} />
    </template>);

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
      .containsText('Loading')
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

    await render(<template>
      <Button @icon="bi-suitcase">
        <span>Text</span>
      </Button>
    </template>);

    assert.dom('button > i:first-child').hasClass('bi-suitcase');
    assert.dom('button > span:last-child').containsText('Text');

    await render(<template>
      <Button @icon="bi-suitcase" @iconPosition="right">
        <span>Text</span>
      </Button>
    </template>);

    assert.dom('button > span:first-child').containsText('Text');
    assert.dom('button > i:last-child').hasClass('bi-suitcase');

    await render(<template>
      <Button @icon="bi-suitcase" @iconLabel="Suitcase">
        <span>Text</span>
      </Button>
    </template>);

    assert
      .dom('button > i:first-child')
      .hasClass('bi-suitcase')
      .hasAria('label', 'Suitcase');
    assert.dom('button > span:last-child').containsText('Text');

    await render(<template>
      <Button
        @icon="bi-suitcase"
        @iconLabel="Suitcase"
        @iconPosition="center"
      />
    </template>);
    
    assert
      .dom('button > i:first-child')
      .hasClass('bi-suitcase')
      .hasAria('label', 'Suitcase');
  });
});
