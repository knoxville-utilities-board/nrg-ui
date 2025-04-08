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
        <:right>Right text</:right>
      </AppBar>
    </template>);

    assert.dom('.app-bar-left').exists().hasText('Left text');
    assert.dom('.app-bar-right').exists().hasText('Right text');
  });

  test('environment can be rendered in custom location', async function (assert) {
    await render(<template>
      <AppBar @environment="dev">
        <:left as |AppBar|>
          <h5>
            Test Title
          </h5>
          <AppBar.Environment />
        </:left>
      </AppBar>
    </template>);
    assert.dom('.environment-title').hasText('dev').matchesSelector('h5 ~ &');

    await render(<template>
      <AppBar @environment="dev">
        <:left as |AppBar|>
          <AppBar.Environment />
          <h5>
            Test Title
          </h5>
        </:left>
      </AppBar>
    </template>);
    assert
      .dom('h5')
      .hasText('Test Title')
      .matchesSelector('.environment-title ~ &');
    assert.dom('.environment-title').hasText('dev');

    await render(<template>
      <AppBar @environment="prod">
        <:left as |AppBar|>
          <h5>
            Test Title
          </h5>
          <AppBar.Environment />
        </:left>
      </AppBar>
    </template>);
    assert.dom('.environment-title').doesNotExist();
    assert
      .dom('.app-bar .flex-grow-0')
      .hasText('Test Title')
      .doesNotMatchSelector('& .environment-title');
  });
});
