import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | mktg/dual-promo', function (hooks) {
  setupRenderingTest(hooks);

  test('dual-promo renders', async function () {
    await render(hbs`<Mktg::DualPromo
      class="test"
      @subject="Subject"
      @headerText="Header"
      @leftPromoTitle="Left Title"
      @rightPromoTitle="Right Title"
    >
    <:header-description>
      <p>Header Description</p>
    </:header-description>
      <:left-img>
        <img src="https://place-hold.it/400x150" alt="Placeholder" />
      </:left-img>
      <:left-description>
        <p>Left Description</p>
      </:left-description>
      <:right-img>
        <img src="https://place-hold.it/400x150" alt="Placeholder" />
      </:right-img>
      <:right-description>
        <p>Right Description</p>
      </:right-description>
    </Mktg::DualPromo>`);

    assert
      .dom('.row.p-4.text-primary.test')
      .exists('Dual-promo renders with passed attributes');

    assert
      .dom('div div p')
      .hasText('Subject', 'Subject parameter renders correct content');
    assert
      .dom('div div p:nth-of-type(2)')
      .hasText('Header', 'Header parameter renders correct content');
    assert
      .dom('div div p:nth-of-type(3)')
      .hasText(
        'Header Description',
        'Header Description renders correct content',
      );
    assert.dom('div div img').exists({ count: 2 }, 'Two images are rendered');
    assert
      .dom('div div:nth-of-type(2) div div p')
      .hasText('Left Title', 'Left Title renders correct content');
    assert
      .dom('div div:nth-of-type(2) div div p:nth-of-type(2)')
      .hasText('Left Description', 'Left Description renders correct content');
    assert
      .dom('div div:nth-of-type(3) div div p ')
      .hasText('Right Title', 'Right title renders correct content');
    assert
      .dom('div div:nth-of-type(3) div div p:nth-of-type(2)')
      .hasText(
        'Right Description',
        'Right Description renders correct content',
      );
  });
});
