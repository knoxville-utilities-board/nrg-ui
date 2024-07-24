import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | nrg/mktg/header', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function () {
    await render(hbs`
      <Nrg::Mktg::Header>
        <:brand>
          <img src="https://imageplaceholder.net/50" alt="Icon" />
        </:brand>
        <:title>
            <p class="m-0">Title</p>
        </:title>
        <:nav>
          <Nrg::Button
            class="btn-outline-light me-1 rounded-pill"
          >Prev</Nrg::Button>
          <Nrg::Button
            class="btn-outline-light me-1 rounded-pill"
          >Next</Nrg::Button>
        </:nav>
        <:options>
          <p class="my-0 me-2 fw-bold">Options content</p>
        </:options>
      </Nrg::Mktg::Header>`);

    assert.dom('div div img').exists('Brand renders content');
    assert
      .dom(
        'div div:nth-of-type(2) .justify-content-center.align-items-center.text-center.text-nowrap.fw-bold.m-0.fs-4 p',
      )
      .hasText('Title', 'Title renders content');
    assert
      .dom(
        'div div:nth-of-type(2) .d-none.d-md-flex .d-flex.flex-row.mt-2.mx-2.text-nowrap p',
      )
      .hasText(
        'Options content',
        'Options renders content within center block',
      );
    assert
      .dom(
        'div div:nth-of-type(3) .col.d-flex.justify-content-end .btn-outline-light',
      )
      .exists({ count: 2 }, 'Nav renders content');
    assert
      .dom('div div:nth-of-type(4) .d-flex.flex-row.mt-2.mx-2.text-nowrap p')
      .hasText(
        'Options content',
        'Options renders content within mobile drop section block',
      );
  });
});
