import { render } from '@ember/test-helpers';
import { Footer } from '@nrg-ui/core';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module('Integration | Component | footer', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(<template><Footer /></template>);

    assert.dom('footer').exists();
  });

  test('it renders the left content', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Footer>
          <:left>
            Left Content Test
          </:left>
        </Footer>
      </template>,
    );

    assert.dom('footer div div div:first-child').hasText('Left Content Test');
  });

  test('it renders the right content', async function (assert) {
    assert.expect(1);

    await render(
      <template>
        <Footer>
          <:right>
            Right Content Test
          </:right>
        </Footer>
      </template>,
    );

    assert.dom('footer div div div:nth-child(1)').hasText('Right Content Test');
  });

  test('it renders both the left and right content', async function (assert) {
    assert.expect(2);

    await render(
      <template>
        <Footer>
          <:left>
            Left Content Test
          </:left>
          <:right>
            Right Content Test
          </:right>
        </Footer>
      </template>,
    );

    assert.dom('footer div div div:first-child').hasText('Left Content Test');
    assert.dom('footer div div div:nth-child(2)').hasText('Right Content Test');
  });
});
