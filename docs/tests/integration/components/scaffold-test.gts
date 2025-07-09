import { click } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import Scaffold from '@nrg-ui/core/components/scaffold';
import { setBreakpoint } from '@nrg-ui/core/test-support';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module('Integration | Component | scaffold', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <Scaffold>
          <:app-bar-left>
            Appbar Left
          </:app-bar-left>
          <:app-bar-right>
            Appbar Right
          </:app-bar-right>
          <:sidebar as |Menu|>
            <Menu.Item>
              Sidebar Item
            </Menu.Item>
            <Menu.Group>
              <:header>
                Sidebar Group
              </:header>
              <:items as |Item|>
                <Item>
                  Sidebar Group Item
                </Item>
              </:items>
            </Menu.Group>
          </:sidebar>
          <:sidebar-footer as |Item|>
            <Item>
              Sidebar Footer Item
            </Item>
          </:sidebar-footer>
          <:default>
            Main Content
          </:default>
          <:footer-left>
            Footer Left
          </:footer-left>
          <:footer-right>
            Footer Right
          </:footer-right>
        </Scaffold>
      </template>,
    );
    assert
      .dom()
      .containsText('Appbar Left', 'renders app bar left section')
      .containsText('Appbar Right', 'renders app bar sections')
      .containsText('Main Content', 'renders main content')
      .containsText('Sidebar Item', 'renders sidebar item from default block')
      .containsText('Sidebar Group', 'renders sidebar group header')
      .containsText('Sidebar Group Item', 'renders sidebar group item')
      .containsText('Sidebar Footer Item', 'renders sidebar footer item')
      .containsText('Footer Left', 'renders footer left content')
      .containsText('Footer Right', 'renders footer right content');
  });

  test('it toggles sidebar', async function (assert) {
    const emptyClickHandler = () => {
      /* only present to make item clickable */
    };
    setBreakpoint('large');
    await render(
      <template>
        <Scaffold>
          <:sidebar as |Menu|>
            <Menu.Item @onClick={{emptyClickHandler}}>
              Sidebar Item
            </Menu.Item>
          </:sidebar>
        </Scaffold>
      </template>,
    );

    await click('.sidebar .list-group-item');

    assert
      .dom('.sidebar')
      .exists(
        'Sidebar should not close when clicking on an item in large screens',
      );

    await setBreakpoint('small');

    assert
      .dom('.sidebar')
      .doesNotExist('Sidebar should not be shown by default on mobile');

    await click('i.bi-list');

    assert.dom('.sidebar').exists('Sidebar should be visible after toggling');

    await click('.sidebar .list-group-item');

    assert
      .dom('.sidebar')
      .doesNotExist(
        'Sidebar should close when clicking on an item on small screens',
      );
  });

  test('it renders about section', async function (assert) {
    await render(
      <template>
        <Scaffold>
          <:about>
            About Modal Content
          </:about>
        </Scaffold>
      </template>,
    );

    await click('i.bi-three-dots-vertical');
    await click('[data-test-dropdown-item]:last-child');
    assert
      .dom('dialog')
      .isVisible(
        'The about modal should be visible when the menu item is clicked',
      )
      .containsText(
        'About Modal Content',
        'The about modal should render the correct content',
      );
  });

  test('it renders the context menu', async function (assert) {
    await render(
      <template>
        <Scaffold>
          <:context-menu as |Menu|>
            <Menu.Item class="context-menu-item-1">
              Context Menu Item
            </Menu.Item>
          </:context-menu>
        </Scaffold>
      </template>,
    );

    await click('i.bi-three-dots-vertical');
    assert
      .dom('.context-menu-item-1')
      .exists(
        'The context menu item should be rendered when the menu is opened',
      )
      .isVisible(
        'The context menu item should be visible when the menu is opened',
      )
      .containsText(
        'Context Menu Item',
        'The context menu item should display the correct text',
      );
  });
});
