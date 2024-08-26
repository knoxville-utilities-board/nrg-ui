import { render } from '@ember/test-helpers';
import CardContainer from '@nrg-ui/ember/components/mktg/card-container';
import { assert, module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | mktg/card-container', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function () {
    await render(<template>
      <CardContainer class="bg-info rounded" as |Container|>
        <Container.Card class="first g-col-12 g-col-md-4" />
        <Container.Card class="second g-col-12 g-col-md-4" />
        <Container.Card class="third g-col-12 g-col-md-4" />
      </CardContainer>
    </template>);

    assert.dom('.grid.p-2').exists('Card container renders');
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
