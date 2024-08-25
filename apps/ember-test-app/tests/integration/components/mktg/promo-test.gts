import { render, find } from '@ember/test-helpers';
import Promo from '@nrg-ui/ember/components/mktg/promo';
import { assert, module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | mktg/promo', function (hooks) {
  setupRenderingTest(hooks);

  test('Promo component renders', async function () {
    await render(<template>
      <Promo class="promo" @productName="Product name">
        <:img>
          <img src="https://place-hold.it/700x700" alt="Placeholder" />
        </:img>
        <:header>
          <p class="m-0 p-0">Header Text</p>
        </:header>
        <:description>
          <p>Description</p>
        </:description>
      </Promo>
    </template>);

    assert.dom('.row.promo').exists('Promo renders default horizontal');
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

    await render(<template>
      <Promo class="promo" @vertical={{true}} @productName="Product name">
        <:img>
          <img src="https://place-hold.it/700x700" alt="Placeholder" />
        </:img>
        <:header>
          <p class="m-0 p-0">Header Text</p>
        </:header>
        <:description>
          <p>Description</p>
        </:description>
      </Promo>
    </template>);

    assert.dom('.promo').exists('Promo renders vertical when param is true');
    assert
      .dom(
        '.promo .d-flex.justify-content-center.mb-5 .col-12.col-md-10.justify-content-center img',
      )
      .exists('Image renders in vertical promo with correct classes');
  });
});
