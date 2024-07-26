import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mktg/vertical-card', function (hooks) {
  setupRenderingTest(hooks);

  test('vertical card correctly renders', async function () {
    await render(hbs`<Mktg::VerticalCard
      class="g-col-12"
      @title="Title"
      @subtitle="Subtitle"
      @price="25"
      >
      <p class="card-text">Bottom section content</p>
      </Mktg::VerticalCard>`);

    assert
      .dom('.card.g-col-12')
      .exists('Base card is rendered with passed attributes');
    assert
      .dom(
        '.card .card-header .d-flex.flex-column.justify-content-start.align-items-center.bg-white.mb-2',
      )
      .exists('Vertical card top section renders within card-header');
    assert
      .dom('.card .card-header div div:nth-of-type(2) p')
      .hasText(
        'Subtitle',
        'Subtitle content renders in correct order with correct text',
      );
    assert
      .dom('.card .card-body p')
      .hasText(
        'Bottom section content',
        'Vertical card bottom section renders content within card-body',
      );
  });

  test('vertical card correctly renders price and title when leftAlignPrice is true', async function () {
    await render(hbs`<Mktg::VerticalCard
      class="g-col-12"
      @title="Title"
      @subtitle="Subtitle"
      @price="25"
      @leftAlignPrice={{true}}
      >
      <p class="card-text">Bottom section content</p>
      </Mktg::VerticalCard>`);

    assert
      .dom(
        '.card .card-header div .d-flex.flex-column.justify-content-start.w-100.m-0',
      )
      .exists('Div containing price and title has correct classes');
    assert
      .dom('.card .card-header div div p')
      .hasText('$25/mo', 'Price renders with correct content in first p tag');
    assert
      .dom('.card .card-header div div p:nth-of-type(2)')
      .hasText('Title', 'Title renders with correct content in second p tag');
  });

  test('vertical card renders correctly renders price and title when leftAlignPrice is false', async function () {
    await render(hbs`<Mktg::VerticalCard
      class="g-col-12"
      @title="Title"
      @subtitle="Subtitle"
      @price="25"
      @leftAlignPrice={{false}}
      >
      <p class="card-text">Bottom section content</p>
      </Mktg::VerticalCard>`);
    assert
      .dom(
        '.card .card-header div .d-flex.flex-row.justify-content-between.w-100.m-0',
      )
      .exists('Div containing price and title has correct classes');
    assert
      .dom('.card .card-header div div p')
      .hasText('Title', 'Title renders with correct content in first p tag');
    assert
      .dom('.card .card-header div div p:nth-of-type(2)')
      .hasText('$25/mo', 'Price renders with correct content in second p tag');
  });
});
