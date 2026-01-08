import { render } from '@ember/test-helpers';
import { MktgFooter } from '@nrg-ui/core';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | mktg/footer', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><MktgFooter /></template>);

    assert.dom('footer').exists();
  });

  test('it contains a horizontal line', async function (assert) {
    await render(<template><MktgFooter @hasDivider={{true}} /></template>);

    assert.dom('footer div hr').exists();
  });

  test('it contains a navigation bar', async function (assert) {
    await render(
      <template>
        <MktgFooter>
          <:nav>
            Nav Test
          </:nav>
        </MktgFooter>
      </template>,
    );

    assert.dom('footer div div:first-child div:first-child').exists().hasText('Nav Test');
  });

  test('it contains social media links', async function (assert) {
    await render(
      <template>
        <MktgFooter>
          <:social-media>
            Social Media Test
          </:social-media>
        </MktgFooter>
      </template>,
    );

    assert
      .dom('footer div div:first-child div:nth-child(1)')
      .exists()
      .hasText('Social Media Test')
      .hasClass('ms-md-auto');
  });

  test('it contains a brand section', async function (assert) {
    await render(
      <template>
        <MktgFooter>
          <:brand>
            Brand Test
          </:brand>
        </MktgFooter>
      </template>,
    );

    assert.dom('footer div div:nth-child(2) div:first-child').exists().hasText('Brand Test');
  });

  test('it contains a legal section', async function (assert) {
    await render(
      <template>
        <MktgFooter>
          <:legal>
            Legal Test
          </:legal>
        </MktgFooter>
      </template>,
    );

    assert
      .dom('footer div div:nth-child(2) div:nth-child(1)')
      .exists()
      .hasText('Legal Test')
      .hasClass('ms-md-auto');
  });

  test('it contains all sections', async function (assert) {
    await render(
      <template>
        <MktgFooter>
          <:nav>
            Nav Test
          </:nav>
          <:social-media>
            Social Media Test
          </:social-media>
          <:brand>
            Brand Test
          </:brand>
          <:legal>
            Legal Test
          </:legal>
        </MktgFooter>
      </template>,
    );

    assert.dom('footer div div:nth-child(1) div:nth-child(1)').exists().hasText('Nav Test');

    assert
      .dom('footer div div:nth-child(1) div:nth-child(2)')
      .exists()
      .hasText('Social Media Test')
      .hasNoClass('ms-md-auto');

    assert.dom('footer div div:nth-child(2) div:nth-child(1)').exists().hasText('Brand Test');

    assert
      .dom('footer div div:nth-child(2) div:nth-child(2)')
      .exists()
      .hasText('Legal Test')
      .hasNoClass('ms-md-auto');
  });
});
