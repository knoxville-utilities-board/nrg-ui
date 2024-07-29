import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | mktg/service-pricing', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function () {
    await render(hbs`<Mktg::ServicePricing
      @serviceName="Service"
      @description="Description"
      @icon="bi-emoji-smile"/>`);

    assert
      .dom('div div:nth-child(1) div:nth-child(1) > i')
      .hasClass('bi-emoji-smile');

    assert
      .dom(
        'div div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(1)',
      )
      .hasText('Service');

    assert
      .dom(
        'div div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(2)',
      )
      .hasText('Description');
  });

  test('it has different color border when active', async function () {
    await render(hbs`<Mktg::ServicePricing/>`);

    assert.dom('div').doesNotHaveClass('border-primary');

    await render(hbs`<Mktg::ServicePricing @active={{true}}/>`);

    assert.dom('div').hasClass('border-primary');
  });

  test('it has a description that can be disabled', async function () {
    await render(hbs`<Mktg::ServicePricing @description="Description Test"/>`);

    assert
      .dom(
        'div div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(2)',
      )
      .doesNotHaveClass('fw-normal');

    await render(
      hbs`<Mktg::ServicePricing @description="Description Test" @descriptionDisabled={{true}}/>`,
    );

    assert
      .dom(
        'div div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(2)',
      )
      .hasClass('fw-normal');
  });

  test('it can render a service type', async function () {
    await render(hbs`<Mktg::ServicePricing
      @serviceName="Service"
      @serviceType="Service Type"/>`);

    assert
      .dom(
        'div div:nth-child(1) div:nth-child(2) div:nth-child(1) div:nth-child(1)',
      )
      .hasText('Service: Service Type');
  });

  test('it can render an addon', async function () {
    await render(hbs`<Mktg::Service-Pricing
      @serviceName="Service"
      @description="Description"
      @icon="bi-emoji-smile"
      as |Addon|
    >
      <Addon @addon="Addon" @price="$100" />
    </Mktg::Service-Pricing>`);

    assert
      .dom(
        'div div:nth-child(1) div:nth-child(2) div:nth-child(2) div:nth-child(1)',
      )
      .hasText('Addon');

    assert
      .dom(
        'div div:nth-child(1) div:nth-child(2) div:nth-child(2) div:nth-child(2)',
      )
      .hasText('$100');
  });

  test('it can render an addon with a quantity', async function () {
    await render(hbs`<Mktg::Service-Pricing
      @serviceName="Service"
      @description="Description"
      @icon="bi-emoji-smile"
      as |Addon|
    >
      <Addon @addon="Addon" @price="$100" @quantity="2"/>
    </Mktg::Service-Pricing>`);

    assert
      .dom(
        'div div:nth-child(1) div:nth-child(2) div:nth-child(2) div:nth-child(1)',
      )
      .hasText('Addon | Qty: 2');
  });
});
