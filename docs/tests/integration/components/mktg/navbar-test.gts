import { click, render } from '@ember/test-helpers';
import Button from '@nrg-ui/core/components/button';
import MktgNavbar from '@nrg-ui/core/components/mktg/navbar';
import NavItem from '@nrg-ui/core/components/nav-item';
import { assert, module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | mktg/navbar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function () {
    await render(
      <template>
        <MktgNavbar>
          <:brand>
            <a class="navbar-brand mx-5" href="https://www.kub.org">
              <img src="https://imageplaceholder.net/50" alt="Placeholder" />
            </a>
          </:brand>
          <:actions>
            <Button
              @text="Mobile Button"
              class="btn-secondary ms-auto d-lg-none"
            />
          </:actions>
          <:default>
            <NavItem @url="#" @label="Home" />
            <NavItem @url="#" @label="Products" />
          </:default>
        </MktgNavbar>
      </template>,
    );

    assert.dom('nav a img').exists('Brand renders content');
    assert.dom('.navbar-nav').containsText('Home');
  });

  test('clicking the menu toggle changes the icon class', async function (assert) {
    await render(
      <template>
        <MktgNavbar>
          <:brand>
            <a class="navbar-brand mx-5" href="https://www.kub.org">
              <img src="https://imageplaceholder.net/50" alt="Placeholder" />
            </a>
          </:brand>
          <:actions>
            <Button
              @text="Mobile Button"
              class="btn-secondary ms-auto d-lg-none"
            />
          </:actions>
          <:default>
            <NavItem @url="#" @label="Home" />
            <NavItem @url="#" @label="Products" />
          </:default>
        </MktgNavbar>
      </template>,
    );
    assert.dom('.navbar-toggler span').hasClass('bi-list');
    await click('.navbar-toggler');
    assert.dom('.navbar-toggler span').hasClass('bi-x');
    assert.dom('.navbar-collapse').hasClass('show');
  });
});
