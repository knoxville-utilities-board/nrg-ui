import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | components | mktg/navbar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function () {
    await render(hbs`
      <Mktg::Navbar>
        <:brand>
          <a class="navbar-brand mx-5" href="https://www.kub.org">
            <img src="https://imageplaceholder.net/50" alt="Placeholder" />
          </a>
        </:brand>
        <:mobile-action-button as |Button|>
          <Button @text="Mobile Button" class="btn-secondary ms-auto d-lg-none" />
        </:mobile-action-button>
        <:default>
          <NavItem @url="#" @label="Home" />
          <NavItem @url="#" @label="Products" />
        </:default>
        <:desktop-action-button as |Button|>
          <Button @text="Desktop Button" class="btn-secondary me-5 d-none d-lg-block" />
        </:desktop-action-button>
      </Mktg::Navbar>`);

    assert.dom('nav a img').exists('Brand renders content');
    assert.dom('.navbar-nav').containsText('Home');
  });

  test('clicking the menu toggle changes the icon class', async function (assert) {
    await render(hbs`
      <Mktg::Navbar>
        <:brand>
          <a class="navbar-brand mx-5" href="https://www.kub.org">
            <img src="https://imageplaceholder.net/50" alt="Placeholder" />
          </a>
        </:brand>
        <:mobile-action-button as |Button|>
          <Button @text="Mobile Button" class="btn-secondary ms-auto d-lg-none" />
        </:mobile-action-button>
        <:default>
          <NavItem @url="#" @label="Home" />
          <NavItem @url="#" @label="Products" />
        </:default>
        <:desktop-action-button as |Button|>
          <Button @text="Desktop Button" class="btn-secondary me-5 d-none d-lg-block" />
        </:desktop-action-button>
      </Mktg::Navbar>
    `);
    assert.dom('.navbar-toggler span').hasClass('bi-list');
    await click('.navbar-toggler');
    assert.dom('.navbar-toggler span').hasClass('bi-x');
    assert.dom('.navbar-collapse').hasClass('show');
  });
});
