import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | mktg/footer', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Mktg::Footer />`);

    assert.dom('footer').exists();
  });

  test('it contains a horizontal line', async function (assert) {
    await render(hbs`<Mktg::Footer @hasHorizontalLine={{true}}/>`);

    assert.dom('footer div hr').exists();
  });

  test('it contains a navigation bar', async function (assert) {
    await render(hbs`<Mktg::Footer>
      <:nav>
        Nav Test
      </:nav>
    </Mktg::Footer>`);

    assert
      .dom('footer div div:first-child div:first-child')
      .exists()
      .hasText('Nav Test');
  });

  test('it contains social media links', async function (assert) {
    await render(hbs`<Mktg::Footer>
      <:socialMedia>
        Social Media Test
      </:socialMedia>
    </Mktg::Footer>`);

    assert
      .dom('footer div div:first-child div:nth-child(2)')
      .exists()
      .hasText('Social Media Test');
  });

  test('it contains a brand section', async function (assert) {
    await render(hbs`<Mktg::Footer>
      <:brand>
        Brand Test
      </:brand>
    </Mktg::Footer>`);

    assert
      .dom('footer div div:nth-child(2) div:first-child')
      .exists()
      .hasText('Brand Test');
  });

  test('it contains a legal section', async function (assert) {
    await render(hbs`<Mktg::Footer>
      <:legal>
        Legal Test
      </:legal>
    </Mktg::Footer>`);

    assert
      .dom('footer div div:nth-child(2) div:nth-child(2)')
      .exists()
      .hasText('Legal Test');
  });
});
