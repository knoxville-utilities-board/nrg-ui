import { fn } from '@ember/helper';
import { findAll } from '@ember/test-helpers';
import { click } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import Sidebar from '@nrg-ui/core/components/sidebar';
import { setupRenderingTest } from 'docs/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | sidebar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <Sidebar>
          <:default as |Menu|>
            <Menu.Group>
              <:badge>I'm a badge!</:badge>
              <:header>
                Section 1
              </:header>
              <:items as |Item|>
                <Item @url="https://example.com">Item 1</Item>
              </:items>
            </Menu.Group>
            <Menu.Group>
              <:header>
                Section 2
              </:header>
              <:items as |Item|>
                <Item class="custom-class">
                  <:badge>I'm a badge too!</:badge>
                  <:default>
                    Item 2
                  </:default>
                </Item>
              </:items>
            </Menu.Group>
          </:default>
          <:footer as |Item|>
            <Item @url="https://example.com">
              <:badge>I'm a footer badge!</:badge>
              <:default>Footer Item</:default>
            </Item>
          </:footer>
        </Sidebar>
      </template>,
    );

    assert
      .dom('.sidebar > .list-group')
      .exists({ count: 2 }, 'Content and footer are rendered');

    assert
      .dom('.sidebar > .list-group > .list-group-item.header')
      .exists({ count: 2 }, 'All headers are rendered');
    assert
      .dom('.sidebar > .list-group > .list-group-item > span > .badge')
      .exists({ count: 3 }, 'All badges are rendered');
    assert
      .dom('.sidebar > .list-group.footer > .list-group-item')
      .exists({ count: 1 }, 'Footer item is rendered');

    const items = findAll('.sidebar > .list-group > .list-group-item');
    const [header1, item1, header2, item2, footerItem] = items;

    assert
      .dom(header1)
      .hasTagName('div')
      .containsText('Section 1', 'First header is rendered');
    assert
      .dom('.badge', header1)
      .containsText("I'm a badge!", 'First badge is rendered on header');

    assert
      .dom(item1)
      .hasText('Item 1', 'First item is rendered')
      .hasTagName('a')
      .hasAttribute('href', 'https://example.com', 'Item has correct URL');

    assert
      .dom(header2)
      .hasTagName('div')
      .containsText('Section 2', 'Second header is rendered');

    assert.dom(item2).hasClass('custom-class', 'Custom class is applied');
    assert
      .dom('span:not(.badge)', item2)
      .hasText('Item 2', 'Second item is rendered');
    assert
      .dom('.badge', item2)
      .containsText("I'm a badge too!", 'Second badge is rendered on item');

    assert
      .dom(footerItem)
      .hasTagName('a')
      .hasAttribute(
        'href',
        'https://example.com',
        'Footer item has correct URL',
      );
    assert
      .dom('span:not(.badge)', footerItem)
      .hasText('Footer Item', 'Footer item is rendered');
    assert
      .dom('.badge', footerItem)
      .containsText("I'm a footer badge!", 'Footer badge is rendered');
  });

  test('it works', async function (assert) {
    assert.expect(10);

    function onClick(message: string) {
      assert.step(message);
    }

    await render(
      <template>
        <Sidebar as |Menu|>
          <Menu.Item @onClick={{fn onClick "top-level item"}}>Item 1</Menu.Item>
          <Menu.Group @onClick={{fn onClick "group header"}}>
            <:header>
              Group
            </:header>
            <:items as |Item|>
              <Item @onClick={{fn onClick "nested item"}}>
                Item 2
              </Item>
              <Item @disabled={{true}} @onClick={{fn onClick "disabled item"}}>
                Item 3
              </Item>
              <Item @active={{true}} @onClick={{fn onClick "active item"}}>
                Item 4
              </Item>
            </:items>
          </Menu.Group>
        </Sidebar>
      </template>,
    );

    const items = findAll('.sidebar > .list-group > .list-group-item');
    const [item1, header1, item2, item3, item4] = items;

    assert
      .dom(item1)
      .hasClass('list-group-item-action', 'First item is clickable');
    await click(item1!);

    assert
      .dom(header1)
      .hasClass('list-group-item-action', 'Header is clickable');
    await click(header1!);

    assert
      .dom(item2)
      .hasClass('list-group-item-action', 'Second item is clickable');
    await click(item2!);

    assert
      .dom(item3)
      .hasClass('disabled', 'Third item is disabled')
      .doesNotHaveClass(
        'list-group-item-action',
        'Third item is not clickable',
      );
    await click(item3!);

    assert.dom(item4).hasClass('active', 'Fourth item is active');
    await click(item4!);

    assert.verifySteps(
      ['top-level item', 'group header', 'nested item'],
      'Click events are triggered correctly',
    );
  });
});
