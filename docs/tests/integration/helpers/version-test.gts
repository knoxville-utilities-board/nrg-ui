import { render } from '@ember/test-helpers';
import { version } from '@nrg-ui/core/helpers/version';
import { setupRenderingTest } from 'docs/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Helper | version', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template>{{version}}</template>);

    assert.dom().hasText('version-v1');
  });
});
