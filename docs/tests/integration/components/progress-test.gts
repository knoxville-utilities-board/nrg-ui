import { find, render } from '@ember/test-helpers';
import { Progress } from '@nrg-ui/core';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

import type { TestContext } from '@ember/test-helpers';

interface Context extends TestContext {
  element: HTMLElement;
}

module('Integration | Component | progress', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders (inline)', async function (this: Context, assert) {
    await render(
      <template>
        <Progress @animated={{true}} @progress={{40}} @striped={{true}} />
      </template>,
    );

    assert
      .dom('div:has(> div)')
      .hasAria('valuemin', '0')
      .hasAria('valuemax', '100')
      .hasAria('valuenow', '40')
      .hasClass('progress')
      .hasAttribute('role', 'progressbar');

    assert
      .dom('div > div:not(:has(> *))')
      .containsText('40%')
      .hasClass('progress-bar')
      .hasClass('progress-bar-animated')
      .hasClass('progress-bar-striped');

    //  assert.dom(...).hasStyle uses window.getComputedStyle, which
    //  calculates values (e.g. width) based on the actual rendered
    //  dimensions of the element. Since we are using a test container
    //  with a variable width, we can't use this method to test the width
    //  of the progress bar.
    const progress = this.element.querySelector(
      'div > div:not(:has(> *))',
    ) as HTMLDivElement;

    assert.strictEqual(progress.style.width, '40%');
  });

  test('it renders (stacked)', async function (this: Context, assert) {
    await render(
      <template>
        <Progress @stacked={{true}} as |Segment|>
          <Segment @progress={{40}} @striped={{true}} @animated={{true}} />
          <Segment class="bg-warning" @title="foo bar" @progress={{60}} />
        </Progress>
      </template>,
    );

    const container = find('div.progress-stacked') as HTMLDivElement;
    let segment = container.querySelector(
      'div:nth-child(1):has(> .progress-bar)',
    ) as HTMLDivElement;
    let bar = segment.querySelector('.progress-bar') as HTMLDivElement;

    assert
      .dom(segment)
      .doesNotHaveAria('label')
      .hasAria('valuemin', '0')
      .hasAria('valuemax', '100')
      .hasAria('valuenow', '40')
      .hasClass('progress')
      .hasAttribute('role', 'progressbar')
      .doesNotHaveAttribute('title');

    assert.strictEqual(segment.style.width, '40%');

    assert
      .dom(bar)
      .containsText('40%')
      .hasClass('progress-bar')
      .hasClass('progress-bar-striped')
      .hasClass('progress-bar-animated');

    segment = container.querySelector(
      'div:nth-child(2):has(> .progress-bar)',
    ) as HTMLDivElement;
    bar = segment.querySelector('.progress-bar') as HTMLDivElement;

    assert
      .dom(segment)
      .hasAria('label', 'foo bar')
      .hasAria('valuemin', '0')
      .hasAria('valuemax', '100')
      .hasAria('valuenow', '60')
      .hasClass('progress')
      .hasAttribute('role', 'progressbar')
      .hasAttribute('title', 'foo bar');

    assert.strictEqual(segment.style.width, '60%');

    assert
      .dom(bar)
      .containsText('60%')
      .hasClass('progress-bar')
      .doesNotHaveClass('progress-bar-striped')
      .doesNotHaveClass('progress-bar-animated');
  });
});
