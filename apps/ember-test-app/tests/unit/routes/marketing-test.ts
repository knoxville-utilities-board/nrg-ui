import { setupTest } from 'ember-test-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Route | marketing', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:marketing');
    assert.ok(route);
  });
});
