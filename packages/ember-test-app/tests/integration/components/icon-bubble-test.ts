import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | mktg/icon-bubble', function (hooks) {
  setupRenderingTest(hooks);

  test('icon-bubble renders', async function () {
    await render(hbs`
      <IconBubble
        class="test"
        @icon="icon"
        @backgroundColor="primary"
        @iconColor="light"
      />`);

    assert.dom('.d-flex.test').exists('IconBubble renders passed attributes');
    assert
      .dom('.d-flex.test div')
      .hasClass('bg-primary', 'Color param renders background color correctly');
    assert
      .dom('div div i')
      .hasClass('icon', 'Icon param renders icon correctly');
    assert
      .dom('div div i')
      .hasClass('text-light', 'Icon param renders text color correctly');
  });
});
