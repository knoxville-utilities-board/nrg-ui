import { render } from '@ember/test-helpers';
import Toaster from '@nrg-ui/core/components/toaster';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module('Integration | Component | toaster', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><Toaster /></template>);
    assert.dom('.toaster').exists();
  });

  test('it applies fixed class when fixed arg is true or missing', async function (assert) {
    await render(<template><Toaster @fixed={{true}} /></template>);
    assert.dom('.toaster').hasClass('fixed');

    await render(<template><Toaster /></template>);
    assert.dom('.toaster').hasClass('fixed');
  });

  test('it does not apply fixed class when fixed arg is false', async function (assert) {
    await render(<template><Toaster @fixed={{false}} /></template>);
    assert.dom('.toaster').doesNotHaveClass('fixed');
  });

  test('it displays toasts', async function (assert) {
    const toast = this.owner.lookup('service:toast');
    toast.queue.push({
      message: 'Test message',
      type: 'info',
      sticky: true,
    });

    await render(<template><Toaster /></template>);
    assert.dom('.alert').exists().containsText('Test message');
  });
});
