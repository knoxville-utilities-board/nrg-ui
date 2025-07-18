import { render } from '@ember/test-helpers';
import { Header } from '@nrg-ui/core';
import { assert, module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module('Integration | Component | header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders content within the correct named blocks', async function () {
    await render(
      <template>
        <Header>
          <:left>
            <p class="m-0">Left side content</p>
          </:left>
          <:center>
            <p class="m-0">center content</p>
          </:center>
          <:right>
            <p class="m-0">right side content</p>
          </:right>
          <:mobile-drop-section>
            <p class="m-0">mobile drop section content</p>
          </:mobile-drop-section>
        </Header>
      </template>,
    );

    assert
      .dom('.col.d-flex.app-bar-left p')
      .hasText(
        'Left side content',
        'Content is rendered in correct block with correct text',
      );
    assert
      .dom('.col.d-flex.app-bar-center p')
      .hasText(
        'center content',
        'Content is rendered in correct block with correct text',
      );
    assert
      .dom('.col.d-flex.app-bar-right p')
      .hasText(
        'right side content',
        'Content is rendered in correct block with correct text',
      );
    assert
      .dom('.d-flex.flex-row.text-nowrap p')
      .hasText(
        'mobile drop section content',
        'Content is rendered in correct block with correct text',
      );
  });

  test('it renders content in the correct order', async function () {
    await render(
      <template>
        <Header>
          <:left>
            <p class="m-0">Left side content</p>
          </:left>
          <:center>
            <p class="m-0">center content</p>
          </:center>
          <:right>
            <p class="m-0">right side content</p>
          </:right>
          <:mobile-drop-section>
            <p class="m-0">mobile drop section content</p>
          </:mobile-drop-section>
        </Header>
      </template>,
    );

    assert.dom('div div p').hasText('Left side content');
    assert.dom('div div:nth-of-type(2) p').hasText('center content');
    assert.dom('div div:nth-of-type(3) p').hasText('right side content');
    assert
      .dom('div div:nth-of-type(4) p')
      .hasText('mobile drop section content');
  });
});
