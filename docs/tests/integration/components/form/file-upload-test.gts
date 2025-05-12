import { click, find, render, settled } from '@ember/test-helpers';
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
    assert.dom('[data-test-drop-zone]').containsText('Drop files here or click to browse');
  });

  test('it displays message when no files are selected', async function (assert) {
    const model = new Model();
    await render(<template>
      <FileUpload @binding={{bind model "files"}} />
    </template>);
    assert.dom('p.text-muted').hasText('No files selected');
  });

  test('it displays and removes selected files', async function (assert) {
    const model = new Model();
    await render(<template>
      <FileUpload @binding={{bind model "files"}} />
    </template>);

    await click('[data-test-open="input"]');

    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const input = find('input[type="file"]') as HTMLInputElement;
    const dataTransfer = new DataTransfer();

    dataTransfer.items.add(file);
    input.files = dataTransfer.files;
    input.dispatchEvent(new Event('change'));

    await settled();

    assert.dom('.list-group.list-group-flush').exists();
    assert.dom('.list-group.list-group-flush').containsText('test.txt');
    assert.dom('[data-test-remove]').exists();
    assert.equal(model.files[0]!.name, 'test.txt', 'File added to bound value');

    await click('[data-test-remove]');
    assert.dom('.list-group.list-group-flush').doesNotExist();
    assert.strictEqual(model.files.length, 0, 'File removed from bound value');
  });

  test('it accepts arguments properly', async function (assert) {
    assert.expect(3);
    const model = new Model();
    const onAdd = function() {
      assert.ok(true, 'onAdd called');
    }
    const onRemove = function() {
      assert.ok(true, 'onRemove called');
    }

    await render(<template>
      <FileUpload @binding={{bind model "files"}} @onAdd={{onAdd}} @onRemove={{onRemove}} />
    </template>);

    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const input = find('input[type="file"]') as HTMLInputElement;
    const dataTransfer = new DataTransfer();

    dataTransfer.items.add(file);
    input.files = dataTransfer.files;
    input.dispatchEvent(new Event('change'));

    await settled();
    await click('[data-test-remove]');

    await render(<template>
      <FileUpload @binding={{bind model "files"}} @disabled={{true}} />
    </template>);

    assert.dom('input').hasAttribute('disabled');
  });
})
