import { render } from '@ember/test-helpers';
import FeatureList from '@nrg-ui/ember/components/mktg/feature-list';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | components | mktg/feature-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(4);
    await render(<template>
      <FeatureList @columns="2">
        <:label>
          <p class="mt-2">Includes:</p>
        </:label>
        <:features as |Feature|>
          <Feature @icon="bi-check2" @text="Feature 1" />
          <Feature @icon="bi-check2" @text="Feature 1" />
          <Feature @icon="bi-check2" @text="Feature 1" />
          <Feature @icon="bi-check2" @text="Feature 1" />
        </:features>
      </FeatureList>
    </template>);

    assert.dom('div p').exists('Feature list label renders');
    assert.dom('div div').hasClass('grid');
    assert.dom('div div p span').hasClass('bi-check2');
    assert.dom('p.g-col-6').hasText('Feature 1');
  });
});
