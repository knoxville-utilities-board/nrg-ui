import { render } from '@ember/test-helpers';
import { MktgFeatureList } from '@nrg-ui/core';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | mktg/feature-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(4);
    await render(
      <template>
        <MktgFeatureList @columns="2">
          <:label>
            <p class="mt-2">Includes:</p>
          </:label>
          <:features as |Feature|>
            <Feature @icon="bi-check2" @text="Feature 1" />
            <Feature @icon="bi-check2" @text="Feature 1" />
            <Feature @icon="bi-check2" @text="Feature 1" />
            <Feature @icon="bi-check2" @text="Feature 1" />
          </:features>
        </MktgFeatureList>
      </template>,
    );

    assert.dom('div p').exists('Feature list label renders');
    assert.dom('div div').hasClass('grid');
    assert.dom('div div p span').hasClass('bi-check2');
    assert.dom('p.g-col-lg-6').hasText('Feature 1');
  });
});
