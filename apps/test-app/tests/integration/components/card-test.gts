import { render } from '@ember/test-helpers';
import { Card } from '@nrg-ui/core';
import { assert, module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module('Integration | Component | card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the card with the correct content', async function () {
    await render(<template>
      <Card>
        <:header>
          <p>Header content</p>
        </:header>
        <:body>
          <p>Body content</p>
        </:body>
      </Card>
    </template>);

    assert.dom('.card').exists('Card is rendered');
    assert
      .dom('.border-0')
      .doesNotExist('Border renders if hasBorder is not present');
    assert
      .dom('.card .card-header p')
      .hasText('Header content', 'Correct content is rendered in card header');
    assert
      .dom('.card .card-body p')
      .hasText('Body content', 'Correct content is rendered in card body');
    await render(<template>
      <Card @hasBorder={{false}}>
        <:header>
          <p>Header content</p>
        </:header>
        <:body>
          <p>Body content</p>
        </:body>
      </Card>
    </template>);
    assert
      .dom('.card.border-0')
      .exists('Card has class of border-0 if hasBorder is false');
  });
});
