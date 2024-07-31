import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | mktg/promo-container', function (hooks) {
  setupRenderingTest(hooks);

  test('Promo container renders', async function () {
    await render(
      hbs`<Mktg::PromoContainer class="promo-container" as |Container|>
        <Container.Promo class="promo"
          @productName="Product name"
        >
          <:img>
              <img
                src="https://place-hold.it/700x700"
                alt="Placeholder"
              />
          </:img>
          <:header>
            <p class="m-0 p-0">Header Text</p>
          </:header>
          <:description>
            <p>Description</p>
          </:description>
        </Container.Promo>
      </Mktg::PromoContainer>`,
    );

    assert
      .dom(
        '.container .row.p-4.text-primary.d-flex.justify-content-center.promo-container',
      )
      .exists('Promo container renders with correct classes');

    assert.dom('.row.promo').exists('Promo renders within container');
  });
});