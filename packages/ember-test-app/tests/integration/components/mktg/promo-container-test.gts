import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import PromoContainer from '@nrg-ui/ember/components/mktg/promo-container';

module('Integration | components | mktg/promo-container', function (hooks) {
  setupRenderingTest(hooks);

  test('Promo container renders', async function () {
    await render(<template>
      <PromoContainer class="promo-container" as |Container|>
        <Container.SectionHeader @title="Title" @subject="Subject" />
        <Container.Promo class="promo" @productName="Product name">
          <:img>
            <img src="https://place-hold.it/700x700" alt="Placeholder" />
          </:img>
          <:header>
            <p class="m-0 p-0">Header Text</p>
          </:header>
          <:description>
            <p>Description</p>
          </:description>
        </Container.Promo>
      </PromoContainer>
    </template>);

    assert
      .dom(
        '.container .row.p-4.text-primary.d-flex.justify-content-center.promo-container',
      )
      .exists('Promo container renders with correct classes');
    assert
      .dom('.container div .col-12.d-flex.flex-column.align-items-center')
      .exists('Section header renders within container');
    assert.dom('.row.promo').exists('Promo renders within container');
  });
});
