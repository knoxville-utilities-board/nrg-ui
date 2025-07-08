import { render } from '@ember/test-helpers';
import { dependencySatisfies, macroCondition } from '@embroider/macros';
import lookupService from '@nrg-ui/core/helpers/lookup-service';
import { setupRenderingTest } from 'docs/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Helper | lookup-service', function (hooks) {
  setupRenderingTest(hooks);

  if (
    macroCondition(dependencySatisfies('ember-source', '^6.3.0')) ? false : true
  ) {
    test('it looks up services', async function (assert) {
      assert.expect(1);

      const router = this.owner.lookup('service:router');

      function compare(service: unknown) {
        assert.strictEqual(service, router);
      }

      await render(<template>{{compare (lookupService "router")}}</template>);
    });

    test('non-existent services return undefined', async function (assert) {
      assert.expect(1);

      function compare(service: unknown) {
        assert.strictEqual(service, undefined);
      }

      await render(
        <template>{{compare (lookupService "i-don't-exist")}}</template>,
      );
    });
  }
});
