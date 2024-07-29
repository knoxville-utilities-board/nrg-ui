import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | mktg/promo', function (hooks) {
  setupRenderingTest(hooks);

  test('Promo component renders', async function () {
    await render(hbs`  <Mktg::Promo
      class="promo"
      @productName="Product name"
      @imageSrc="https://place-hold.it/700x700"
      @imageAltText="Placeholder"
    >
      <:header>
        <p class="m-0 p-0">Header Text</p>
      </:header>
      <:description>
        <p>Description</p>
      </:description>
    </Mktg::Promo>`);

    assert.dom('.row.bg-primary.text-white.promo').exists('Promo renders');
    assert
      .dom('div div p')
      .hasText('Product name', 'Product name renders with correct content');
    assert
      .dom('div div .mb-3.fs-1.fw-semibold.lh-sm p')
      .hasText('Header Text', 'Header named block renders correct content');
    assert
      .dom('div div p:nth-of-type(2)')
      .hasText(
        'Description',
        'Description named block renders correct content',
      );
    const imageElement = find('img');
    assert.equal(
      imageElement?.src,
      'https://place-hold.it/700x700',
      'The img src renders correctly',
    );
    assert.equal(
      imageElement?.alt,
      'Placeholder',
      'The img alt tag renders correctly',
    );
  });
});
