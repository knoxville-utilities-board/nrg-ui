import { setupTest } from 'ember-test-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Service | application', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    const service = this.owner.lookup('service:application');
    assert.ok(service);
  });
});
