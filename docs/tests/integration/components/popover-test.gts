import { click, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/core/components/button';
import Popover from '@nrg-ui/core/components/popover';
import { setupRenderingTest } from 'docs/tests/helpers';
import { module, test } from 'qunit';

import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { Direction } from '@nrg-ui/core/components/popover';

class Model {
  @tracked
  isShown?: boolean;

  @tracked
  side?: Direction;
}

interface TestContext extends BaseTestContext {
  model: Model;
}

module('Integration | Component | popover', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.model = new Model();
  });

  test('`direction` works', async function (this: TestContext, assert) {
    const { model } = this;

    await render(
      <template>
        <Popover @side={{model.side}}>
          <:control as |actions|>
            <Button @onClick={{actions.toggle}}>
              toggle
            </Button>
          </:control>
          <:content as |Content|>
            <Content.Header>
              header
            </Content.Header>
            <Content.Body>
              body
            </Content.Body>
          </:content>
        </Popover>
      </template>,
    );
    assert.dom('.popover').hasClass('bs-popover-bottom');

    // TODO: investigate why the popover must be closed and
    // reopened to get the new direction class

    this.model.side = 'top';
    await click('button');
    assert.dom('.popover').hasClass('bs-popover-top');
    await click('button');

    this.model.side = 'start';
    // await settled();
    await click('button');
    assert.dom('.popover').hasClass('bs-popover-start');
    await click('button');

    this.model.side = 'end';
    // await settled();
    await click('button');
    assert.dom('.popover').hasClass('bs-popover-end');
  });

  test('actions work', async function (this: TestContext, assert) {
    const onShow = () => {
      assert.step('onShow');
    };

    const onHide = () => {
      assert.step('onHide');
    };

    await render(
      <template>
        <Popover @onShow={{onShow}} @onHide={{onHide}}>
          <:control as |actions|>
            <Button @onClick={{actions.toggle}}>
              toggle
            </Button>
          </:control>
          <:content as |Content|>
            <Content.Header>
              header
            </Content.Header>
            <Content.Body>
              body
            </Content.Body>
          </:content>
        </Popover>
      </template>,
    );

    assert.dom('.popover').hasClass('hidden');

    await click('button');

    assert.dom('.popover').doesNotHaveClass('hidden');

    await click('button');

    await render(
      <template>
        <Popover @onShow={{onShow}} @onHide={{onHide}}>
          <:control as |actions|>
            <Button class="open" @onClick={{actions.show}}>
              show
            </Button>
            <Button class="hide" @onClick={{actions.hide}}>
              hide
            </Button>
          </:control>
          <:content as |Content|>
            <Content.Header>
              header
            </Content.Header>
            <Content.Body>
              body
            </Content.Body>
          </:content>
        </Popover>
      </template>,
    );

    await click('button.open');
    await click('button.open');
    await click('button.hide');
    await click('button.hide');

    assert.verifySteps(['onShow', 'onHide', 'onShow', 'onHide']);
  });
});
