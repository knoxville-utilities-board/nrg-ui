import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import WorkflowTray from '@nrg-ui/ember/components/mktg/workflow-tray';

module('Integration | Component | mktg/workflow-tray', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function () {
    await render(<template>
      <WorkflowTray>Workflow Tray Content</WorkflowTray>
    </template>);

    assert.dom('col-12 col-md-4 py-5 px-4 px-md-5 bg-light order-2 order-md-1');

    assert.dom('div div').hasText('Workflow Tray Content');
  });
});
