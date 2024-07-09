import { module, test } from 'qunit';
import { setupTest } from 'ember-test-app/tests/helpers';

module('Unit | Route | marketing-test', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:marketing-test');
    assert.ok(route);
  });
});
