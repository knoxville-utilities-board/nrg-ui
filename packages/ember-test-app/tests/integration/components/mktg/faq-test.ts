import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | mktg/faq', function (hooks) {
  setupRenderingTest(hooks);

  test('faq renders', async function () {
    await render(hbs`<Mktg::Faq
      class="test"
      @question="Question"
      @answer="Answer"
    />`);

    assert
      .dom('.d-flex.flex-column.p-2.m-2.bg-white.rounded.test')
      .exists('FAQ renders with passed attributes');

    assert
      .dom('div div p')
      .hasText('Question', 'Question parameter renders correct content');
    assert
      .dom('div div button i')
      .hasClass('bi-plus', 'Icon has correct class when FAQ is closed');

    assert
      .dom('div div div:nth-of-type(2) p')
      .hasText('Answer', 'Answer parameter renders correct content');
    assert
      .dom('div div div:nth-of-type(2)')
      .hasClass('collapse', 'Div containing answer has collapse class');

    await click('button');

    assert
      .dom('div div div:nth-of-type(2)')
      .hasClass(
        'show',
        'Div containing answer has show class after clicking button',
      );
    assert
      .dom('div div button i')
      .hasClass('bi-dash', 'Icon switches to dash after clicking button');

    await render(hbs`<Mktg::Faq
        @open={{true}}
        @question="Question"
        @answer="Answer"
      />`);
    assert
      .dom('div div div:nth-of-type(2)')
      .hasClass(
        'show',
        'Div containing answer has class show when open parameter is true',
      );
    assert
      .dom('div div button i')
      .hasClass('bi-dash', 'Icon starts as dash when open parameter is true');
  });
});
