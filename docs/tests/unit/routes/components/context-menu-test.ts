import { setupTest } from 'docs/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Route | components/context-menu', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:components/context-menu');
    assert.ok(route);
  });
});
