import { render } from '@ember/test-helpers';
import { MktgCard } from '@nrg-ui/core';
import { assert, module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | mktg/card', function (hooks) {
  setupRenderingTest(hooks);

  test('card correctly renders vertical as default', async function () {
    await render(<template>
      <MktgCard class="g-col-12" @title="Title" @subtitle="Subtitle">
        <:callout>
          <p>Callout</p>
        </:callout>
        <:start>
          <div>
            <p>Start section content</p>
          </div>
        </:start>
        <:end>
          <p>End section content</p>
        </:end>
      </MktgCard>
    </template>);

    assert
      .dom('.card.g-col-12')
      .exists('Base card is rendered with passed attributes');
    assert
      .dom('.border-0')
      .doesNotExist(
        'Base card has border by default if hasBorder is not present',
      );
    assert
      .dom(
        '.card .card-header .d-flex.flex-column.justify-content-start.align-items-center.bg-white.mb-2',
      )
      .exists('Card renders vertically if no @horizontal is passed');
    assert
      .dom('.card .card-header div div p')
      .hasText(
        'Title',
        'Title content renders in correct order with correct text',
      );
    assert
      .dom('.card .card-header div p:nth-of-type(2)')
      .hasText(
        'Callout',
        'Callout renders in correct order with correct content when @leftAlignCallout is not passed',
      );
    assert
      .dom('.card .card-header div div:nth-of-type(2) p')
      .hasText(
        'Subtitle',
        'Subtitle content renders in correct order with correct text',
      );

    assert
      .dom('.card .card-header div div:nth-of-type(3) p')
      .hasText(
        'Start section content',
        'Start section renders when block is present',
      );
    assert.dom('.card .card-body').exists('Base card body renders');
    assert
      .dom('.card .card-body p')
      .hasText(
        'End section content',
        'End section renders when block is present',
      );

    await render(<template>
      <MktgCard
        class="g-col-12"
        @title="Title"
        @subtitle="Subtitle"
        @leftAlignCallout={{true}}
      >
        <:callout>
          <p>Callout</p>
        </:callout>
        <:start>
          <div>
            <p>Start section content</p>
          </div>
        </:start>
        <:end>
          <p>End section content</p>
        </:end>
      </MktgCard>
    </template>);

    assert
      .dom(
        '.card .card-header div .d-flex.flex-column.justify-content-start.w-100.m-0',
      )
      .exists(
        'Div containing left aligned callout renders when @leftAlignedCallout is true',
      );
    assert
      .dom('.card .card-header div div p')
      .hasText(
        'Callout',
        'Callout renders in correct order when @leftAlignCallout is true',
      );
    assert
      .dom('.card .card-header div div p:nth-of-type(2)')
      .hasText(
        'Title',
        'Title renders in correct order when @leftAlignCallout is true',
      );
  });

  test('card correctly renders horizontal when @horizontal is true', async function () {
    await render(<template>
      <MktgCard
        class="g-col-12"
        @title="Title"
        @subtitle="Subtitle"
        @horizontal={{true}}
      >
        <:callout>
          <p>Callout</p>
        </:callout>
        <:start>
          <div>
            <p>Start section content</p>
          </div>
        </:start>
        <:end>
          <p>End section content</p>
        </:end>
      </MktgCard>
    </template>);

    assert.notOk(
      document.querySelector('.card-header'),
      'Card header does not render when @horizontal is true',
    );
    assert.dom('.card .card-body').exists('Base card body renders');
    assert
      .dom('.card .card-body div div div p')
      .hasText('Title', 'Title renders in correct order with correct text');
    assert
      .dom('.card .card-body div div div p:nth-of-type(2)')
      .hasText(
        'Callout',
        'Callout renders in correct order with correct content',
      );
    assert
      .dom('.card .card-body div div div div p')
      .hasText(
        'Start section content',
        'Start section renders in correct order when present',
      );
    assert
      .dom(
        '.card .card-body div:nth-of-type(2) .vr.d-none.d-md-flex.text-body-secondary',
      )
      .exists('Divider renders if end block is present');
    assert
      .dom('.card .card-body div:nth-of-type(3) p')
      .hasText('End section content', 'End section renders when present');
  });

  test('Card passes hasBorder param correctly', async function () {
    await render(<template>
      <MktgCard
        class="g-col-12"
        @title="Title"
        @subtitle="Subtitle"
        @hasBorder={{false}}
      >
        <:callout>
          <p>Callout</p>
        </:callout>
        <:start>
          <div>
            <p>Start section content</p>
          </div>
        </:start>
        <:end>
          <p>End section content</p>
        </:end>
      </MktgCard>
    </template>);
    assert
      .dom('.card')
      .hasClass('border-0', 'Base card is passed hasBorder param');
  });
});
