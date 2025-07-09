import { render } from '@ember/test-helpers';
import { MktgPromoContainer } from '@nrg-ui/core';
import { assert, module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | mktg/promo-container', function (hooks) {
  setupRenderingTest(hooks);

  test('Promo container renders', async function () {
    await render(
      <template>
        <MktgPromoContainer class="promo-container" as |Container|>
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
        </MktgPromoContainer>
      </template>,
    );

    assert
      .dom('.container .row.p-4.d-flex.justify-content-center.promo-container')
      .exists('Promo container renders with correct classes');
    assert
      .dom('.container div .col-12.d-flex.flex-column.align-items-center')
      .exists('Section header renders within container');
    assert.dom('.row.promo').exists('Promo renders within container');
  });
});
