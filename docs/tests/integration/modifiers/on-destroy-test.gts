import { clearRender } from '@ember/test-helpers';
import { find, render } from '@ember/test-helpers';
import { onDestroy } from '@nrg-ui/core';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Modifier | on-destroy', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(6);

    let element: HTMLElement | null = null;

    const callback = (el: HTMLElement, ...args: unknown[]) => {
      assert.step('callback');
      assert.strictEqual(el, element, 'Element is passed');
      assert.deepEqual(
        args,
        [5, 'foo', 'BAR'],
        'Additional arguments are passed',
      );
    };

    assert.step('before render');

    await render(
      <template>
        <div {{onDestroy callback 5 "foo" "BAR"}}></div>
      </template>,
    );

    assert.step('after render');

    element = await find('div');

    await clearRender();

    assert.verifySteps(
      ['before render', 'after render', 'callback'],
      'Steps are correct',
    );
  });
});
