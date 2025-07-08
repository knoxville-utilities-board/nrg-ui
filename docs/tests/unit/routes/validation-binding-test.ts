import { setupTest } from 'docs/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Route | validation-binding', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:validation-binding');
    assert.ok(route);
  });
});
