import Service from '@ember/service';
import { click, render } from '@ember/test-helpers';
import { ThemeSwitcher } from '@nrg-ui/core';
import { module, test } from 'qunit';
import { tracked } from 'tracked-built-ins';

import { setupRenderingTest } from '../../helpers';

import type { TestContext } from '@ember/test-helpers';

interface Context extends TestContext {
  clickHandler: (evt: MouseEvent) => void;
}

class MockThemeService extends Service {
  @tracked
  theme = 'auto';

  @tracked
  preferredTheme = 'light';

  load() {
    // do nothing
  }

  setTheme(theme: string) {
    this.theme = theme;
    this.preferredTheme = theme;
  }
}

module('Integration | Component | theme-switcher', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:theme', MockThemeService);
  });

  test('it renders', async function (this: Context, assert) {
    await render(<template><ThemeSwitcher /></template>);

    assert.dom('i.bi-circle-half').exists();
  });

  test('it cycles themes when clicked', async function (this: Context, assert) {
    await render(<template><ThemeSwitcher /></template>);
    assert.dom('i').hasClass('bi-circle-half', 'Initial theme is auto (light)');

    await click(`span[role='button']`);
    assert
      .dom('i')
      .hasClass(
        'bi-moon-stars-fill',
        'Switches to dark theme after auto (light)',
      );

    await click(`span[role='button']`);
    assert
      .dom('i')
      .hasClass('bi-sun-fill', 'Switches to light theme after dark');

    await click(`span[role='button']`);
    assert
      .dom('i')
      .hasClass(
        'bi-moon-stars-fill',
        'Switches back to dark theme after light',
      );
  });
});
