import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, type TestContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

interface Context extends TestContext {
  clickHandler: (evt: MouseEvent) => void;
}

module('Integration | components | nrg/workflow-tray', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (this: Context, assert) {
    assert.expect(4);

    this.clickHandler = (evt: MouseEvent) => {
      assert.ok(evt, 'action is fired with event');
    };

    await render(hbs`
    <Mktg::WorkflowTray @onClick={{this.clickHandler}}>
      <:first-bill-total>$65/mo</:first-bill-total>
      <:monthly-bill-total>$100/mo</:monthly-bill-total>
    </Mktg::WorkflowTray>`);

    assert.dom('button').containsText('Next');

    assert
      .dom('div.row:nth-child(1)')
      .containsText('First Bill Including Fees $65/mo');

    assert.dom('div.row:nth-child(2)').containsText('Monthly Bill $100');

    await click('button');
  });
});
