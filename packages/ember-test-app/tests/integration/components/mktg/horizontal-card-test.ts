import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | mktg/horizontal-card', function (hooks) {
  setupRenderingTest(hooks);

  test('horizontal card correctly renders', async function () {
    await render(hbs`<Mktg::HorizontalCard
      class="g-col-12"
      @title="Title"
      @price="25"
      >
        <:left>
          <p>Left yielded content</p>
        </:left>
        <:right>
          <p>Right yielded content</p>
        </:right>
      </Mktg::HorizontalCard>`);

    assert
      .dom('.card.g-col-12')
      .exists('Base card is rendered with passed attributes');
    assert
      .dom('.card .card-body div div div p')
      .hasText('Title', 'Title renders correctly');
    assert
      .dom('.card .card-body div div div p:nth-of-type(2)')
      .hasText('$25/mo', 'Price renders correctly');
    assert
      .dom('.card .card-body div div div p:nth-of-type(3)')
      .hasText(
        'Left yielded content',
        'Content in left named block renders correctly',
      );
    assert
      .dom('.card .card-body div div:nth-of-type(2) div')
      .hasClass('vr', 'Vertical rule divider renders');
    assert
      .dom('.card .card-body div hr')
      .hasClass('d-md-none', 'Horizontal rule renders with correct class');
    assert
      .dom('.card .card-body div div:nth-of-type(3) p')
      .hasText(
        'Right yielded content',
        'Content in right named block renders correctly',
      );
  });
});
