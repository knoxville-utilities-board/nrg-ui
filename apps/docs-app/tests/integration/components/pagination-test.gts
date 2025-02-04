import { click, fillIn, render } from '@ember/test-helpers';
import { settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import Pagination from '@nrg-ui/core/components/pagination';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

import type { TestContext as BaseTestContext } from '@ember/test-helpers';

class Meta {
  @tracked
  start = 0;

  @tracked
  count = 25;

  @tracked
  total = 200;
}

interface TestContext extends BaseTestContext {
  meta: Meta;
}

module(
  'Integration | Component | pagination',
  function (this: TestContext, hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function (this: TestContext) {
      this.meta = new Meta();
    });

    test('it renders', async function (this: TestContext, assert) {
      const { meta } = this;

      meta.total = 100;

      await render(<template><Pagination @meta={{meta}} /></template>);

      assert.dom('[data-test-previous]').hasClass('disabled');
      assert.dom('[data-test-page="1"]').hasClass('active');
      assert.dom('.page-item').exists({ count: 5 });
      assert.dom('[data-test-page]').exists({ count: 2 });
      assert.dom('[data-test-next]').doesNotHaveClass('disabled');

      meta.total = 200;

      await settled();

      assert.dom('[data-test-previous]').hasClass('disabled');
      assert.dom('[data-test-page="1"]').hasClass('active');
      assert.dom('.page-item').exists({ count: 7 });
      assert.dom('[data-test-page]').exists({ count: 3 });
      assert.dom('[data-test-next]').doesNotHaveClass('disabled');
    });

    test('it works', async function (this: TestContext, assert) {
      const { meta } = this;

      const setPage = (start: number) => {
        meta.start = start;
        assert.step(`start: ${start}`);
      };

      meta.total = 120;

      await render(<template>
        <Pagination @meta={{meta}} @onChangePage={{setPage}} />
      </template>);

      assert
        .dom('[data-test-previous]')
        .hasClass('disabled', 'previous is disabled');
      assert
        .dom('[data-test-previous] + .page-item > .page-link')
        .hasClass('disabled', 'first slot is disabled')
        .matchesText(/\s/, 'first slot is empty');
      assert
        .dom('[data-test-previous] + .page-item + .page-item > .page-link')
        .hasClass('disabled', 'second slot is disabled')
        .matchesText(/\s/, 'second slot is empty');
      assert
        .dom('[data-test-page="1"]')
        .hasClass('active', 'third slot is active')
        .containsText('1', 'third slot is 1');
      assert
        .dom('[data-test-page="2"]')
        .doesNotHaveClass('active', 'fourth slot is not active')
        .containsText('2', 'fourth slot is 2');
      assert
        .dom('[data-test-page="3"]')
        .doesNotHaveClass('active', 'fifth slot is not active')
        .containsText('3', 'fifth slot is 3');
      assert
        .dom('[data-test-next]')
        .doesNotHaveClass('disabled', 'next is enabled');

      await click('[data-test-next]');

      assert
        .dom('[data-test-previous]')
        .doesNotHaveClass('disabled', 'previous is enabled');
      assert
        .dom('[data-test-previous] + .page-item > .page-link')
        .hasClass('disabled', 'first slot is disabled')
        .matchesText(/\s/, 'first slot is empty');
      assert
        .dom('[data-test-page="1"]')
        .doesNotHaveClass('active', 'second slot is not active')
        .containsText('1', 'second slot is 1');
      assert
        .dom('[data-test-page="2"]')
        .hasClass('active', 'third slot is active')
        .containsText('2', 'third slot is 2');
      assert
        .dom('[data-test-page="3"]')
        .doesNotHaveClass('active', 'fourth slot is not active')
        .containsText('3', 'fourth slot is 3');
      assert
        .dom('[data-test-page="4"]')
        .doesNotHaveClass('active', 'fifth slot is not active')
        .containsText('4', 'fifth slot is 4');
      assert
        .dom('[data-test-next]')
        .doesNotHaveClass('disabled', 'next is enabled');

      await click('[data-test-next]');

      assert
        .dom('[data-test-previous]')
        .doesNotHaveClass('disabled', 'previous is enabled');
      assert
        .dom('[data-test-page="1"]')
        .doesNotHaveClass('active', 'first slot is not active')
        .containsText('1', 'first slot is 1');
      assert
        .dom('[data-test-page="2"]')
        .doesNotHaveClass('active', 'second slot is not active')
        .containsText('2', 'second slot is 2');
      assert
        .dom('[data-test-page="3"]')
        .hasClass('active', 'third slot is active')
        .containsText('3', 'third slot is 3');
      assert
        .dom('[data-test-page="4"]')
        .doesNotHaveClass('active', 'fourth slot is not active')
        .containsText('4', 'fourth slot is 4');
      assert
        .dom('[data-test-page="5"]')
        .doesNotHaveClass('active', 'fifth slot is not active')
        .containsText('5', 'fifth slot is 5');
      assert
        .dom('[data-test-next]')
        .doesNotHaveClass('disabled', 'next is enabled');

      await click('[data-test-next]');

      assert
        .dom('[data-test-previous]')
        .doesNotHaveClass('disabled', 'previous is enabled');
      assert
        .dom('[data-test-page="2"]')
        .doesNotHaveClass('active', 'first slot is not active')
        .containsText('2', 'first slot is 2');
      assert
        .dom('[data-test-page="3"]')
        .doesNotHaveClass('active', 'second slot is not active')
        .containsText('3', 'second slot is 3');
      assert
        .dom('[data-test-page="4"]')
        .hasClass('active', 'third slot is active')
        .containsText('4', 'third slot is 4');
      assert
        .dom('[data-test-page="5"]')
        .doesNotHaveClass('active', 'fourth slot is not active')
        .containsText('5', 'fourth slot is 5');
      assert
        .dom('.page-item:has(+ [data-test-next]) > .page-link')
        .hasClass('disabled', 'fifth slot is disabled')
        .matchesText(/\s/, 'fifth slot is empty');
      assert
        .dom('[data-test-next]')
        .doesNotHaveClass('disabled', 'next is enabled');

      await click('[data-test-next]');

      assert
        .dom('[data-test-previous]')
        .doesNotHaveClass('disabled', 'previous is enabled');
      assert
        .dom('[data-test-page="3"]')
        .doesNotHaveClass('active', 'first slot is not active')
        .containsText('3', 'first slot is 3');
      assert
        .dom('[data-test-page="4"]')
        .doesNotHaveClass('active', 'second slot is not active')
        .containsText('4', 'second slot is 4');
      assert
        .dom('[data-test-page="5"]')
        .hasClass('active', 'third slot is active')
        .containsText('5', 'third slot is 5');
      assert
        .dom('.page-item:has(+ .page-item + [data-test-next]) > .page-link')
        .hasClass('disabled', 'fourth slot is disabled')
        .matchesText(/\s/, 'fourth slot is empty');
      assert
        .dom('.page-item:has(+ [data-test-next]) > .page-link')
        .hasClass('disabled', 'fifth slot is disabled')
        .matchesText(/\s/, 'fifth slot is empty');
      assert.dom('[data-test-next]').hasClass('disabled', 'next is disabled');

      await click('[data-test-previous]');

      assert
        .dom('[data-test-previous]')
        .doesNotHaveClass('disabled', 'previous is enabled');
      assert
        .dom('[data-test-page="2"]')
        .doesNotHaveClass('active', 'first slot is not active')
        .containsText('2', 'first slot is 2');
      assert
        .dom('[data-test-page="3"]')
        .doesNotHaveClass('active', 'second slot is not active')
        .containsText('3', 'second slot is 3');
      assert
        .dom('[data-test-page="4"]')
        .hasClass('active', 'third slot is active')
        .containsText('4', 'third slot is 4');
      assert
        .dom('[data-test-page="5"]')
        .doesNotHaveClass('active', 'fourth slot is not active')
        .containsText('5', 'fourth slot is 5');
      assert
        .dom('.page-item:has(+ [data-test-next]) > .page-link')
        .hasClass('disabled', 'fifth slot is disabled')
        .matchesText(/\s/, 'fifth slot is empty');

      await click('[data-test-page="2"]');

      assert.verifySteps(
        [
          'start: 25',
          'start: 50',
          'start: 75',
          'start: 100',
          'start: 75',
          'start: 25',
        ],
        "next, next, next, next, previous, '2'",
      );
    });

    test('page sizes are supported', async function (this: TestContext, assert) {
      const { meta } = this;
      const pageSizes = [50, 100, 200];

      meta.count = 50;
      meta.total = 100;

      const setPage = (start: number) => {
        meta.start = start;
        assert.step(`start: ${start}`);
      };

      const setPageSize = (count: number) => {
        meta.count = count;
        assert.step(`count: ${count}`);
      };

      await render(<template>
        <Pagination
          @meta={{meta}}
          @pageSizes={{pageSizes}}
          @onChangePage={{setPage}}
          @onChangePageSize={{setPageSize}}
        />
      </template>);

      assert
        .dom('.selected-display')
        .containsText('50 per page', 'selected option is 50');

      await click('[data-test-page-sizes] > div > button');

      assert
        .dom('.dropdown-menu > li:first-child > span')
        .containsText('50', 'first option is 50')
        .hasClass('active', 'first option is active');

      await click('.dropdown-menu > li:last-child');

      assert
        .dom('.selected-display')
        .containsText('200 per page', 'selected option is 200');
      assert.verifySteps(['count: 200'], '200 per page');
    });

    test('jump to page is supported', async function (this: TestContext, assert) {
      const { meta } = this;

      meta.total = 100;

      const setPage = (start: number) => {
        meta.start = start;
        assert.step(`start: ${start}`);
      };

      await render(<template>
        <Pagination
          @meta={{meta}}
          @enablePageJump={{true}}
          @onChangePage={{setPage}}
        />
      </template>);

      await fillIn('[data-test-jump-to] input', '4');

      assert.verifySteps(['start: 75'], 'jump to page 4');

      assert
        .dom('[data-test-jump-to]')
        .matchesText(/Page\s+of 4/, 'total pages');
    });
  },
);
