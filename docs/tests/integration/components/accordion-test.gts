import { click, render } from '@ember/test-helpers';
import { Accordion } from '@nrg-ui/core';
import { assert, module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module('Integration | Component | Accordion', function (hooks) {
  setupRenderingTest(hooks);

  test('accordion renders', async function () {
    this.isOpen = false;

    const onToggleHandler = (isOpen: boolean) => {
      this.set('isOpen', isOpen);
    };

    await render(
      <template>
        <Accordion
          class="test"
          @title="Title"
          @isOpen={{this.isOpen}}
          @onToggle={{onToggleHandler}}
        >
          <:content>
            <p>Content</p>
          </:content>
        </Accordion>
      </template>,
    );

    assert
      .dom('.d-flex.flex-column.p-2.m-2.rounded.test')
      .exists('Accordion renders with passed attributes');

    assert.dom('div button p').hasText('Title', 'Title parameter renders correct content');
    assert
      .dom('div div button i')
      .hasClass('bi-caret-left-fill', 'Icon has correct class when Accordion is closed');
    assert
      .dom('.rounded div')
      .hasClass('collapse', 'Div containing content contains collapse class');
    await click('button');

    assert
      .dom('.rounded div')
      .hasClass('show', 'Div containing content has show class after clicking button');
    assert
      .dom('.rounded button i')
      .hasClass('bi-caret-down-fill', 'Icon switches to down caret after clicking button');
  });

  test('accordion yields title block', async function () {
    await render(
      <template>
        <Accordion>
          <:title>
            <h3 class="custom-title">Custom Title</h3>
          </:title>
          <:content>
            <p>Content</p>
          </:content>
        </Accordion>
      </template>,
    );

    assert
      .dom('div button h3.custom-title')
      .hasText('Custom Title', 'Title block yields correctly');
  });

  test('it fires onToggle', async function () {
    const onToggleHandler = () => {
      assert.ok(true, 'action is fired');
    };

    await render(<template><Accordion @title="Foo bar" @onChange={{onToggleHandler}} /></template>);
    assert.dom('button').containsText('Foo bar');

    await click('button');
  });

  test('it fires onOpen and onClose', async function (assert) {
    assert.expect(3);

    this.isOpen = false;

    const onOpenHandler = () => {
      assert.ok(true, 'onOpen is fired');
      this.set('isOpen', true);
    };

    const onCloseHandler = () => {
      assert.ok(true, 'onClose is fired');
      this.set('isOpen', false);
    };

    await render(
      <template>
        <Accordion
          @title="Foo bar"
          @isOpen={{this.isOpen}}
          @onOpen={{onOpenHandler}}
          @onClose={{onCloseHandler}}
        />
      </template>,
    );

    assert.dom('button').containsText('Foo bar');

    // Open
    await click('button');

    // Close
    await click('button');
  });
});
