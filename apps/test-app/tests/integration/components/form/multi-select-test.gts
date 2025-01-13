import { render } from '@ember/test-helpers';
import MultiSelect from '@nrg-ui/core/components/form/multi-select';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

module('Integration | Component | form/multi-select', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><MultiSelect /></template>);

    assert.dom().hasText('');
  });
});
