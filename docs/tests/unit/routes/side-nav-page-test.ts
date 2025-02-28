import { setupTest } from 'docs/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Route | side-nav-page', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:side-nav-page');
    assert.ok(route);
  });
});
