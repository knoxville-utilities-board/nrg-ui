import { fn } from '@ember/helper';
import { click, findAll, render } from '@ember/test-helpers';
import ContextMenu, {
  ContextMenuItem,
} from '@nrg-ui/core/components/context-menu';
import { setupRenderingTest } from 'docs/tests/helpers';
import { module, test } from 'qunit';

async function openMenu() {
  await click('i.bi-three-dots-vertical');
}

module('Integration | Component | context-menu', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const onSelect = (message: string) => {
      assert.step(message);
    };

    await render(
      <template>
        <ContextMenu @id="context-menu-id" as |Menu|>
          <Menu.Item @onSelect={{fn onSelect "Item 1"}}>
            I'm a regular item
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item @disabled={{true}} @onSelect={{fn onSelect "Item 2"}}>
            I'm a disabled item
          </Menu.Item>
        </ContextMenu>
      </template>,
    );

    await openMenu();

    const [item1, divider, item2] = findAll('.dropdown-top > li');

    assert.dom('.dropdown-item', item1).hasText("I'm a regular item");
    await click(item1!);

    await openMenu();
    assert.dom('hr', divider).hasClass('dropdown-divider');

    assert
      .dom('.dropdown-item', item2)
      .hasClass('disabled')
      .hasText("I'm a disabled item");
    await click(item2!);

    assert.verifySteps(['Item 1']);
  });

  test('external items render', async function (assert) {
    const onSelect = (message: string) => {
      assert.step(message);
    };

    await render(
      <template>
        <ContextMenu @id="context-menu-id" as |Menu|>
          <Menu.Item @onSelect={{fn onSelect "Item 1"}}>
            I'm a regular item
          </Menu.Item>
          <Menu.Item @disabled={{true}} @onSelect={{fn onSelect "Item 2"}}>
            I'm a disabled item
          </Menu.Item>
        </ContextMenu>
        <ContextMenuItem
          @menuId="context-menu-id"
          @onSelect={{fn onSelect "Item 3"}}
        >
          I'm an external item
        </ContextMenuItem>
      </template>,
    );

    await openMenu();

    const [item1, item2, item3] = findAll('.dropdown-top > li');

    assert.dom('.dropdown-item', item1).hasText("I'm a regular item");
    await click(item1!);

    await openMenu();

    assert
      .dom('.dropdown-item', item2)
      .hasClass('disabled')
      .hasText("I'm a disabled item");
    await click(item2!);

    assert.dom('.dropdown-item', item3).hasText("I'm an external item");
    await click(item3!);

    assert.verifySteps(['Item 1', 'Item 3']);
  });

  test('items can be reordered', async function (assert) {
    const onSelect = (message: string) => {
      assert.step(message);
    };

    await render(
      <template>
        <ContextMenu @id="context-menu-id" as |Menu|>
          <Menu.Item @onSelect={{fn onSelect "Item 1"}}>
            I'm a regular item
          </Menu.Item>
          <Menu.Item @disabled={{true}} @onSelect={{fn onSelect "Item 2"}}>
            I'm a disabled item
          </Menu.Item>
        </ContextMenu>
        <ContextMenuItem
          @bottom={{true}}
          @menuId="context-menu-id"
          @onSelect={{fn onSelect "Item 3"}}
        >
          I'm an external item
        </ContextMenuItem>
        <ContextMenuItem
          @menuId="context-menu-id"
          @onSelect={{fn onSelect "Item 4"}}
        >
          I'm an external item, but on top
        </ContextMenuItem>
      </template>,
    );

    await openMenu();

    const [item1, item2, item4] = findAll('.dropdown-top > li');

    assert.dom('.dropdown-item', item1).hasText("I'm a regular item");
    await click(item1!);

    await openMenu();

    assert
      .dom('.dropdown-item', item2)
      .hasClass('disabled')
      .hasText("I'm a disabled item");
    await click(item2!);

    assert
      .dom('.dropdown-item', item4)
      .hasText("I'm an external item, but on top");
    await click(item4!);

    await openMenu();

    const [item3] = findAll('.dropdown-bottom > li');

    assert.dom('.dropdown-item', item3).hasText("I'm an external item");
    await click(item3!);

    assert.verifySteps(['Item 1', 'Item 4', 'Item 3']);
  });
});
