import { click, render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import Button from '@nrg-ui/core/components/button';
import Popover from '@nrg-ui/core/components/popover';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

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

    await render(<template>
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
    </template>);
    assert.dom('.popover').hasClass('bs-popover-bottom');

    this.model.side = "top";
    await click('button');
    assert.dom('.popover').hasClass('bs-popover-top');

    this.model.side = 'start';
    await settled();
    assert.dom('.popover').hasClass('bs-popover-start');

    this.model.side = 'end';
    await settled();
    assert.dom('.popover').hasClass('bs-popover-end');
  });

  test('actions work', async function (this: TestContext, assert) {
    const onShow = () => {
      assert.step('onShow');
    };

    const onHide = () => {
      assert.step('onHide');
    };

    await render(<template>
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
    </template>);

    assert.dom('.popover').hasClass('d-none');

    await click('button');

    assert.dom('.popover').doesNotHaveClass('d-none');

    await click('button');

    await render(<template>
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
    </template>);

    await click('button.open');
    await click('button.open');
    await click('button.hide');
    await click('button.hide');

    assert.verifySteps(['onShow', 'onHide', 'onShow', 'onHide']);
  });
});
