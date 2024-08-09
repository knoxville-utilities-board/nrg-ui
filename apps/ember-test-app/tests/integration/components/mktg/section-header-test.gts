import { render } from '@ember/test-helpers';
import SectionHeader from '@nrg-ui/ember/components/mktg/section-header';
import { setupRenderingTest } from 'ember-qunit';
import { assert, module, test } from 'qunit';

module('Integration | components | mktg/section-header', function (hooks) {
  setupRenderingTest(hooks);

  test('Section header renders', async function () {
    await render(<template>
      <SectionHeader class="section-header" @title="Title" @subject="Subject">
        <:subheader>
          <p>subheader</p>
        </:subheader>
      </SectionHeader>,
    </template>);

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
      .hasText('subheader', 'Subheader renders within named block');
  });
});
