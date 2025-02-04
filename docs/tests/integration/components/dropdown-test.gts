import { fn } from '@ember/helper';
import { click, render } from '@ember/test-helpers';
import Dropdown from '@nrg-ui/core/components/dropdown';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | dropdown', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const clickHandler = (val: string) => {
      assert.step(val);
    };

    await render(<template>
      <Dropdown>
        <:control>
          This is the button
        </:control>
        <:menu as |Menu|>
          <Menu.Item @onSelect={{fn clickHandler "item1"}}>
            Item 1
          </Menu.Item>
          <Menu.Item @onSelect={{fn clickHandler "item2"}}>
            Item 2
          </Menu.Item>
          <Menu.Item @disabled={{true}} @onSelect={{fn clickHandler "item3"}}>
            Item 3 (disabled)
          </Menu.Item>
          <Menu.Divider />
          <Menu.Header>
            Header
          </Menu.Header>
        </:menu>
      </Dropdown>
    </template>);

    await click('.btn.dropdown');
    await click('.dropdown-menu > li:nth-child(1)');

    await click('.btn.dropdown');
    await click('.dropdown-menu > li:nth-child(2)');

    await click('.btn.dropdown');
    await click('.dropdown-menu > li:nth-child(3)');

    assert.verifySteps(['item1', 'item2']);

    assert.dom('[data-test-dropdown-item]').exists({ count: 3 });
    assert
      .dom(
        '[data-test-dropdown-item]:nth-child(3) + li > [data-test-dropdown-divider]',
      )
      .exists();
    assert
      .dom(
        'li:has(> [data-test-dropdown-divider]) + li > [data-test-dropdown-header]',
      )
      .hasText('Header')
      .exists();
  });
});
