import { module, test } from 'qunit';
import { setupTest } from 'ember-test-app/tests/helpers';

module('Unit | Route | progress', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:progress');
    assert.ok(route);
  });
});
