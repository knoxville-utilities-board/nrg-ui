import { render } from '@ember/test-helpers';
import { MktgServicePricing } from '@nrg-ui/core';
import { assert, module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | mktg/service-pricing', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function () {
    await render(<template>
      <MktgServicePricing
        @label="Service"
        @description="Description"
        @icon="bi-emoji-smile"
      />
    </template>);

    assert
      .dom('div div:nth-child(1) div:nth-child(1) > i')
      .hasClass('bi-emoji-smile');

    assert.dom('div div:nth-child(1) div:nth-child(2)').hasText('Service');

    assert.dom('div div:nth-child(1) div:nth-child(3)').hasText('Description');
  });

  test('it has different color border when active', async function () {
    await render(<template><MktgServicePricing /></template>);

    assert.dom('div').doesNotHaveClass('border-primary');

    await render(<template><MktgServicePricing @active={{true}} /></template>);

    assert.dom('div').hasClass('border-primary');
  });

  test('it can change the status of the  description', async function () {
    await render(<template>
      <MktgServicePricing
        @label="Service"
        @description="Description"
        @active={{true}}
        @selected={{true}}
      />
    </template>);

    assert
      .dom('div div:nth-child(1) div:nth-child(3)')
      .hasText('Description')
      .hasClass('fw-bold')
      .hasNoClass('fw-normal')
      .hasNoClass('text-decoration-underline text-light-emphasis');

    await render(<template>
      <MktgServicePricing
        @label="Service"
        @description="Description"
        @active={{true}}
        @selected={{false}}
      />
    </template>);

    assert
      .dom('div div:nth-child(1) div:nth-child(3)')
      .hasText('Description')
      .hasClass('fw-normal')
      .hasNoClass('fw-bold')
      .hasNoClass('text-decoration-underline text-light-emphasis');

    await render(<template>
      <MktgServicePricing
        @label="Service"
        @description="Description"
        @active={{false}}
        @selected={{true}}
      />
    </template>);

    assert
      .dom('div div:nth-child(1) div:nth-child(3)')
      .hasText('Description')
      .hasClass('fw-bold')
      .hasNoClass('fw-normal')
      .hasNoClass('text-decoration-underline text-light-emphasis');

    await render(<template>
      <MktgServicePricing
        @label="Service"
        @description="Description"
        @active={{false}}
        @selected={{false}}
      />
    </template>);

    assert
      .dom('div div:nth-child(1) div:nth-child(3)')
      .hasText('Description')
      .hasClass('fw-normal');
  });

  test('it can render a service product', async function () {
    await render(<template>
      <MktgServicePricing @label="Service" @product="Service Product" />
    </template>);

    assert
      .dom('div div:nth-child(1) div:nth-child(2)')
      .hasText('Service: Service Product');
  });

  test('it can render an addon', async function () {
    await render(<template>
      <MktgServicePricing
        @label="Service"
        @description="Description"
        @icon="bi-emoji-smile"
        as |Addon|
      >
        <Addon @label="Addon" @price="$100" />
      </MktgServicePricing>
    </template>);

    assert.dom('div div:nth-child(2) div:nth-child(1)').hasText('Addon');

    assert.dom('div div:nth-child(2) div:nth-child(2)').hasText('$100');
  });

  test('it can render an addon with a quantity', async function () {
    await render(<template>
      <MktgServicePricing
        @label="Service"
        @description="Description"
        @icon="bi-emoji-smile"
        as |Addon|
      >
        <Addon @label="Addon" @price="$100" @quantity="2" />
      </MktgServicePricing>
    </template>);

    assert
      .dom('div div:nth-child(2) div:nth-child(1)')
      .hasText('Addon | Qty: 2');
  });
});
