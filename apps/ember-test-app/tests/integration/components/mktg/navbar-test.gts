import { click, render } from '@ember/test-helpers';
import Navbar from '@nrg-ui/ember/components/mktg/navbar';
import NavItem from '@nrg-ui/ember/components/nav-item';
import { assert, module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | mktg/navbar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function () {
    await render(<template>
      <Navbar>
        <:brand>
          <a class="navbar-brand mx-5" href="https://www.kub.org">
            <img src="https://imageplaceholder.net/50" alt="Placeholder" />
          </a>
        </:brand>
        <:actions as |Button|>
          <Button
            @text="Mobile Button"
            class="btn-secondary ms-auto d-lg-none"
          />
        </:actions>
        <:default>
          <NavItem @url="#" @label="Home" />
          <NavItem @url="#" @label="Products" />
        </:default>
      </Navbar>
    </template>);

    assert.dom('nav a img').exists('Brand renders content');
    assert.dom('.navbar-nav').containsText('Home');
  });

  test('clicking the menu toggle changes the icon class', async function (assert) {
    await render(<template>
      <Navbar>
        <:brand>
          <a class="navbar-brand mx-5" href="https://www.kub.org">
            <img src="https://imageplaceholder.net/50" alt="Placeholder" />
          </a>
        </:brand>
        <:actions as |Button|>
          <Button
            @text="Mobile Button"
            class="btn-secondary ms-auto d-lg-none"
          />
        </:actions>
        <:default>
          <NavItem @url="#" @label="Home" />
          <NavItem @url="#" @label="Products" />
        </:default>
      </Navbar>
    </template>);
    assert.dom('.navbar-toggler span').hasClass('bi-list');
    await click('.navbar-toggler');
    assert.dom('.navbar-toggler span').hasClass('bi-x');
    assert.dom('.navbar-collapse').hasClass('show');
  });
});
