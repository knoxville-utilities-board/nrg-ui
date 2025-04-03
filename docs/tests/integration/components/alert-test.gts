import { clearRender, click, render, waitUntil } from '@ember/test-helpers';
import { Alert } from '@nrg-ui/core';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

import type { TestContext } from '@ember/test-helpers';

interface Context extends TestContext {
  dismissHandler: () => void;
}

module('Integration | Component | alert', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template>
      <Alert
        @dismissible={{true}}
        @icon="bi-exclamation-triangle-fill"
        @text="Foo bar"
      />
    </template>);

    assert
      .dom('div.alert')
      .containsText('Foo bar')
      .hasAttribute('role', 'alert')
      .hasClass('alert-primary');

    assert.dom('div.alert > i').hasClass('bi-exclamation-triangle-fill');

    assert
      .dom('div.alert > button')
      .hasAria('label', 'Close')
      .hasAttribute('type', 'button')
      .hasClass('btn-close');

    await render(<template>
      <Alert
        @dismissible={{true}}
        @icon="bi-exclamation-triangle-fill"
        @type="success"
      >
        Baz
      </Alert>
    </template>);

    assert
      .dom('div.alert')
      .containsText('Baz')
      .hasAttribute('role', 'alert')
      .hasClass('alert-success');

    assert.dom('div.alert > i').hasClass('bi-exclamation-triangle-fill');

    assert
      .dom('div.alert > button')
      .hasAria('label', 'Close')
      .hasAttribute('type', 'button')
      .hasClass('btn-close');

    await clearRender();
  });

  test('it can be dismissed', async function (this: Context, assert) {
    assert.expect(1);

    let actionFired = false;

    const dismissHandler = () => {
      actionFired = true;
    };

    await render(<template>
      <Alert
        @dismissible={{true}}
        @type="success"
        @onDismiss={{dismissHandler}}
      />
    </template>);

    await click('button');
    await clearRender();
    await waitUntil(() => actionFired);

    assert.true(actionFired, 'action is fired');
  });
});
