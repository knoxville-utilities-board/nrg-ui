import { render } from '@ember/test-helpers';
import AppBar from '@nrg-ui/core/components/app-bar';
import { setupRenderingTest } from 'docs/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | app-bar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template>
      <AppBar>
        <:left>Left text</:left>
        <:center>Center text</:center>
        <:right>Right text</:right>
        <:mobile-drop-section>Mobile drop section</:mobile-drop-section>
      </AppBar>
    </template>);

    assert
      .dom('.app-bar-container .justify-content-start')
      .exists()
      .hasText('Left text');
    assert
      .dom('.app-bar-container .justify-content-center.flex-row')
      .exists()
      .hasText('Center text');
    assert
      .dom('.app-bar-container .justify-content-end')
      .exists()
      .hasText('Right text');
    assert
      .dom('.app-bar-container .d-md-none.order-last.justify-content-center')
      .exists()
      .hasText('Mobile drop section');
  });

  test('environment renders when applicable', async function (assert) {
    await render(<template><AppBar @environment="dev" /></template>);
    assert.dom('.environment-title').hasText('dev');

    await render(<template><AppBar @environment="test" /></template>);
    assert.dom('.environment-title').hasText('test');

    await render(<template><AppBar @environment="prod" /></template>);
    assert.dom('.environment-title').doesNotExist();
  });

  test('environment can be rendered in custom location', async function (assert) {
    await render(<template>
      <AppBar @environment="dev">
        <:center as |AppBar|>
          <h5>
            Test Title
          </h5>
          <AppBar.Environment />
        </:center>
      </AppBar>
    </template>);
    assert.dom('.environment-title').hasText('dev').matchesSelector('h5 ~ &');

    await render(<template>
      <AppBar @environment="dev">
        <:center as |AppBar|>
          <AppBar.Environment />
          <h5>
            Test Title
          </h5>
        </:center>
      </AppBar>
    </template>);
    assert
      .dom('h5')
      .hasText('Test Title')
      .matchesSelector('.environment-title ~ &');
    assert.dom('.environment-title').hasText('dev');

    await render(<template>
      <AppBar @environment="prod">
        <:center as |AppBar|>
          <h5>
            Test Title
          </h5>
          <AppBar.Environment />
        </:center>
      </AppBar>
    </template>);
    assert.dom('.environment-title').doesNotExist();
    assert
      .dom('.justify-content-center.flex-row')
      .hasText('Test Title')
      .doesNotMatchSelector('& .environment-title');
  });
});
