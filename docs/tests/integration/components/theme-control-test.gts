import { click, render, rerender } from '@ember/test-helpers';
import ThemeControl from '@nrg-ui/core/components/theme-control';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

import type { TestContext } from '@ember/test-helpers';
import type { Theme } from '@nrg-ui/core';
import type ThemeService from '@nrg-ui/core/services/theme';

interface Context extends TestContext {
  service: ThemeService;
}

module('Integration | Component | theme-control', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: Context) {
    this.service = this.owner.lookup('service:theme');
  });

  test('it renders', async function (this: Context, assert) {
    this.service.value = 'light';

    await render(<template><ThemeControl /></template>);

    assert
      .dom('button:nth-child(1)')
      .hasAria('label', 'Light mode')
      .hasAria('pressed', 'true')
      .hasClass('active');
    assert
      .dom('button:nth-child(2)')
      .hasAria('label', 'Dark mode')
      .hasAria('pressed', 'false')
      .doesNotHaveClass('active');
    assert
      .dom('button:nth-child(3)')
      .hasAria('label', 'Auto')
      .hasAria('pressed', 'false')
      .doesNotHaveClass('active');

    this.service.value = 'dark';
    await rerender();

    assert
      .dom('button:nth-child(1)')
      .hasAria('pressed', 'false')
      .doesNotHaveClass('active');
    assert
      .dom('button:nth-child(2)')
      .hasAria('pressed', 'true')
      .hasClass('active');
    assert
      .dom('button:nth-child(3)')
      .hasAria('pressed', 'false')
      .doesNotHaveClass('active');

    this.service.value = 'auto';
    await rerender();

    assert
      .dom('button:nth-child(1)')
      .hasAria('pressed', 'false')
      .doesNotHaveClass('active');
    assert
      .dom('button:nth-child(2)')
      .hasAria('pressed', 'false')
      .doesNotHaveClass('active');
    assert
      .dom('button:nth-child(3)')
      .hasAria('pressed', 'true')
      .hasClass('active');
  });

  test('buttons work', async function (this: Context, assert) {
    await render(<template><ThemeControl /></template>);

    await click('button:nth-child(1)');

    assert.dom('button:nth-child(1)').hasClass('active');
    assert.dom('button:nth-child(2)').doesNotHaveClass('active');
    assert.dom('button:nth-child(3)').doesNotHaveClass('active');
    assert.strictEqual(this.service.value, 'light');

    await click('button:nth-child(2)');

    assert.dom('button:nth-child(1)').doesNotHaveClass('active');
    assert.dom('button:nth-child(2)').hasClass('active');
    assert.dom('button:nth-child(3)').doesNotHaveClass('active');
    assert.strictEqual(this.service.value, 'dark');

    await click('button:nth-child(3)');

    assert.dom('button:nth-child(1)').doesNotHaveClass('active');
    assert.dom('button:nth-child(2)').doesNotHaveClass('active');
    assert.dom('button:nth-child(3)').hasClass('active');
    assert.strictEqual(this.service.value, 'auto');
  });

  test('action works', async function (this: Context, assert) {
    const listener = (theme: Theme) => {
      assert.step(theme);
    };

    await render(<template><ThemeControl @onChange={{listener}} /></template>);

    await click('button:nth-child(1)');
    assert.strictEqual(this.service.value, 'light');

    await click('button:nth-child(2)');
    assert.strictEqual(this.service.value, 'dark');

    await click('button:nth-child(3)');
    assert.strictEqual(this.service.value, 'auto');

    assert.verifySteps(['light', 'dark', 'auto']);

    await click('button:nth-child(2)');
    assert.strictEqual(this.service.value, 'dark');

    await click('button:nth-child(2)');
    assert.strictEqual(this.service.value, 'dark');

    assert.verifySteps(['dark'], 'Duplicate clicks do not trigger action');
  });
});
