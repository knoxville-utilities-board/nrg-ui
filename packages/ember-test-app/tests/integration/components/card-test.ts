import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the card with the correct content', async function () {
    await render(hbs`<Card>
      <:card-header>
        <p>Header content</p>
      </:card-header>
      <:card-body>
        <p>Body content</p>
      </:card-body>
    </Card>`);

    assert.dom('.card').exists('Card is rendered');
    assert
      .dom('.card .card-header p')
      .hasText('Header content', 'Correct content is rendered in card header');
    assert
      .dom('.card .card-body p')
      .hasText('Body content', 'Correct content is rendered in card body');
  });
});
