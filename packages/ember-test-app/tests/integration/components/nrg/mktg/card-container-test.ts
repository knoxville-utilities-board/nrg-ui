import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | nrg/mktg/card-container', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function () {
    await render(hbs`
      <Nrg::Mktg::CardContainer class="bg-info rounded p-2">
        <Nrg::Mktg::Card class="first col-12 col-md me-md-2 my-sm-2" />
        <Nrg::Mktg::Card class="second col-12 col-md me-md-2 my-sm-2" />
        <Nrg::Mktg::Card class="third col-12 col-md" />
      </Nrg::Mktg::CardContainer>
      `);

    assert
      .dom('.row.justify-content-center.p-2')
      .exists('Card container renders');
    assert
      .dom('div div.card')
      .exists({ count: 3 }, 'Three content cards render');
    assert
      .dom('div div.card')
      .hasClass('first', 'First content card renders in correct order');
    assert
      .dom('div div:nth-of-type(2).card')
      .hasClass('second', 'Second content card renders in correct order');
    assert
      .dom('div div:nth-of-type(3).card')
      .hasClass('third', 'Third content card renders in correct order');
  });
});
