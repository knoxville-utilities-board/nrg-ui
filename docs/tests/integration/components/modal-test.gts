import { click, render, rerender } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { Modal } from '@nrg-ui/core';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module('Integration | Component | modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><Modal @isOpen={{true}} /></template>);

    assert.dom('dialog').exists();
    assert.dom('.modal-content').exists();
    assert.dom('.modal-header').doesNotExist();
    assert.dom('.modal-body').exists();
    assert.dom('.modal-footer').doesNotExist();

    await render(
      <template>
        <Modal @isOpen={{true}}>
          <:header>
            <div>Header</div>
          </:header>
          <:default>
            <div>Body</div>
          </:default>
          <:footer>
            <div>Footer</div>
          </:footer>
        </Modal>
      </template>,
    );

    assert.dom('dialog').exists();
    assert.dom('.modal-content').exists();
    assert.dom('.modal-header').exists();
    assert.dom('.modal-body').exists();
    assert.dom('.modal-footer').exists();
  });

  test('close button displays on dismissible', async function (assert) {
    assert.expect(2);

    const onDismiss = () => {
      assert.ok(true, 'action is fired with event');
    };

    await render(
      <template>
        <Modal @isOpen={{true}} @onDismiss={{onDismiss}} @dismissible={{true}} />
      </template>,
    );

    assert.dom('.btn-close').exists();
    await click('.btn-close');
  });

  test('close button does not display when not dismissible', async function (assert) {
    await render(<template><Modal @isOpen={{true}} @dismissible={{false}} /></template>);

    assert.dom('.btn-close').doesNotExist();
  });

  test('it can have custom header, body, and footer', async function (assert) {
    await render(
      <template>
        <Modal @isOpen={{true}}>
          <:header>
            <div data-test-header>Header</div>
          </:header>
          <:default>
            <div data-test-body>Body</div>
          </:default>
          <:footer>
            <div data-test-footer>Footer</div>
          </:footer>
        </Modal>
      </template>,
    );

    assert.dom('[data-test-header]').exists().hasText('Header');
    assert.dom('[data-test-body]').exists().hasText('Body');
    assert.dom('[data-test-footer]').exists().hasText('Footer');
  });

  test('it is not visible when isOpen is false', async function (assert) {
    await render(<template><Modal @isOpen={{false}} /></template>);
    assert.dom('dialog').isNotVisible();

    await render(<template><Modal @isOpen={{true}} /></template>);
    assert.dom('dialog').isVisible();
  });

  test('onOpen action fires', async function (assert) {
    class State {
      @tracked
      isOpen = true;
    }

    const state = new State();

    const onOpen = () => {
      assert.step('onOpen action is fired');
    };
    const onDismiss = () => {
      state.isOpen = false;
      assert.step('onDismiss action is fired with event');
    };

    await render(
      <template>
        <Modal @isOpen={{state.isOpen}} @onOpen={{onOpen}} @onDismiss={{onDismiss}} />
      </template>,
    );

    await click('.btn-close');

    state.isOpen = true;
    await rerender();

    assert.verifySteps([
      'onOpen action is fired',
      'onDismiss action is fired with event',
      'onOpen action is fired',
    ]);
  });
});
