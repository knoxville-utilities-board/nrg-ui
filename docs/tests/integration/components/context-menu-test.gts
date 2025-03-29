import { render } from '@ember/test-helpers';
import ContextMenu from '@nrg-ui/core/components/context-menu';
import { setupRenderingTest } from 'docs/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | f/components/context-menu', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Template block usage:
    await render(<template>
      <ContextMenu @id="">
        template block text
      </ContextMenu>
    </template>);

    assert.dom().hasText('template block text');
  });
});
