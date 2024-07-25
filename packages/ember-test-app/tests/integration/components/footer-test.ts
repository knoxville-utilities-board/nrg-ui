import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`<Footer/>`);

    assert.dom('footer').exists();
  });

  test('it renders the left content', async function (assert) {
    assert.expect(1);

    await render(hbs`<Footer>
      <:left>
        Left Content Test
      </:left>
    </Footer>`);

    assert.dom('footer div div div:first-child').hasText('Left Content Test');
  });

  test('it renders the right content', async function (assert) {
    assert.expect(1);

    await render(hbs`<Footer>
      <:right>
        Right Content Test
      </:right>
    </Footer>`);

    assert.dom('footer div div div:nth-child(2)').hasText('Right Content Test');
  });

  test('it renders both the left and right content', async function (assert) {
    assert.expect(2);

    await render(hbs`<Footer>
      <:left>
        Left Content Test
      </:left>
      <:right>
        Right Content Test
      </:right>
    </Footer>`);

    assert.dom('footer div div div:first-child').hasText('Left Content Test');
    assert.dom('footer div div div:nth-child(2)').hasText('Right Content Test');
  });
});
