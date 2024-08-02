import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | mktg/icon', function (hooks) {
  setupRenderingTest(hooks);

  test('icon renders without circular background', async function () {
    await render(hbs`
      <Icon
        class="test"
        @type="icon"
        @color="primary"
      />`);

    assert.dom('.d-flex.test').exists('Icon renders passed attributes');
    assert.notOk(
      document.querySelector('.rounded-circle'),
      'Icon does not have rounded-circle class when @circular is not passed',
    );
    assert
      .dom('div div i')
      .hasClass('icon', 'Type param renders icon correctly');
    assert
      .dom('div div i')
      .hasClass('text-primary', 'Color param renders text color correctly');
  });

  test('icon renders with circular background', async function () {
    await render(hbs`
      <Icon
        class="test"
        @type="icon"
        @color="warning"
        @circular={{true}}
      />`);
    assert
      .dom('.test div')
      .hasClass(
        'rounded-circle',
        'Icon has rounded-circle class when @circular is true',
      );
    assert
      .dom('.test div')
      .hasClass('bg-warning-subtle', 'Icon bubble has correct bg color passed');
  });
});
