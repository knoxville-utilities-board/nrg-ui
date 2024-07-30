import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | nrg/workflow-tray', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(3);

    await render(hbs`
    <Mktg::WorkflowTray
      @first-bill-total="$65/mo"
      @monthly-bill-total="$100/mo"
    >
      Default
    </Mktg::WorkflowTray>`);

    assert
      .dom('div.row:nth-child(1)')
      .containsText('First Bill Including Fees $65/mo');

    assert.dom('div.row:nth-child(2)').containsText('Monthly Bill $100/mo');

    assert.dom('div.row:nth-child(3)').containsText('Default');
  });
});
