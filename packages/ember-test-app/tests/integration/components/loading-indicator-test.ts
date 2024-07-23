import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | loading-indicator', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<LoadingIndicator />`);

    assert
      .dom('div')
      .hasClass('spinner-border', 'defaults to border')
      .hasAttribute('role', 'status');

    assert
      .dom('div > span')
      .hasClass('visually-hidden')
      .containsText('Loading...', 'has default label');
  });

  test('label can be displayed', async function (assert) {
    await render(
      hbs`<LoadingIndicator @label="Foo bar" @showLabel={{true}} />`,
    );

    assert
      .dom('strong:has(+ div)')
      .doesNotHaveClass('visually-hidden')
      .hasAttribute('role', 'status')
      .containsText('Foo bar', 'has default label');

    assert
      .dom('strong + div')
      .hasAria('hidden', 'true')
      .hasClass('spinner-border', 'defaults to border')
      .doesNotHaveAttribute('role', 'status');
  });
});
