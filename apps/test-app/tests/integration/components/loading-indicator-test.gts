import { render } from '@ember/test-helpers';
import LoadingIndicator from '@nrg-ui/core/components/loading-indicator';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module('Integration | Component | loading-indicator', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><LoadingIndicator /></template>);

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
    await render(<template>
      <LoadingIndicator @label="Foo bar" @showLabel={{true}} />
    </template>);

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
