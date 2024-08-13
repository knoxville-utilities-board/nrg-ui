import { render } from '@ember/test-helpers';
import Card from '@nrg-ui/ember/components/card';
import { setupRenderingTest } from 'ember-qunit';
import { assert, module, test } from 'qunit';

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

    assert.dom('.card.p-4.shadow-sm').exists('Card is rendered');
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
      .dom('.card.p-4.shadow-sm.border-0')
      .exists('Card has class of border-0 if hasBorder is false');
  });
});
