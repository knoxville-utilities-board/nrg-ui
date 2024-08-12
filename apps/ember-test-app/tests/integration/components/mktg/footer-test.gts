import { render } from '@ember/test-helpers';
import Footer from '@nrg-ui/ember/components/mktg/footer';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | components | footer', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><Footer /></template>);

    assert.dom('footer').exists();
  });

  test('it contains a horizontal line', async function (assert) {
    await render(<template><Footer @hasDivider={{true}} /></template>);

    assert.dom('footer div hr').exists();
  });

  test('it contains a navigation bar', async function (assert) {
    await render(<template>
      <Footer>
        <:nav>
          Nav Test
        </:nav>
      </Footer>
    </template>);

    assert
      .dom('footer div div:first-child div:first-child')
      .exists()
      .hasText('Nav Test');
  });

  test('it contains social media links', async function (assert) {
    await render(<template>
      <Footer>
        <:social-media>
          Social Media Test
        </:social-media>
      </Footer>
    </template>);

    assert
      .dom('footer div div:first-child div:nth-child(1)')
      .exists()
      .hasText('Social Media Test')
      .hasClass('ms-md-auto');
  });

  test('it contains a brand section', async function (assert) {
    await render(<template>
      <Footer>
        <:brand>
          Brand Test
        </:brand>
      </Footer>
    </template>);

    assert
      .dom('footer div div:nth-child(2) div:first-child')
      .exists()
      .hasText('Brand Test');
  });

  test('it contains a legal section', async function (assert) {
    await render(<template>
      <Footer>
        <:legal>
          Legal Test
        </:legal>
      </Footer>
    </template>);

    assert
      .dom('footer div div:nth-child(2) div:nth-child(1)')
      .exists()
      .hasText('Legal Test')
      .hasClass('ms-md-auto');
  });

  test('it contains all sections', async function (assert) {
    await render(<template>
      <Footer>
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
      </Footer>
    </template>);

    assert
      .dom('footer div div:nth-child(1) div:nth-child(1)')
      .exists()
      .hasText('Nav Test');

    assert
      .dom('footer div div:nth-child(1) div:nth-child(2)')
      .exists()
      .hasText('Social Media Test')
      .hasNoClass('ms-md-auto');

    assert
      .dom('footer div div:nth-child(2) div:nth-child(1)')
      .exists()
      .hasText('Brand Test');

    assert
      .dom('footer div div:nth-child(2) div:nth-child(2)')
      .exists()
      .hasText('Legal Test')
      .hasNoClass('ms-md-auto');
  });
});
