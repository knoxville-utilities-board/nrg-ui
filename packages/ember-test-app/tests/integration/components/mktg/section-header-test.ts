import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | mktg/section-header', function (hooks) {
  setupRenderingTest(hooks);

  test('Section header renders', async function () {
    await render(
      hbs`<Mktg::SectionHeader
        class="section-header"
        @title="Title"
        @subject="Subject"
      >
        <:sub-content>
          <p>sub-content</p>
        </:sub-content>
      </Mktg::SectionHeader>,
      `,
    );

    assert
      .dom(
        '.col-12.d-flex.flex-column.align-items-center .text-center.section-header',
      )
      .exists('Section header renders with passed attributes');
    assert.dom('div div p').hasText('Subject', 'Subject renders within header');
    assert
      .dom('div div p:nth-of-type(2)')
      .hasText('Title', 'Title renders within header');
    assert
      .dom('div div p:nth-of-type(3)')
      .hasText('sub-content', 'Sub-content renders within named block');
  });
});
