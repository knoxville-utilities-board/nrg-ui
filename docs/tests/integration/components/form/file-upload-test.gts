import { click, render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { FileUpload, bind } from '@nrg-ui/core';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | form/file-upload', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  class Model {
    @tracked
    files: File[] = [];
  }

  test('it renders', async function (assert) {
    const model = new Model();
    await render(<template>
      <FileUpload @binding={{bind model "files"}} />
    </template>);
    assert.dom('input').hasAttribute('type', 'file');
    assert.dom('[data-test-open="modal"]').exists();
  });

  test('it opens modal when clicked', async function (assert) {
    const model = new Model();
    await render(<template>
      <FileUpload @binding={{bind model "files"}} />
    </template>);
    assert.dom('dialog.inactive').exists()
    await click('[data-test-open="modal"]');
    assert.dom('dialog.inactive').doesNotExist();
    assert.dom('.modal-header').containsText('Upload Files');
    assert.dom('.modal-body').containsText('Drag and drop files here or select a file');
  });

  test('it displays message when no files are selected', async function (assert) {
    const model = new Model();
    await render(<template>
      <FileUpload @binding={{bind model "files"}} />
    </template>);
    assert.dom('p.text-muted').hasText('No files selected');
    await click('[data-test-open="modal"]');
    assert.dom('p.text-muted').exists({ count: 2});
  });

  test('it displays and removes selected files', async function (assert) {
    const model = new Model();
    await render(<template>
      <FileUpload @binding={{bind model "files"}} />
    </template>);
    await click('[data-test-open="modal"]');
    await click('[data-test-open="input"]');

    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const dataTransfer = new DataTransfer();

    dataTransfer.items.add(file);
    input.files = dataTransfer.files;
    input.dispatchEvent(new Event('change'));

    await settled();

    assert.dom('.list-group.list-group-flush').exists();
    assert.dom('.list-group.list-group-flush').containsText('test.txt');
    assert.dom('[data-test-remove]').exists();

    await click('[data-test-remove]');
    assert.dom('.list-group.list-group-flush').doesNotExist();
  });

  test('it accepts arguments properly', async function (assert) {
    assert.expect(3);
    const model = new Model();
    const onSelect = function() {
      assert.ok(true, 'onSelect called');
    }
    const onRemove = function() {
      assert.ok(true, 'onRemove called');
    }
    await render(<template>
      <FileUpload @binding={{bind model "files"}} @onSelect={{onSelect}} @onRemove={{onRemove}} />
    </template>);

    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const dataTransfer = new DataTransfer();

    dataTransfer.items.add(file);
    input.files = dataTransfer.files;
    input.dispatchEvent(new Event('change'));

    await settled();

    await click('[data-test-remove]');

    await render(<template>
      <FileUpload @binding={{bind model "files"}} @disabled={{true}} />
    </template>);
    assert.dom('[data-test-open="modal"]').hasClass('disabled');
  });
})
