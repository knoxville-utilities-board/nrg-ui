import { render } from '@ember/test-helpers';
import { version } from '@nrg-ui/core/helpers/version';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

module('Integration | Helper | version', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template>{{version}}</template>);

    assert.dom().hasText('version-v1');
  });
});
