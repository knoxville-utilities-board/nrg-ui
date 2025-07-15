import { render } from '@ember/test-helpers';
import { MktgWorkflowTray } from '@nrg-ui/core';
import { setupRenderingTest } from 'docs/tests/helpers';
import { assert, module, test } from 'qunit';

module('Integration | Component | mktg/workflow-tray', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function () {
    await render(
      <template>
        <MktgWorkflowTray>Workflow Tray Content</MktgWorkflowTray>
      </template>,
    );

    assert.dom('col-12 col-md-4 py-5 px-4 px-md-5 bg-light order-2 order-md-1');

    assert.dom('div div').hasText('Workflow Tray Content');
  });
});
