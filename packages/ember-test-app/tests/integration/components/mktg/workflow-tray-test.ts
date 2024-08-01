import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | nrg/workflow-tray', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(3);

    await render(hbs`
      <Mktg::WorkflowTray>
        <:totals as |Total|>
          <Total @name="Total Name" @total="$100/mo"></Total>
        </:totals>
        <:default>
          default content
        </:default>
      </Mktg::WorkflowTray>
    `);

    assert
      .dom('div .row:nth-child(1) .col-auto:nth-child(1)')
      .containsText('Total Name');

    assert
      .dom('div .row:nth-child(1) .col-auto:nth-child(2)')
      .containsText('$100/mo');

    assert.dom('div .row:nth-child(2)').containsText('default content');
  });
});
