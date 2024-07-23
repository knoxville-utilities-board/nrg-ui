import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, type TestContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

interface Context extends TestContext {
  clickHandler: (type: string, evt: MouseEvent) => void;
}

module('Integration | components | nrg/button-group', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (this: Context, assert) {
    assert.expect(9);

    this.clickHandler = (type: string, evt: MouseEvent) => {
      assert.step(type);
      assert.ok(evt, 'action is fired with event');
    };

    await render(hbs`
      <Nrg::ButtonGroup @onClick={{fn this.clickHandler "group"}} as |Group|>
        <Group.Button @text="Foo bar" @onClick={{fn this.clickHandler "button"}} />
      </Nrg::ButtonGroup>
    `);

    assert.dom('div:has(button)').hasAttribute('role', 'group');

    assert
      .dom('button')
      .doesNotHaveClass('disabled')
      .hasAttribute('type', 'button')
      .hasClass('btn');

    await click('button');

    assert.verifySteps(
      ['button', 'group'],
      'actions are fired in correct order',
    );
  });

  test('a disabled group disables all buttons', async function (this: Context, assert) {
    assert.expect(6);

    this.clickHandler = (type: string, evt: MouseEvent) => {
      assert.notOk(type);
      assert.notOk(evt, 'action is fired with event');
    };

    await render(hbs`
      <Nrg::ButtonGroup @disabled={{true}} @onClick={{fn this.clickHandler "group"}} as |Group|>
        <Group.Button @text="Foo" @onClick={{fn this.clickHandler "foo"}} />
        <Group.Button @text="Bar" @onClick={{fn this.clickHandler "bar"}} />
      </Nrg::ButtonGroup>
    `);

    assert
      .dom('div:has(button)')
      .hasAttribute('role', 'group')
      .hasAria('disabled', 'true');

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

  test('nested groups fire actions', async function (this: Context, assert) {
    assert.expect(16);

    this.clickHandler = (type: string, evt: MouseEvent) => {
      assert.step(type);
      assert.ok(evt, 'action is fired with event');
    };

    await render(hbs`
      <Nrg::ButtonGroup @onClick={{fn this.clickHandler "group"}} as |Group|>
        <Group.Button class="btn-primary" @text="Foo" @onClick={{fn this.clickHandler "foo"}} />
        <Group.SubGroup @onClick={{fn this.clickHandler "subgroup"}} data-test-subgroup as |SubGroup|>
          <SubGroup.Button class="btn-primary" @text="Bar" @onClick={{fn this.clickHandler "bar"}} />
          <SubGroup.Button class="btn-primary" @text="Baz" @onClick={{fn this.clickHandler "baz"}} />
        </Group.SubGroup>
      </Nrg::ButtonGroup>
    `);

    assert.dom('div:has(button)').hasAttribute('role', 'group');

    assert
      .dom('button')
      .doesNotHaveClass('disabled')
      .hasAttribute('type', 'button')
      .hasClass('btn');

    await click('div > button:first-child');

    assert.verifySteps(
      ['foo', 'group'],
      'actions are fired in correct order (primary group)',
    );

    await click('[data-test-subgroup] > button:last-child');

    assert.verifySteps(
      ['baz', 'subgroup', 'group'],
      'actions are fired in correct order (subgroup)',
    );
  });

  test('nested groups fire only one action per event', async function (this: Context, assert) {
    assert.expect(1);

    this.clickHandler = (type: string, evt: MouseEvent) => {
      assert.ok(evt, 'action is fired with event');
    };

    await render(hbs`
      <Nrg::ButtonGroup @onClick={{fn this.clickHandler "group"}} as |Group|>
        <Group.SubGroup as |SubGroup|>
          <SubGroup.SubGroup as |SubGroup2|>
            <SubGroup2.Button/>
          </SubGroup.SubGroup>
        </Group.SubGroup>
      </Nrg::ButtonGroup>
    `);

    await click('button');
  });
});
