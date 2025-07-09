import { render } from '@ember/test-helpers';
import { Icon } from '@nrg-ui/core';
import { assert, module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module('Integration | Component | icon', function (hooks) {
  setupRenderingTest(hooks);

  test('icon renders without circular background', async function () {
    await render(
      <template><Icon class="test" @type="icon" @color="primary" /></template>,
    );

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
    await render(
      <template>
        <Icon class="test" @type="icon" @color="warning" @circular={{true}} />
      </template>,
    );
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

  test('icon renders at a diffrent size background', async function () {
    await render(
      <template>
        <Icon class="test" @type="icon" @color="primary" @size={{3}} />
      </template>,
    );

    assert
      .dom('.test div')
      .hasClass('fs-3', 'Has a fontsize class based on the the size argument');
  });
});
